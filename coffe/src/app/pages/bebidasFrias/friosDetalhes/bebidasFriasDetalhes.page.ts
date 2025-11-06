import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { cafeOutline, wineOutline, snowOutline, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-bebidas-frias-detalhes',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  templateUrl: './bebidasFriasDetalhes.page.html',
  styleUrls: ['./bebidasFriasDetalhes.page.scss']
})
export class BebidasFriasDetalhesPage implements OnInit {
  drink: any;
  descricao: string = '';
  avaliacao: number = 0;
  tamanhoSelecionado: string = ''; // 🔸 novo atributo para tamanho automático

  // 💖 Descrições e avaliações personalizadas
  descricaoPersonalizada: any = {
    "Afterglow": {
      descricao: "Drink sem álcool, doce e frutado, feito com sucos de abacaxi, laranja e groselha. Refrescante e vibrante, perfeito para dias quentes.",
      avaliacao: 4.5
    },
    "Brilho residual": {
      descricao: "Refrescante e doce, com notas suaves de frutas cítricas 🍊",
      avaliacao: 4.8
    },
    "Lemonade": {
      descricao: "Clássico e equilibrado — o sabor azedinho do limão com um toque de doçura 🍋",
      avaliacao: 5.0
    },
    "Alice Cocktail": {
      descricao: "Drink sem álcool, doce e cremoso, preparado com suco de frutas e um toque suave de leite ou creme. De cor rosada e sabor envolvente, é refrescante e delicado, perfeito para quem busca uma bebida leve e charmosa.",
      avaliacao: 4.7
    },
    "Aloha Fruit punch": {
      descricao: "Drink sem álcool, tropical e vibrante, feito com uma mistura de sucos de laranja, abacaxi e groselha. Doce, frutado e colorido, traz o sabor do verão em cada gole — perfeito para momentos leves e cheios de energia.",
      avaliacao: 4.5
    }
  };

  constructor(private router: Router, private http: HttpClient) {
    addIcons({ cafeOutline, wineOutline, snowOutline, starOutline });
  }

  ngOnInit() {
    const dados = localStorage.getItem('drinkSelecionado');
    if (dados) {
      this.drink = JSON.parse(dados);

      // 🔹 Define o tamanho padrão de cada drink
      const tamanhosPadrao: any = {
        "Afterglow": "Médio",
        "Brilho residual": "Médio",
        "Lemonade": "Grande",
        "Alice Cocktail": "Medio",
        "Aloha Fruit punch": "Grande",
        "Apelle Berry":"Medio",

      };

      // 🔸 Marca automaticamente o tamanho fixo do drink
      this.tamanhoSelecionado = tamanhosPadrao[this.drink.strDrink] || 'Médio';

      // 🔹 Busca informações adicionais da API (descrição)
      this.http
        .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.drink.idDrink}`)
        .subscribe((res: any) => {
          const detalhe = res.drinks[0];

          // Verifica se o drink tem descrição personalizada
          const detalheCustom = this.descricaoPersonalizada[this.drink.strDrink];
          if (detalheCustom) {
            this.descricao = detalheCustom.descricao;
            this.avaliacao = detalheCustom.avaliacao;
          } else {
            this.descricao = detalhe.strInstructions;
            this.avaliacao = 0;
          }
        });
    } else {
      this.router.navigate(['/bebidasFrias']);
    }
  }

  voltar() {
    this.router.navigate(['/bebidasFrias']);
  }
}
