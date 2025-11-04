import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cafe-detalhes',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './cafeDetalhe.page.html',
  styleUrls: ['./cafeDetalhe.page.scss']
})
export class CafeDetalhePage implements OnInit {
  drink: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const dados = localStorage.getItem('drinkSelecionado');
    if (dados) {
      this.drink = JSON.parse(dados);
    } else {
      this.router.navigate(['/cafeespecifico']);
    }
  }
  voltar() {
    this.router.navigate(['/cafeespecifico']);
  }
}
