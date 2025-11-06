import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, Location } from '@angular/common'; // Importa CommonModule e Location
import { Router, ActivatedRoute } from '@angular/router'; // Importa Router e ActivatedRoute
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importa HttpClient

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
  // ⭐️ NENHUMA VARIÁVEL 'preco' AQUI ⭐️

  constructor(
    private router: Router,
    private route: ActivatedRoute, // Para ler o ID da URL
    private http: HttpClient,      // Para fazer a chamada à API
    private location: Location     // Para o botão 'voltar'
  ) {}

  ngOnInit() {
    // Pega o 'id' que foi enviado pela URL
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.error('ID não encontrado!');
      this.voltar();
      return;
    }

    // Usa o ID para buscar os detalhes completos na API
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    this.http.get(url).subscribe({
      next: (res: any) => {
        if (res.meals && res.meals.length > 0) {
          this.comida = res.meals[0]; // Guarda o objeto completo
          this.processarIngredientes(); // Chama a função para listar ingredientes
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

  // Função para processar os ingredientes
  processarIngredientes() {
    if (!this.comida) return;

    this.ingredientes = [];
    for (let i = 1; i <= 20; i++) {
      const ingrediente = this.comida[`strIngredient${i}`];
      const medida = this.comida[`strMeasure${i}`];

      if (ingrediente && ingrediente.trim()) {
        this.ingredientes.push(`${medida} ${ingrediente}`);
      }
    }
  }

  // Função 'voltar()'
  voltar() {
    this.location.back(); // Simplesmente volta para a tela anterior
  }
}
