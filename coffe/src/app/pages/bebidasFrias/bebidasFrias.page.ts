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
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class BebidasFriasPage implements OnInit {
  drinks: any[] = [];
  categoriaAtiva: string = 'bebidas-frias'; // Categoria padrão
  favoritos: Set<string> = new Set(); // Rastreia itens favoritados
  homeAtivo: boolean = true; // Home começa ativo
  cartAtivo: boolean = false; // Carrinho começa inativo

  // 🆕 Adicionando o Router aqui
  constructor(private http: HttpClient, private router: Router) {}

  selecionarCategoria(categoria: string) {
    this.categoriaAtiva = categoria;

    if (categoria === 'cafes') {
      this.router.navigate(['/cafeespecifico']);
    } else if (categoria === 'bebidas-frias') {
      this.router.navigate(['/bebidasFrias']);
    } else if (categoria === 'comidas') {
      this.router.navigate(['/menuComida']);
    }
  }

  ionViewWillEnter() {
    this.categoriaAtiva = 'bebidas-frias';
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

  isFavorito(drinkId: string): boolean {
    return this.favoritos.has(drinkId);
  }

  ngOnInit() {
    // Carrega favoritos salvos do localStorage
    const favoritosSalvos = localStorage.getItem('favoritosBebidasFrias');
    if (favoritosSalvos) {
      const ids = JSON.parse(favoritosSalvos);
      this.favoritos = new Set(ids);
    }

    this.http
      .get(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'
      )
      .subscribe({
        next: (res: any) => {
          const todosDrinks = res.drinks;

          const proibidos = [
            'coffee',
            'tea',
            'chocolate',
            'cappuccino',
            'frappé',
            'frappe',
            'egg cream',
            'just a moonmint',
            'microwave hot cocoa',
            'masala chai',
            'la',
            'melya',
            'yo',
            'coke',
          ];

          this.drinks = todosDrinks
            .filter((drink: any) => {
              const nome = (drink.strDrink || '').toLowerCase();
              return !proibidos.some((p) => nome.includes(p));
            })
            .map((drink: any, index: number) => ({
              ...drink,
              preco: (8 + index * 1.5).toFixed(2), //valor do drink
            }));
        },
        error: (err) => console.error('Erro ao consumir API:', err),
      });
  }

  salvarFavoritos() {
    localStorage.setItem(
      'favoritosBebidasFrias',
      JSON.stringify(Array.from(this.favoritos))
    );
  }

  abrirDetalhe(drink: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    // Toggle favorito: se já está favoritado, desmarca e não navega
    if (this.favoritos.has(drink.idDrink)) {
      this.favoritos.delete(drink.idDrink);
      this.salvarFavoritos();
      return; // Não navega se estiver desmarcando
    }

    // Marca como favorito antes de navegar
    this.favoritos.add(drink.idDrink);
    this.salvarFavoritos();
    localStorage.setItem('drinkSelecionado', JSON.stringify(drink));

    // Pequeno delay para mostrar a mudança de cor antes de navegar
    setTimeout(() => {
      this.router.navigate(['/bebidasFriasDetalhes']); // vai pra página de detalhes
    }, 150);
  }
}
