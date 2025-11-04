import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'cafeespecifico',
    loadComponent: () => import('./pages/Cafeespecifico/Cafeespecifico.page').then(m => m.CafeespecificoPage)
  },
  {
    path: 'bebidasFrias',
    loadComponent:() => import('./pages/bebidasFrias/bebidasFrias.page').then(m => m.BebidasFriasPage)
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
      import('./pages/Cafeespecifico/cafeDetalhe/cafeDetalhe.page').then(m => m.CafeDetalhePage )
  }
];
