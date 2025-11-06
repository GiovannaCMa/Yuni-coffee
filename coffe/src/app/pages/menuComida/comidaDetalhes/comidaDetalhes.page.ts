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
      descricao: "Drink sem álcool, doce e frutado, feito com sucos de abacaxi, laranja e groselha. Refrescante e vibrante, perfeito para dias quentes.",
      avaliacao: 4.5
    },
    "Brilho residual": {
      descricao: "Refrescante e doce, com notas suaves de frutas cítricas 🍊",
      avaliacao: 4.8
    },
    "Lemonade": {
      descricao: "Clássico e equilibrado — o sabor azedinho do limão com um toque de doçura 🍋",
      avaliacao: 5.0
    },
    "Alice Cocktail": {
      descricao: "Drink sem álcool, doce e cremoso, preparado com suco de frutas e um toque suave de leite ou creme. De cor rosada e sabor envolvente, é refrescante e delicado, perfeito para quem busca uma bebida leve e charmosa.",
      avaliacao: 4.7
    },
    "Aloha Fruit punch": {
      descricao: "Drink sem álcool, tropical e vibrante, feito com uma mistura de sucos de laranja, abacaxi e groselha. Doce, frutado e colorido, traz o sabor do verão em cada gole — perfeito para momentos leves e cheios de energia.",
      avaliacao: 4.5
    }
  };

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
