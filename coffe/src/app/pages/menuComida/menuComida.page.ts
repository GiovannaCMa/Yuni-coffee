import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-menu-comida',
  templateUrl: './menuComida.page.html',
  styleUrls: ['./menuComida.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class MenuComidaPage implements OnInit {
  comidas: any[] = [];
  categoriaAtiva: string = 'comidas';
  favoritos: Set<string> = new Set();
  homeAtivo: boolean = true;
  cartAtivo: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  selecionarCategoria(categoria: string) {
    this.categoriaAtiva = categoria;

    // Navega para a página correspondente
    if (categoria === 'cafes') {
      this.router.navigate(['/cafeespecifico']);
    } else if (categoria === 'bebidas-frias') {
      this.router.navigate(['/bebidasFrias']);
    } else if (categoria === 'comidas') {
      this.router.navigate(['/menuComida']);
    }
  }

  toggleHome() {
    if (this.homeAtivo) {
      this.homeAtivo = false;
    } else {
      this.homeAtivo = true;
      this.cartAtivo = false;
    }
  }

  toggleCart() {
    this.router.navigate(['/carrinho']);
  }

  isFavorito(comidaId: string): boolean {
    return this.favoritos.has(comidaId);
  }

  ngOnInit() {
    // Carrega favoritos salvos do localStorage
    const favoritosSalvos = localStorage.getItem('favoritosComidas');
    if (favoritosSalvos) {
      const ids = JSON.parse(favoritosSalvos);
      this.favoritos = new Set(ids);
    }

    const breakfastUrl =
      'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast';
    const dessertUrl =
      'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';

    const proibidos = [
      'sushi',
      'poutine',
      'kumpir',
      'salmon',
      'avocado',
      'tuna',
      'burek',
      'pork',
    ];

    const idsRemover = [
      '52895',
      '52896',
      '52891',
      '52964',
      '52967',
      '53114',
      '53111',
      '53049',
      '52791',
      '52965',
      '52893',
      '52928',
      '53007',
      '53054',
      '52767',
      '52792',
      '53022',
      '52929',
      '52889',
      '53082',
      '52793',
      '52988',
      '52989',
      '52857',
      '53046',
      '52902',
      '52859',
      '52923',
      '52961',
      '52890',
      '52787',
      '52931',
      '53005',
      '52786',
      '52862',
      '52855',
      '52909',
      '52917',
      '52856',
      '52910',
      '53076',
      '52901',
      '52932',
      '52899',
    ]; // IDs que você quer tirar

    forkJoin({
      breakfast: this.http.get(breakfastUrl).pipe(
        map((res: any) => res.meals || []),
        catchError(() => of([]))
      ),
      dessert: this.http.get(dessertUrl).pipe(
        map((res: any) => res.meals || []),
        catchError(() => of([]))
      ),
    }).subscribe({
      next: (responses) => {
        const todasComidas = [...responses.breakfast, ...responses.dessert];

        // 🔹 Filtra proibidos e IDs removidos
        let comidasFiltradas = todasComidas.filter((comida: any) => {
          const nome = (comida.strMeal || '').toLowerCase();
          return (
            !proibidos.some((p) => nome.includes(p)) &&
            !idsRemover.includes(comida.idMeal)
          );
        });

        // 🔹 Remove comidas sem foto
        comidasFiltradas = this.removerSemFoto(comidasFiltradas);

        // 🔹 Adiciona preços
        this.comidas = comidasFiltradas.map((comida: any, index: number) => ({
          ...comida,
          strDrink: comida.strMeal,
          strDrinkThumb: comida.strMealThumb,
          preco: (14 + index * 1.0).toFixed(2),
        }));

        // 🔹 Remove duplicadas
        const comidasUnicasMap = new Map();
        this.comidas.forEach((comida) => {
          if (!comidasUnicasMap.has(comida.idMeal)) {
            comidasUnicasMap.set(comida.idMeal, comida);
          }
        });
        this.comidas = Array.from(comidasUnicasMap.values());
      },
      error: (err) => console.error('Erro ao consumir APIs de comidas:', err),
    });
  }

  // ✨ Remove itens sem imagem
  removerSemFoto(lista: any[]): any[] {
    return lista.filter(
      (item) =>
        item.strMealThumb &&
        item.strMealThumb.trim() !== '' &&
        item.strMealThumb !== 'null' &&
        item.strMealThumb !== 'undefined'
    );
  }

  salvarFavoritos() {
    localStorage.setItem(
      'favoritosComidas',
      JSON.stringify(Array.from(this.favoritos))
    );
  }

  // 🍽️ Abre página de detalhes
  abrirDetalhe(comida: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    // Toggle favorito: se já está favoritado, desmarca e não navega
    if (this.favoritos.has(comida.idMeal)) {
      this.favoritos.delete(comida.idMeal);
      this.salvarFavoritos();
      return; // Não navega se estiver desmarcando
    }

    // Marca como favorito antes de navegar
    this.favoritos.add(comida.idMeal);
    this.salvarFavoritos();

    // Pequeno delay para mostrar a mudança de cor antes de navegar
    setTimeout(() => {
      this.router.navigate(['/comidaDetalhes', comida.idMeal], {
        queryParams: { preco: comida.preco },
      });
    }, 150);
  }
}
