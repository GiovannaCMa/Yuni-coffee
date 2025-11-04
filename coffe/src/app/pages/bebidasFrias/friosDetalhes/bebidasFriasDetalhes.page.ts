import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bebidas-frias-detalhes',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './bebidasFriasDetalhes.page.html',
  styleUrls: ['./bebidasFriasDetalhes.page.scss']
})
export class BebidasFriasDetalhesPage implements OnInit {
  drink: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const dados = localStorage.getItem('drinkSelecionado');
    if (dados) {
      this.drink = JSON.parse(dados);
    } else {
      this.router.navigate(['/bebidasFrias']);
    }
  }
  voltar() {
    this.router.navigate(['/bebidasFrias']);
  }
}
