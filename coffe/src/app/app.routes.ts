import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'cafeespecifico',
    loadComponent: () => import('./pages/cafeespecifico/cafeespecifico.page').then(m => m.CafeespecificoPage)
  }
];
