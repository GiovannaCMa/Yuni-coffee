import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { addIcons } from 'ionicons';
import {
  cafeOutline,
  snowOutline,
  starOutline,
  wineOutline,
  cartOutline
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
  descricao = '';
  avaliacao = 0;
  tamanhoSelecionado = '';
  tamanhos = ['Pequeno', 'Médio', 'Grande'];


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
    private http: HttpClient,
    private carrinhoService: CarrinhoService
  ) {
    addIcons({ cafeOutline, wineOutline, snowOutline, starOutline,cartOutline });
  }

  ngOnInit() {
    const dados = localStorage.getItem('drinkSelecionado');
    if (dados) {
      this.drink = JSON.parse(dados);

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
    } else {
      this.router.navigate(['/cafeespecifico']);
    }
  }

  voltar() {
    this.router.navigate(['/cafeespecifico']);
  }
    selecionarTamanho(tamanho: string) {
      this.tamanhoSelecionado = tamanho;
    }
  adicionarAoCarrinho() {
    if (!this.drink) return;

    const item: ItemCarrinho = {
      id: parseInt(this.drink.idDrink),
      nome: this.drink.strDrink,
      preco: parseFloat(this.drink.preco),
      quantidade: 1,
      imagem: this.drink.strDrinkThumb,
    };

    this.carrinhoService.adicionar(item);
    // Opcional: navegar para o carrinho ou mostrar mensagem de sucesso
    // this.router.navigate(['/carrinho']);
  }
}
