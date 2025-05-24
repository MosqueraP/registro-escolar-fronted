import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { PersonaService } from '../../services/persona.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  standalone: true,
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule
  ]
})
export class PersonaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'telefono', 'fechaNacimiento', 'acciones'];
  personas: any[] = [];

  constructor(private router: Router, private service: PersonaService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data: any[]) => {
      this.personas = data;
      console.log('Personas cargadas:', this.personas);
    });
  }

  editarPersona(id: number): void {
    this.router.navigate(['/personas/editar', id]);
  }

  eliminarPersona(id: number): void {
    if (confirm('¿Estás seguro que deseas eliminar esta persona?')) {
      this.service.delete(id).subscribe(() => {
        this.personas = this.personas.filter(p => p.id !== id);
      });
    }
  }

  agregarPersona(): void {
    this.router.navigate(['/personas/nueva']);
  }
}
