import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Router já está importado
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-menu-comida',
  templateUrl: './menuComida.page.html',
  styleUrls: ['./menuComida.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class MenuComidaPage implements OnInit {
  comidas: any[] = [];

  constructor(private http: HttpClient, private router: Router) {} // Router já injetado

  ngOnInit() {
    const breakfastUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast';
    const dessertUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';
    const proibidos = [
      'sushi', 'poutine', 'kumpir', 'salmon', 'avocado',
      'tuna', 'burek', 'pork'
    ];

    forkJoin({
      breakfast: this.http.get(breakfastUrl).pipe(
        map((res: any) => res.meals || []),
        catchError(() => of([]))
      ),
      dessert: this.http.get(dessertUrl).pipe(
        map((res: any) => res.meals || []),
        catchError(() => of([]))
      )
    }).subscribe({
      next: (responses) => {
        const todasComidas = [...responses.breakfast, ...responses.dessert];
        const comidasFiltradas = todasComidas.filter((comida: any) => {
          const nome = (comida.strMeal || '').toLowerCase();
          return !proibidos.some(p => nome.includes(p));
        });

        // O preço é calculado e armazenado
        this.comidas = comidasFiltradas.map((comida: any, index: number) => ({
          ...comida,
          strDrink: comida.strMeal,
          strDrinkThumb: comida.strMealThumb,
          preco: (14 + index * 1.0).toFixed(2) // Preço é criado aqui
        }));

        const comidasUnicasMap = new Map();
        this.comidas.forEach(comida => {
          if (!comidasUnicasMap.has(comida.idMeal)) {
            comidasUnicasMap.set(comida.idMeal, comida);
          }
        });
        this.comidas = Array.from(comidasUnicasMap.values());
      },
      error: (err) => console.error('Erro ao consumir APIs de comidas:', err)
    });
  }

 
  abrirDetalhe(comida: any) {
    // *** MUDANÇA AQUI ***
    // Navega para a rota de detalhes, passando o 'idMeal' E o 'preco'
    this.router.navigate(['/comidaDetalhes', comida.idMeal], {
      queryParams: { preco: comida.preco } // Passa o preço como query param
    });
  }
}
