import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, close } from 'ionicons/icons';
import {
  CarrinhoService,
  ItemCarrinho,
} from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonIcon,
  ],
})
export class CarrinhoPage implements OnInit {
  itens: ItemCarrinho[] = [];
  total = 0;
  mostrarMensagemVazio = false;
  private timeoutMensagem: any = null;

  constructor(
    private carrinhoService: CarrinhoService,
    private location: Location,
    private router: Router
  ) {
    addIcons({ arrowBack, close });
  }

  voltar() {
    const lastFrom = localStorage.getItem('lastFrom');
    if (lastFrom) {
      this.router.navigate([lastFrom]);
    } else {
      // Fallback: volta para a página anterior no histórico
      this.location.back();
    }
  }

  ngOnInit() {
    this.carrinhoService.getCarrinho().subscribe((itens) => {
      this.itens = itens;
      this.total = this.carrinhoService.getTotal();

      // Se houver itens e a mensagem estiver aberta, fecha automaticamente
      if (itens.length > 0 && this.mostrarMensagemVazio) {
        this.fecharMensagem();
      }
    });
  }

  removerItem(id: number) {
    this.carrinhoService.remover(id);
  }

  aumentarQuantidade(id: number) {
    this.carrinhoService.aumentarQuantidade(id);
  }

  diminuirQuantidade(id: number) {
    this.carrinhoService.diminuirQuantidade(id);
  }

  continuar() {
    if (this.itens.length === 0) {
      this.mostrarMensagemVazio = true;
      // Fecha automaticamente após 5 segundos
      this.timeoutMensagem = setTimeout(() => {
        this.fecharMensagem();
      }, 5000);
      return;
    }
    this.router.navigate(['/finalizarCompras']);
  }

  fecharMensagem() {
    this.mostrarMensagemVazio = false;
    // Limpa o timeout se o usuário fechar manualmente
    if (this.timeoutMensagem) {
      clearTimeout(this.timeoutMensagem);
      this.timeoutMensagem = null;
    }
  }
}
