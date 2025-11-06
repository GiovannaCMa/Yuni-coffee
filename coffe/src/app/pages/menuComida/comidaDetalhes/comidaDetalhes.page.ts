import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-comida-detalhes',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  templateUrl: './comidaDetalhes.page.html',
  styleUrls: ['./comidaDetalhes.page.scss']
})
export class ComidaDetalhesPage implements OnInit {

  comida: any;
  ingredientes: string[] = [];
  preco: string | null = null;
  descricaoSelecionada: any = null;

  // 💖 Descrições e avaliações personalizadas
descricaoPersonalizada: any = {
  "Bread omelette": {
    descricao: "Pão dourado e fofinho recheado com omelete leve e temperada, perfeito para começar o dia com sabor e energia.",
    avaliacao: 4.5
  },
  "Breakfast Potatoes": {
    descricao: "Batatinhas douradas por fora e macias por dentro, temperadas com ervas e um toque de manteiga — o acompanhamento ideal para qualquer manhã.",
    avaliacao: 4.6
  },
  "Fruit and Cream Cheese Breakfast Pastries": {
    descricao: "Massa folhada delicada, recheada com cream cheese cremoso e frutas frescas — uma combinação irresistível de doçura e leveza.",
    avaliacao: 4.9
  },
  "Apple & Blackberry Crumble": {
    descricao: "Maçãs e amoras assadas sob uma cobertura crocante amanteigada — um clássico britânico que aquece o coração.",
    avaliacao: 4.8
  },
  "Apple Frangipane Tart": {
    descricao: "Tarte de maçã com recheio de creme de amêndoas e toque sutil de baunilha, equilibrando doçura e sofisticação em cada mordida.",
    avaliacao: 4.7
  }};


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.preco = this.route.snapshot.queryParamMap.get('preco');

    if (!id) {
      console.error('ID não encontrado!');
      this.voltar();
      return;
    }

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    this.http.get(url).subscribe({
      next: (res: any) => {
        if (res.meals && res.meals.length > 0) {
          this.comida = res.meals[0];
          this.setDescricaoPersonalizada(); // ⚡ chama aqui
        } else {
          this.voltar();
        }
      },
      error: (err) => {
        console.error('Erro ao buscar detalhes da comida:', err);
        this.voltar();
      }
    });
  }



  // ✨ Define descrição personalizada se existir
  setDescricaoPersonalizada() {
    const nome = this.comida?.strMeal;
    if (nome && this.descricaoPersonalizada[nome]) {
      this.descricaoSelecionada = this.descricaoPersonalizada[nome];
    } else {
      this.descricaoSelecionada = null;
    }
  }

  // ⬅️ Voltar
  voltar() {
    this.location.back();
  }
}
