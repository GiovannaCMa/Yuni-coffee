import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { cafeOutline, snowOutline, starOutline, wineOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cafe-detalhes',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  templateUrl: './cafeDetalhe.page.html',
  styleUrls: ['./cafeDetalhe.page.scss']
})
export class CafeDetalhePage implements OnInit {
 
  drink: any;
  descricao: string = '';
  avaliacao: number = 0;
  tamanhoSelecionado: string = ''; // 🔹 tamanho automático

  // 💖 Descrições e avaliações personalizadas
  descricaoPersonalizada: any = {
    "Cafe Savoy": {
      descricao: "Café cremoso com toque suave de leite vaporizado e sabor adocicado. Ideal para momentos de pausa e aconchego ☕",
      avaliacao: 4.8
    },
    "Irish Coffee": {
      descricao: "Café quente com um toque de uísque irlandês, açúcar e chantilly. Clássico e intenso!",
      avaliacao: 4.6
    },
    "Espresso Martini": {
      descricao: "Combinação perfeita de café espresso, licor e vodka — forte, doce e sofisticado.",
      avaliacao: 4.9
    },
    "Coffee Liqueur": {
      descricao: "Combinação perfeita de café espresso doce e sofisticado.",
      avaliacao: 4.5
    },
     "Coffee-Vodka": {
      descricao: "Combinação perfeita de café forte e vodka doce e sofisticado.",
      avaliacao: 4.8
    },
      "Danbooka ": {
      descricao: "Combinação perfeita de café espresso doce e sofisticado.",
      avaliacao: 4.7

  }};

  constructor(private router: Router, private http: HttpClient) {
    addIcons({ cafeOutline, wineOutline, snowOutline, starOutline });
  }

  ngOnInit() {
    const dados = localStorage.getItem('drinkSelecionado');
    if (dados) {
      this.drink = JSON.parse(dados);

      // 🔸 Tamanhos padrão
      const tamanhosPadrao: any = {
        "Cafe Savoy": "Médio",
        "Irish Coffee": "Pequeno",
        "Espresso Martini": "Médio",
        "Coffee Liqueur":"Grande",
        "Coffee-Vodka":"Grande",
        "Danbooka ":"Médio"
      };

      // Define tamanho automático
      this.tamanhoSelecionado = tamanhosPadrao[this.drink.strDrink] || 'Médio';

      // 🔹 Busca informações adicionais da API
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
      this.router.navigate(['/cafeespecifico']);
    }
  }

  voltar() {
    this.router.navigate(['/cafeespecifico']);
  }
}

