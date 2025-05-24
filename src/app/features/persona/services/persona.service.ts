import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
// import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  // private apiUrl = 'http://localhost:8080/api/personas';
  private apiUrl = `${environment.apiUrl}/personas`;


  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(persona: any): Observable<any> {
    return this.http.post(this.apiUrl, persona);
  }

  update(id: number, persona: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, persona);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
