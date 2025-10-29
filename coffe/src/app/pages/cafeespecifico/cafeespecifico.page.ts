import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { cartOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-cafeespecifico',
  templateUrl: './cafeespecifico.page.html',
  styleUrls: ['./cafeespecifico.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CafeespecificoPage {
  constructor() {
       addIcons({cartOutline}); }
  }




