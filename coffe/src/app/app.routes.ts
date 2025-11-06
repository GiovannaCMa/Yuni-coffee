import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'cafeespecifico',
    loadComponent: () => import('./pages/cafeespecifico/cafeespecifico.page').then(m => m.CafeespecificoPage)
  },
  {
    path: 'bebidasFrias',
    loadComponent: () =>
      import('./pages/bebidasFrias/bebidasFrias.page').then(m => m.BebidasFriasPage)
  },

  {
    path: 'bebidasFriasDetalhes',
    loadComponent: () =>
      import('./pages/bebidasFrias/friosDetalhes/bebidasFriasDetalhes.page')
        .then(m => m.BebidasFriasDetalhesPage)
  },
  {
    path: 'cafedetalhes',
    loadComponent: () =>
      import('./pages/cafeespecifico/cafeDetalhe/cafeDetalhe.page').then(m => m.CafeDetalhePage )
  },
  {
  path: 'finalizarCompras',
  loadComponent: () =>
    import('./pages/finalizarCompras/finalizar.page').then(m => m.FinalizarPedidoPage)
},
];