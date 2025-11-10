import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NomeClientePipe } from '../../pipes/nome-cliente-pipe';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar.page.html',
  styleUrls: ['./finalizar.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,NomeClientePipe,IonicModule,
  ]

})
export class FinalizarPage {
  comanda: string = '';

  constructor(private router: Router) {}
  
  finalizarPedido() {

      // Salva o valor no Local Storage
    localStorage.setItem('comanda', this.comanda);
    this.router.navigate(['/finalizar']);
  }
}

