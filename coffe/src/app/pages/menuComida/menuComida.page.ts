import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  CarrinhoService,
  ItemCarrinho,
} from 'src/app/services/carrinho.service';
import { ComidasServiceBreakfast,ComidasServiceDessert } from 'src/app/services/comidas.service';
@Component({
  selector: 'app-menu-comida',
  templateUrl: './menuComida.page.html',
  styleUrls: ['./menuComida.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class MenuComidaPage implements OnInit {
  comidas: any[] = [];
  // Paginação
  comidasPagina: any[] = [];
  pageSize = 12; // mostra 12 itens por página
  currentPage = 1;
  totalPages = 1;
  categoriaAtiva: string = 'comidas';
  favoritos: Set<string> = new Set();
  homeAtivo: boolean = true;
  cartAtivo: boolean = false;
  cartCount: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private carrinhoService: CarrinhoService,
    private breakfast: ComidasServiceBreakfast,
    private dessert:ComidasServiceDessert
  ) {}

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
    localStorage.setItem('lastFrom', '/menuComida');
    this.router.navigate(['/carrinho']);
  }

  isFavorito(comidaId: string): boolean {
    return this.favoritos.has(comidaId);
  }

  ngOnInit() {
    // Carrega favoritos salvos do localStorage primeiro
    const favoritosSalvos = localStorage.getItem('favoritosComidas');
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
      '53120',
      '52118',
      '52896',
      '52891',
      '52964',
      '53118',
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
      breakfast:
        this.breakfast.getBreakfast(),
      dessert:
        this.dessert.getDesserts(),
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
        // Atualiza paginação sempre que a lista muda
        this.updatePagina();
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

      // Toggle favorito: se já está favoritado, desmarca e remove do carrinho
      if (this.favoritos.has(comida.idMeal)) {
        this.favoritos.delete(comida.idMeal);
        this.salvarFavoritos();
        // Remove do carrinho
        this.carrinhoService.remover(parseInt(comida.idMeal));
        return; // Não navega se estiver desmarcando
      }

      // Marca como favorito e adiciona ao carrinho
      this.favoritos.add(comida.idMeal);
      this.salvarFavoritos();

      // Adiciona ao carrinho
      const item: ItemCarrinho = {
        id: parseInt(comida.idMeal),
        nome: comida.strDrink,
        preco: parseFloat(comida.preco),
        quantidade: 1,
        imagem: comida.strDrinkThumb,
      };
      this.carrinhoService.adicionar(item);
      return; // Não navega quando clica na patinha
    }

    // Se não foi clicado na patinha, apenas navega para detalhes
    this.router.navigate(['/comidaDetalhes', comida.idMeal], {
      queryParams: { preco: comida.preco },
    });
  }

  adicionarAoCarrinho(comida: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const item: ItemCarrinho = {
      id: parseInt(comida.idMeal),
      nome: comida.strDrink,
      preco: parseFloat(comida.preco),
      quantidade: 1,
      imagem: comida.strDrinkThumb,
    };
    this.carrinhoService.adicionar(item);
  }

  // ---------- Paginação simples (12 por página) ----------
  private updatePagina() {
    this.totalPages = Math.max(
      1,
      Math.ceil(this.comidas.length / this.pageSize)
    );
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    const start = (this.currentPage - 1) * this.pageSize;
    this.comidasPagina = this.comidas.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagina();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagina();
    }
  }

  goToPage(n: number) {
    if (n >= 1 && n <= this.totalPages) {
      this.currentPage = n;
      this.updatePagina();
    }
  }
}
