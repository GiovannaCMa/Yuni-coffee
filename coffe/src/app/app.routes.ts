import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'cafeespecifico',
    loadComponent: () =>
      import('./pages/cafeespecifico/cafeespecifico.page').then(
        (m) => m.CafeespecificoPage
      ),
  },
  {
    path: 'bebidasFrias',
    loadComponent: () =>
      import('./pages/bebidasFrias/bebidasFrias.page').then(
        (m) => m.BebidasFriasPage
      ),
  },

  {
    path: 'bebidasFriasDetalhes/:id',
    loadComponent: () =>
      import(
        './pages/bebidasFrias/friosDetalhes/bebidasFriasDetalhes.page'
      ).then((m) => m.BebidasFriasDetalhesPage),
  },
  {
    path: 'bebidasFriasDetalhes',
    loadComponent: () =>
      import(
        './pages/bebidasFrias/friosDetalhes/bebidasFriasDetalhes.page'
      ).then((m) => m.BebidasFriasDetalhesPage),
  },
  {
    path: 'cafedetalhes/:id',
    loadComponent: () =>
      import('./pages/cafeespecifico/cafeDetalhe/cafeDetalhe.page').then(
        (m) => m.CafeDetalhePage
      ),
  },
  {
    path: 'cafedetalhes',
    loadComponent: () =>
      import('./pages/cafeespecifico/cafeDetalhe/cafeDetalhe.page').then(
        (m) => m.CafeDetalhePage
      ),
  },
  {
    path: 'menuComida',
    loadComponent: () =>
      import('./pages/menuComida/menuComida.page').then(
        (m) => m.MenuComidaPage
      ),
  },
  {
    path: 'comidaDetalhes',
    loadComponent: () =>
      import('./pages/menuComida/comidaDetalhes/comidaDetalhes.page').then(
        (m) => m.ComidaDetalhesPage
      ),
  },
  {
    // 1. O caminho que deve ser ativado
    path: 'comidaDetalhes/:id',

    // 2. O componente que deve ser carregado
    loadComponent: () =>
      import('./pages/menuComida/comidaDetalhes/comidaDetalhes.page').then(
        (m) => m.ComidaDetalhesPage
      ),
  },
  {
    path: 'finalizarCompras',
    loadComponent: () =>
      import('./pages/finalizarCompras/finalizar.page').then(
        (m) => m.FinalizarPage
      ),
  },
  {
    path: 'finalizar',
    loadComponent: () =>
      import('./pages/finalizar/finalizar.page').then((m) => m.FinalizarPage),
  },
  {
    path: 'carrinho',
    loadComponent: () =>
      import('./pages/carrinho/carrinho.page').then((m) => m.CarrinhoPage),
  },
];
