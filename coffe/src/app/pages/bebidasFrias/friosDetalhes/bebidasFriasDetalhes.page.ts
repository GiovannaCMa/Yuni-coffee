import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { cafeOutline, wineOutline, snowOutline} from 'ionicons/icons';


@Component({
  selector: 'app-bebidas-frias-detalhes',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule], // ✅ aqui só ficam módulos Angular/Ionic
  templateUrl: './bebidasFriasDetalhes.page.html',
  styleUrls: ['./bebidasFriasDetalhes.page.scss']
})
export class BebidasFriasDetalhesPage implements OnInit {
  drink: any;
  descricao: string = '';

  // 💖 Descrições personalizadas
  descricaoPersonalizada: any = {
    "Afterglow": "Um drink sem álcool, leve e frutado, ideal para relaxar em dias ensolarados ☀️",
    "Brilho residual": "Refrescante e doce, com notas suaves de frutas cítricas 🍊",
    "Lemonade": "Clássico e equilibrado — o sabor azedinho do limão com um toque de doçura 🍋"
  };

  constructor(private router: Router, private http: HttpClient) {
    // ✅ Aqui é o lugar certo para registrar os ícones
    addIcons({ cafeOutline, wineOutline, snowOutline});
  }

  ngOnInit() {
    const dados = localStorage.getItem('drinkSelecionado');
    if (dados) {
      this.drink = JSON.parse(dados);

      // 🔹 Busca os detalhes na API
      this.http
        .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.drink.idDrink}`)
        .subscribe((res: any) => {
          const detalhe = res.drinks[0];
          // 🔸 Usa sua descrição personalizada, se existir, ou a da API
          this.descricao = this.descricaoPersonalizada[this.drink.strDrink] || detalhe.strInstructions;
        });
    } else {
      this.router.navigate(['/bebidasFrias']);
    }
  }

  voltar() {
    this.router.navigate(['/bebidasFrias'])
  }
}
