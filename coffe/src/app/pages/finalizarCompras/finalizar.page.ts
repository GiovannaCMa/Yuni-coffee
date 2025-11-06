import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonButton, IonInput, IonItem, IonIcon,
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar.page.html',
  styleUrls: ['./finalizar.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonButton, IonInput, IonItem, IonIcon,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    CommonModule, FormsModule
  ]
})
export class FinalizarPedidoPage {
  comanda: string = '';

  constructor(private router: Router) {}

  finalizarPedido() {
    // Aqui você pode salvar dados ou validar antes
    this.router.navigate(['/pedido-concluido']);
  }
}
