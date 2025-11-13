import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrinksService {
  private baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  getBebidasFrias(): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter.php?a=Non_Alcoholic`);
  }
  getCafesQuentes(): Observable<any> {
  return this.http.get(`${this.baseUrl}/filter.php?c=Coffee_/_Tea`);
}

}


