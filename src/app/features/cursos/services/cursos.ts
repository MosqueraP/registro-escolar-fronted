import { Injectable } from '@angular/core';
import { Curso } from '../models/curso.model';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class CursoService {

  // private baseUrl = 'http://localhost:8080/api/cursos';
  // private asignacionUrl = 'http://localhost:8080/api/cursos/asignacion';

  private baseUrl = `${environment.apiUrl}/cursos`;
  private asignacionUrl = `${environment.apiUrl}/cursos/asignacion`;

  constructor(private http: HttpClient) {}

  getAsignados(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.asignacionUrl);
  }

  update(id: number, curso: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, curso);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.baseUrl}/${id}`);
  }

  create(curso: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, curso);
  }
}
