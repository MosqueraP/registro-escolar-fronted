import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionDetalladaService {
  // private baseUrl = 'http://localhost:8080/api/inscripciones/con-nombres/paginado';

  private apiUrl = `${environment.apiUrl}/inscripciones/con-nombres/paginado`;



  constructor(private http: HttpClient) {}

  getAll(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
}
