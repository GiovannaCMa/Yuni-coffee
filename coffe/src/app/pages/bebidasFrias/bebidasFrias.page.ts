import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // 🆕 Import do Router

@Component({
  selector: 'app-bebidas-frias',
  templateUrl: './bebidasFrias.page.html',
  styleUrls: ['./bebidasFrias.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class BebidasFriasPage implements OnInit {
  drinks: any[] = [];

  // 🆕 Adicionando o Router aqui
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http
      .get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
      .subscribe({
        next: (res: any) => {
          const todosDrinks = res.drinks;

          const proibidos = [
            'coffee', 'tea', 'chocolate', 'cappuccino',
            'frappé', 'frappe', 'egg cream', 'just a moonmint',
            'microwave hot cocoa', 'masala chai', 'la',
            'melya', 'yo', 'coke'
          ];

          this.drinks = todosDrinks
            .filter((drink: any) => {
              const nome = (drink.strDrink || '').toLowerCase();
              return !proibidos.some(p => nome.includes(p));
            })
            .map((drink: any, index: number) => ({
              ...drink,
              preco: (8 + index * 1.5).toFixed(2)
            }));
        },
        error: (err) => console.error('Erro ao consumir API:', err)
      });
  }

  // 🆕 Nova função — substitui selecionarDrink
  abrirDetalhe(drink: any) {
    localStorage.setItem('drinkSelecionado', JSON.stringify(drink));
    this.router.navigate(['/bebidasFriasDetalhes']); // vai pra página de detalhes
  }
}
