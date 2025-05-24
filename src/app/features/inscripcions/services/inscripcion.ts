import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private baseUrl = 'http://localhost:8080/api/inscripciones';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(inscripcion: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, inscripcion);
  }

  update(id: number, inscripcion: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, inscripcion);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
