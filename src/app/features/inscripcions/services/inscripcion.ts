import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  // private baseUrl = 'http://localhost:8080/api/inscripciones';
  private apiUrl = `${environment.apiUrl}/inscripciones`;


  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(inscripcion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, inscripcion);
  }

  update(id: number, inscripcion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, inscripcion);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
