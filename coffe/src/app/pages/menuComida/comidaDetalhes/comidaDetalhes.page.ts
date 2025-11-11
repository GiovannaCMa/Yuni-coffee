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
  preco: string | null = null;
  descricaoSelecionada: any = null;
  porcaoSelecionada: string = '';
  volumeSelecionado: string | null = null;

  // 💖 Descrições e avaliações personalizadas
  descricaoPersonalizada: any = {
    "Apple Frangipan Tart": {
      descricao: "Pão dourado e fofinho recheado com omelete leve e temperada, perfeito para começar o dia com sabor e energia.",
      avaliacao: 4.5
    },
    "Battenberg Cake": {
      descricao: "Camadas fofinhas de bolo amanteigado nas cores rosa e amarela, envoltas em uma fina camada de marzipã. Um clássico britânico cheio de charme!",
      avaliacao: 4.6
    },
    "Fruit and Cream Cheese Breakfast Pastries": {
      descricao: "Massa folhada delicada, recheada com cream cheese cremoso e frutas frescas — uma combinação irresistível de doçura e leveza.",
      avaliacao: 4.9
    },
    "Blueberry & lemon friands": {
      descricao: "Bolinhos delicados com mirtilos suculentos e toque cítrico de limão, macios por dentro e levemente crocantes por fora.",
      avaliacao: 4.8
    },
    "Carrot Cake": {
      descricao: "Bolo fofinho de cenoura com especiarias e cobertura cremosa de cream cheese. Um clássico aconchegante com sabor de casa e cheirinho de canela.",
      avaliacao: 4.7
    }
  };

  // 🍛 Porções padrão
  porcoesPadrao: any = {
    "Battenberg Cake": "pequeno",
    "Blueberry & lemon friands": "grande",
    "Fruit and Cream Cheese Breakfast Pastries": "pequeno",
    "Carrot Cake": "pequeno",
    "Apple Frangipan Tart": "medio"
  };

  // 📦 Volumes padrão
  volumeDefinido: any = {
    "Battenberg Cake": "250 g",
    "Blueberry & lemon friands": "300 g",
    "Fruit and Cream Breakfast Pastries": "200 g",
    "Carrot Cake": "350 g",
    "Apple Frangipan Tart": "400 g"
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

          const nome = this.comida.strMeal;
          this.porcaoSelecionada = this.porcoesPadrao[nome] || '1 porção';

          // ⚡ Define descrição e volume personalizados
          this.setDescricaoPersonalizada();
          this.setVolumeSelecionado();
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

  // 📦 Define volume se existir
  setVolumeSelecionado() {
    const nome = this.comida?.strMeal;
    if (nome && this.volumeDefinido[nome]) {
      this.volumeSelecionado = this.volumeDefinido[nome];
    } else {
      this.volumeSelecionado = null;
    }
  }

  // ⬅️ Voltar
  voltar() {
    this.location.back();
  }
}
