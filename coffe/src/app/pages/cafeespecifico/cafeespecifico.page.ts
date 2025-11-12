import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // 🆕 Import do Router
import {
  CarrinhoService,
  ItemCarrinho,
} from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-cafe-especifico',
  templateUrl: './cafeespecifico.page.html',
  styleUrls: ['./cafeespecifico.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})

export class CafeespecificoPage implements OnInit {
  categoriaAtiva: string = 'cafes'; // Valor inicial
  drinks: any[] = [];
  cartCount: number = 0;
  favoritos: Set<string> = new Set();
  homeAtivo: boolean = true; // Home começa ativo
  cartAtivo: boolean = false;

  // 🆕 Adicionando o Router e CarrinhoService aqui
  constructor(
    private http: HttpClient,
    private router: Router,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit() {
    // Carrega favoritos salvos do localStorage
    const favoritosSalvos = localStorage.getItem('favoritosCafes');
    if (favoritosSalvos) {
      const ids = JSON.parse(favoritosSalvos);
      this.favoritos = new Set(ids);
    }

    // Assina o carrinho para atualizar o badge e sincronizar favoritos
    this.carrinhoService.getCarrinho().subscribe((itens) => {
      this.cartCount = itens.reduce((sum, i) => sum + i.quantidade, 0);

      // Sincroniza favoritos: adiciona itens do carrinho aos favoritos e remove favoritos que não estão no carrinho
      const idsNoCarrinho = new Set(itens.map((i) => i.id.toString()));
      let favoritosAtualizados = false;

      // Adiciona itens do carrinho aos favoritos se não estiverem
      idsNoCarrinho.forEach((id) => {
        if (!this.favoritos.has(id)) {
          this.favoritos.add(id);
          favoritosAtualizados = true;
        }
      });

      // Remove favoritos que não estão no carrinho
      this.favoritos.forEach((favoritoId) => {
        if (!idsNoCarrinho.has(favoritoId)) {
          this.favoritos.delete(favoritoId);
          favoritosAtualizados = true;
        }
      });

      if (favoritosAtualizados) {
        this.salvarFavoritos();
      }
    });

    this.http
      .get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Coffee')
      .subscribe({
        next: (res: any) => {
          const todosDrinks = res.drinks;
         
          const proibidos = [
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

  selecionarCategoria(categoria: string) {
    console.log('Categoria selecionada:', categoria);
    this.categoriaAtiva = categoria;


    if (categoria === 'cafes') {
      this.router.navigate(['/cafeespecifico']);
    } else if (categoria === 'bebidas-frias') {
      console.log('Navegando para bebidasFrias...');
      this.router.navigate(['/bebidasFrias']).then(
        () => console.log('Navegação bem-sucedida'),
        (err) => console.error('Erro na navegação:', err)
      );
    } else if (categoria === 'comidas') {
      this.router.navigate(['/menuComida']);
    }
  }

 
  
  isFavorito(drinkId: string): boolean {
    return this.favoritos.has(drinkId);
  }
  salvarFavoritos() {
    localStorage.setItem(
      'favoritosCafes',
      JSON.stringify(Array.from(this.favoritos))
    );
  }

  abrirDetalhe(drink: any, event?: Event) {
    if (event) {
      event.stopPropagation();

      // Toggle favorito: se já está favoritado, desmarca e remove do carrinho
      if (this.favoritos.has(drink.idDrink)) {
        this.favoritos.delete(drink.idDrink);
        this.salvarFavoritos();
        // Remove do carrinho
        this.carrinhoService.remover(parseInt(drink.idDrink));
        return; // Não navega se estiver desmarcando
      }

      // Marca como favorito e adiciona ao carrinho
      this.favoritos.add(drink.idDrink);
      this.salvarFavoritos();

      // Adiciona ao carrinho
      const item: ItemCarrinho = {
        id: parseInt(drink.idDrink),
        nome: drink.strDrink,
        preco: parseFloat(drink.preco),
        quantidade: 1,
        imagem: drink.strDrinkThumb,
      };
      this.carrinhoService.adicionar(item);
      return; // Não navega quando clica na patinha
    }

    // Se não foi clicado na patinha, apenas navega para detalhes
    localStorage.setItem('drinkSelecionado', JSON.stringify(drink));
    this.router.navigate(['/cafedetalhes']);
  }
   ionViewWillEnter() {
    this.categoriaAtiva = 'cafes';
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
    localStorage.setItem('lastFrom', '/cafeespecifico');
    this.router.navigate(['/carrinho']);
  }
}
