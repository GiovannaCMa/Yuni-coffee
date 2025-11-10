import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar.page.html',
  styleUrls: ['./finalizar.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FinalizarPedidoPage {
  comanda: string = '';

  constructor(private router: Router) {}

  finalizarPedido() {
    console.log('Pedido finalizado!');
    this.router.navigate(['/finalizar']);
  }
}

