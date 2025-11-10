import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,} from '@ionic/angular/standalone';
import { NomeClientePipe } from '../../pipes/nome-cliente-pipe';


@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.page.html',
  styleUrls: ['./finalizar.page.scss'],
  standalone: true,

  imports: [IonContent, CommonModule, FormsModule,NomeClientePipe,IonHeader, IonToolbar, IonTitle,]
})
export class FinalizarPage implements OnInit {

  constructor() { }
 comanda: string = '';
  ngOnInit() {
   const comandaSalva = localStorage.getItem('comanda');
    if (comandaSalva) {
      this.comanda = comandaSalva;
    }

  }
}
