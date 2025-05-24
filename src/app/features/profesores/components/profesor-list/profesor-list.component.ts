import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { ProfesorService } from '../../services/profesor.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-profesor-list',
  templateUrl: './profesor-list.component.html',
  styleUrls: ['./profesor-list.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule, MatTooltipModule, MatIconModule]
})
export class ProfesorListComponent {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'telefono', 'especialidad', 'fechaNacimiento', 'fechaContratacion', 'acciones'];
  profesores: any[] = [];

  constructor(private router: Router, private service: ProfesorService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.profesores = data;
    });
  }

  agregar() {
    this.router.navigate(['/profesores/nueva']);
  }

  editar(id: number) {
    this.router.navigate(['/profesores/editar', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Deseas eliminar este profesor?')) {
      this.service.delete(id).subscribe(() => {
        this.profesores = this.profesores.filter(p => p.id !== id);
      });
    }
  }
}
