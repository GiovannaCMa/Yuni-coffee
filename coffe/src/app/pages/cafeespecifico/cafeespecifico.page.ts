import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { cartOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cafeespecifico',
  templateUrl: './cafeespecifico.page.html',
  styleUrls: ['./cafeespecifico.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class CafeespecificoPage implements OnInit {
  drinks: any[] = [];
  drinkSelecionado: any = null;

  constructor(private http: HttpClient) {
    addIcons({ cartOutline });
  }

  ngOnInit() {
    // Buscar drinks da API (exemplo: categoria "Cocktail")
    this.http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
      .subscribe({
        next: (res: any) => {
          // A API retorna { drinks: [...] }
          this.drinks = res.drinks.map((drink: any, index: number) => ({
            ...drink,
            preco: (10 + index * 2).toFixed(2) // preço fictício
          }));
        },
        error: (err) => console.error('Erro ao consumir API:', err)
      });
  }

  selecionarDrink(drink: any) {
    this.drinkSelecionado = drink;
    console.log('Drink selecionado:', drink);
  }
}

