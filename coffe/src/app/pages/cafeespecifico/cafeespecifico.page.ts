import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // 🆕 Import do Router

@Component({
  selector: 'app-cafe-especifico',
  templateUrl: './cafeespecifico.page.html',
  styleUrls: ['./cafeespecifico.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class CafeespecificoPage  implements OnInit {
  categoriaAtiva: string = 'cafes'; // Valor inicial
  drinks: any[] = [];
  favoritos: Set<string> = new Set();
   homeAtivo: boolean = true; // Home começa ativo
    cartAtivo: boolean = false;

  // 🆕 Adicionando o Router aqui
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    
    this.http
      .get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Coffee')
      .subscribe({
        next: (res: any) => {
          const todosDrinks = res.drinks;
          

          const proibidos = [
             
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
              preco: (8 + index * 1.5).toFixed(2) //valor do drink
            }));
        },
        error: (err) => console.error('Erro ao consumir API:', err)
      });
  }

  selecionarCategoria(categoria: string) {
    this.categoriaAtiva = categoria;
  }


   isFavorito(drinkId: string): boolean {
    return this.favoritos.has(drinkId);
  }
   salvarFavoritos() {
    localStorage.setItem(
      'favoritosBebidasFrias',
      JSON.stringify(Array.from(this.favoritos))
    );
  }

  abrirDetalhe(drink: any) {
    localStorage.setItem('drinkSelecionado', JSON.stringify(drink));
    this.router.navigate(['/cafedetalhes']); // vai pra página de detalhes
  }
}
