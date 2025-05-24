import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InscripcionService } from '../../services/inscripcion';
import { EstudianteService } from '@features/estudiantes/services/estudiante.service';
import { CursoService } from '@features/cursos/services/cursos';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-inscripcion-list',
  templateUrl: './inscripcion-list.component.html',
  styleUrls: ['./inscripcion-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,

  ]
})
export class InscripcionListComponent implements OnInit {
  isMobile = false;
  displayedColumns: string[] = ['idInscripcion', 'idEstudiante', 'idCurso', 'fechaInscripcion', 'acciones'];
  inscripciones: any[] = [];
  estudiantes: any[] = [];
  cursos: any[] = [];

  constructor(
    private router: Router,
    private inscripcionService: InscripcionService,
    private estudianteService: EstudianteService,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    this.inscripcionService.getAll().subscribe(data => {
      this.inscripciones = data;
    });

    this.estudianteService.getAll().subscribe(data => {
      this.estudiantes = data;
    });

    this.cursoService.getAsignados().subscribe(data => {
      this.cursos = data;
    });

    this.onResize(); // <- Inicializar el valor en base al ancho actual
  }

  agregar() {
    this.router.navigate(['/inscripciones/nueva']);
  }

  editar(id: number) {
    this.router.navigate(['/inscripciones/editar', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Deseas eliminar esta inscripción?')) {
      this.inscripcionService.delete(id).subscribe(() => {
        this.inscripciones = this.inscripciones.filter(i => i.idInscripcion !== id);
      });
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 768;
    }
  }
}
