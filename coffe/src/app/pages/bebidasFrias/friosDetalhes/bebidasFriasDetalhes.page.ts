import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { starOutline, cartOutline } from 'ionicons/icons';
import {
  CarrinhoService,
  ItemCarrinho,
} from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-bebidas-frias-detalhes',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  templateUrl: './bebidasFriasDetalhes.page.html',
  styleUrls: ['./bebidasFriasDetalhes.page.scss'],
})
export class BebidasFriasDetalhesPage implements OnInit {
  drink: any;
  descricao: string = '';
  avaliacao: number = 0;
  tamanhoSelecionado: string = '';
  tamanhos = ['Pequeno', 'Médio', 'Grande'];
  estaNoCarrinho: boolean = false;

  descricaoPersonalizada: any = {
    Afterglow: {
      descricao:
        'Drink sem álcool, doce e frutado, feito com sucos de abacaxi, laranja e groselha. Refrescante e vibrante, perfeito para dias quentes.',
      avaliacao: 4.5,
    },
    'Brilho residual': {
      descricao: 'Refrescante e doce, com notas suaves de frutas cítricas.',
      avaliacao: 4.8,
    },
    Lemonade: {
      descricao:
        'Clássico e equilibrado — o sabor azedinho do limão com um toque de doçura.',
      avaliacao: 5.0,
    },
    'Alice Cocktail': {
      descricao:
        'Drink sem álcool, doce e cremoso, com suco de frutas e um toque de creme. Refrescante e leve.',
      avaliacao: 4.7,
    },
    'Aloha Fruit punch': {
      descricao:
        'Tropical e vibrante, feito com sucos de laranja, abacaxi e groselha. O sabor do verão em cada gole.',
      avaliacao: 4.5,
    },
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private carrinhoService: CarrinhoService
  ) {
    addIcons({ starOutline, cartOutline });
  }

  ngOnInit() {
    const dados = localStorage.getItem('drinkSelecionado');
    if (dados) {
      this.drink = JSON.parse(dados);

      const tamanhosPadrao: any = {
        Afterglow: 'Médio',
        'Brilho residual': 'Médio',
        Lemonade: 'Grande',
        'Alice Cocktail': 'Médio',
        'Aloha Fruit punch': 'Grande',
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
    } else {
      this.router.navigate(['/bebidasFrias']);
    }
  }

  voltar() {
    this.router.navigate(['/bebidasFrias']);
  }

  // ✅ novo método para o @for
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
      const favoritosSalvos = localStorage.getItem('favoritosBebidasFrias');
      if (favoritosSalvos) {
        const favoritos = new Set(JSON.parse(favoritosSalvos));
        favoritos.delete(drinkId);
        localStorage.setItem('favoritosBebidasFrias', JSON.stringify(Array.from(favoritos)));
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
      const favoritosSalvos = localStorage.getItem('favoritosBebidasFrias');
      const favoritos = favoritosSalvos ? new Set(JSON.parse(favoritosSalvos)) : new Set();
      favoritos.add(drinkId);
      localStorage.setItem('favoritosBebidasFrias', JSON.stringify(Array.from(favoritos)));
    }
  }
}
