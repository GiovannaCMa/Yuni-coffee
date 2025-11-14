import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComidasServiceBreakfast {
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';


  constructor(private http: HttpClient) {}

  getBreakfast(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/filter.php?c=Breakfast`).pipe(
      map((res: any) => res.meals || []),
      catchError(() => of([]))
    );
  }

}
@Injectable({
  providedIn: 'root',
})
export class ComidasServiceDessert {
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  getDesserts(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/filter.php?c=Dessert`).pipe(
      map((res: any) => res.meals || []),
      catchError(() => of([]))
    );
  }
}
