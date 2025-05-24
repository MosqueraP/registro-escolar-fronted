import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-estudiante-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './estudiante-list.component.html',
  styleUrls: ['./estudiante-list.component.css']
})
export class EstudianteListComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'nombre', 'apellido', 'email', 'telefono',
    'fechaNacimiento', 'numeroMatricula', 'grado', 'acciones'
  ];

  estudiantes: any[] = [];

  constructor(private router: Router, private service: EstudianteService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      this.estudiantes = data;
      console.log('Estudiantes cargados:', this.estudiantes);
    });
  }

  agregar() {
    this.router.navigate(['/estudiantes/nueva']);
  }

  editar(id: number) {
    this.router.navigate(['/estudiantes/editar', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Deseas eliminar este estudiante?')) {
      this.service.delete(id).subscribe(() => {
        this.estudiantes = this.estudiantes.filter(e => e.id !== id);
      });
    }
  }
}
