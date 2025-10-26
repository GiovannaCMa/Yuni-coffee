import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonTabBar, IonTabButton, IonTabs} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search, cartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cafeespecifico',
  templateUrl: './cafeespecifico.page.html',
  styleUrls: ['./cafeespecifico.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonIcon, IonTabBar, IonTabButton, IonTabs]
})
export class CafeespecificoPage implements OnInit {

  constructor() { 
     addIcons({  search,cartOutline });}

  ngOnInit() {
  }

}
