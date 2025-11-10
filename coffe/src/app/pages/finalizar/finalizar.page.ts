import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.page.html',
  styleUrls: ['./finalizar.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FinalizarPage implements OnInit {

  constructor() {}

  ngOnInit() {}
}
