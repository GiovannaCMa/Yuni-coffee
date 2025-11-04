import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./inicio/inicio.page').then( m => m.InicioPage)
  },

  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'pages/cafeespecifico',
    pathMatch: 'full',
  },
  {
    path: 'cafeespecifico',
    loadComponent: () => import('./pages/cafeespecifico/cafeespecifico.page').then( m => m.CafeespecificoPage)
  },
];
