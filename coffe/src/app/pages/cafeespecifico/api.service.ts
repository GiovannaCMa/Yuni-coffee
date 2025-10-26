// cocktail.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

  constructor(private http: HttpClient) { }

  // Buscar drink por nome
  searchCocktail(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}search.php?s=${name}`);
  }

  // Buscar drink aleatório
  getRandomCocktail(): Observable<any> {
    return this.http.get(`${this.baseUrl}random.php`);
  }

  // Listar categorias
  listCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}list.php?c=list`);
  }
}
