import { Injectable } from '@angular/core';
import { Curso } from '../models/curso.model';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CursoService {

  private baseUrl = 'http://localhost:8080/api/cursos';
  private asignacionUrl = 'http://localhost:8080/api/cursos/asignacion';

  constructor(private http: HttpClient) {}

  getAsignados(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.asignacionUrl);
  }

  update(id: number, curso: any): Observable<any> {
  return this.http.put<any>(`http://localhost:8080/api/cursos/${id}`, curso);
  }


  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.asignacionUrl}/${id}`);
  // }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getById(id: number): Observable<Curso> {
  return this.http.get<Curso>(`http://localhost:8080/api/cursos/${id}`);
  }

  create(curso: any): Observable<any> {
  return this.http.post<any>('http://localhost:8080/api/cursos', curso);
}

}
