import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // ✅ Importar isso!
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]  // ✅ Adicionar IonicModule aqui
})
export class HomePage {
  constructor() {}
}
