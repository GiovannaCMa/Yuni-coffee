import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonButton, IonInput, IonItem, IonIcon,
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NomeClientePipe } from '../../pipes/nome-cliente-pipe';


@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar.page.html',
  styleUrls: ['./finalizar.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonButton, IonInput, IonItem, IonIcon,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    CommonModule, FormsModule,NomeClientePipe,
  ]
})
export class FinalizarPedidoPage {
  comanda: string = '';

  constructor(private router: Router) {}
  
  finalizarPedido() {
      // Salva o valor no Local Storage
    localStorage.setItem('comanda', this.comanda);

    // aqui você pode colocar qualquer lógica antes
    console.log('Pedido finalizado!');
    
    // depois redireciona:
    this.router.navigate(['/finalizar']);
  }

}
