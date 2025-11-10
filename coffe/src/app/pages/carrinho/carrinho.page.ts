import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonItem, IonLabel, IonButton, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { CarrinhoService, ItemCarrinho } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonItem, IonLabel, IonButton, IonToolbar, IonTitle, IonButtons, IonBackButton]
})
export class CarrinhoPage implements OnInit {
  itens: ItemCarrinho[] = [];
  total = 0;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit() {
    this.carrinhoService.getCarrinho().subscribe(itens => {
      this.itens = itens;
      this.total = this.carrinhoService.getTotal();
    });
  }

  removerItem(id: number) {
    this.carrinhoService.remover(id);
  }

  continuar() {
    console.log('Ir para Finalizar');
  }
}
