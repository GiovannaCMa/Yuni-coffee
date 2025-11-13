import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { addIcons } from 'ionicons';
import {
  cafeOutline,
  snowOutline,
  starOutline,
  wineOutline,
  cartOutline,
} from 'ionicons/icons';
import {
  CarrinhoService,
  ItemCarrinho,
} from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-cafe-detalhes',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  templateUrl: './cafeDetalhe.page.html',
  styleUrls: ['./cafeDetalhe.page.scss'],
})
export class CafeDetalhePage implements OnInit {
  drink: any;
  preco: string | null = null;
  descricao = '';
  avaliacao = 0;
  tamanhoSelecionado = '';
  tamanhos = ['Pequeno', 'Médio', 'Grande'];
  estaNoCarrinho: boolean = false;

  descricaoPersonalizada: any = {
    'Cafe Savoy': {
      descricao:
        'Café cremoso com toque suave de leite vaporizado e sabor adocicado. Ideal para momentos de pausa e aconchego ☕',
      avaliacao: 4.8,
    },
    'Irish Coffee': {
      descricao:
        'Café quente com um toque de uísque irlandês, açúcar e chantilly. Clássico e intenso!',
      avaliacao: 4.6,
    },
    'Espresso Martini': {
      descricao:
        'Combinação perfeita de café espresso, licor e vodka — forte, doce e sofisticado.',
      avaliacao: 4.9,
    },
    'Coffee Liqueur': {
      descricao: 'Combinação perfeita de café espresso doce e sofisticado.',
      avaliacao: 4.5,
    },
    'Coffee-Vodka': {
      descricao:
        'Combinação perfeita de café forte e vodka doce e sofisticado.',
      avaliacao: 4.8,
    },
    Danbooka: {
      descricao:
        'Café espresso suave e equilibrado, ideal para quem gosta de sabores intensos sem perder a leveza.',
      avaliacao: 4.7,
    },
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private carrinhoService: CarrinhoService
  ) {
    addIcons({
      cafeOutline,
      wineOutline,
      snowOutline,
      starOutline,
      cartOutline,
    });
  }

  ngOnInit() {
    // Tenta pegar o ID da rota primeiro (nova forma)
    const id = this.route.snapshot.paramMap.get('id');
    this.preco = this.route.snapshot.queryParamMap.get('preco');
    
    if (id) {
      // Busca os dados da API usando o ID da rota
      this.http
        .get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        )
        .subscribe({
          next: (res: any) => {
            if (res.drinks && res.drinks.length > 0) {
              this.drink = res.drinks[0];
              // Se não tiver preço na query, tenta pegar do localStorage
              if (!this.preco) {
                const dados = localStorage.getItem('drinkSelecionado');
                if (dados) {
                  const drinkLocal = JSON.parse(dados);
                  if (drinkLocal.idDrink === id) {
                    this.preco = drinkLocal.preco;
                  }
                }
              }
              // Adiciona o preço ao drink se não tiver
              if (this.preco && !this.drink.preco) {
                this.drink.preco = this.preco;
              }
              this.carregarDadosDoDrink();
            } else {
              this.router.navigate(['/cafeespecifico']);
            }
          },
          error: () => {
            this.router.navigate(['/cafeespecifico']);
          }
        });
    } else {
      // Fallback: usa localStorage (compatibilidade com código antigo)
      const dados = localStorage.getItem('drinkSelecionado');
      if (dados) {
        this.drink = JSON.parse(dados);
        this.preco = this.drink.preco;
        this.carregarDadosDoDrink();
      } else {
        this.router.navigate(['/cafeespecifico']);
      }
    }
  }

  private carregarDadosDoDrink() {
    if (!this.drink) return;

    const tamanhosPadrao: any = {
      'Cafe Savoy': 'Médio',
      'Irish Coffee': 'Pequeno',
      'Espresso Martini': 'Médio',
      'Coffee Liqueur': 'Grande',
      'Coffee-Vodka': 'Grande',
      Danbooka: 'Médio',
    };

    this.tamanhoSelecionado = tamanhosPadrao[this.drink.strDrink] || 'Médio';

    const detalheCustom = this.descricaoPersonalizada[this.drink.strDrink];
    if (detalheCustom) {
      this.descricao = detalheCustom.descricao;
      this.avaliacao = detalheCustom.avaliacao;
    } else {
      this.http
        .get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.drink.idDrink}`
        )
        .subscribe((res: any) => {
          const detalhe = res.drinks[0];
          this.descricao =
            detalhe.strInstructions || 'Sem descrição disponível.';
          this.avaliacao = 0;
        });
    }

    // Verifica se o item está no carrinho
    this.carrinhoService.getCarrinho().subscribe((itens) => {
      this.estaNoCarrinho = itens.some(
        (item) => item.id === parseInt(this.drink.idDrink)
      );
    });
  }

  voltar() {
    this.router.navigate(['/cafeespecifico']);
  }
  selecionarTamanho(tamanho: string) {
    this.tamanhoSelecionado = tamanho;
  }
  adicionarAoCarrinho() {
    if (!this.drink) return;

    const itemId = parseInt(this.drink.idDrink);
    const drinkId = this.drink.idDrink;

    // Toggle: se já está no carrinho, remove; se não está, adiciona
    if (this.estaNoCarrinho) {
      this.carrinhoService.remover(itemId);
      this.estaNoCarrinho = false;
      
      // Remove dos favoritos
      const favoritosSalvos = localStorage.getItem('favoritosCafes');
      if (favoritosSalvos) {
        const favoritos = new Set(JSON.parse(favoritosSalvos));
        favoritos.delete(drinkId);
        localStorage.setItem('favoritosCafes', JSON.stringify(Array.from(favoritos)));
      }
    } else {
      const item: ItemCarrinho = {
        id: itemId,
        nome: this.drink.strDrink,
        preco: parseFloat(this.drink.preco),
        quantidade: 1,
        imagem: this.drink.strDrinkThumb,
      };
      this.carrinhoService.adicionar(item);
      this.estaNoCarrinho = true;
      
      // Adiciona aos favoritos
      const favoritosSalvos = localStorage.getItem('favoritosCafes');
      const favoritos = favoritosSalvos ? new Set(JSON.parse(favoritosSalvos)) : new Set();
      favoritos.add(drinkId);
      localStorage.setItem('favoritosCafes', JSON.stringify(Array.from(favoritos)));
    }
  }
}
