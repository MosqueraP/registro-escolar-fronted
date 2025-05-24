import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CursoService } from '@features/cursos/services/cursos';
import { EstudianteService } from '@features/estudiantes/services/estudiante.service';
import { InscripcionService } from '@features/inscripcions/services/inscripcion';
import { PersonaService } from '@features/persona/services/persona.service';
import { ProfesorService } from '@features/profesores/services/profesor.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ]
})
export class DashboardComponent implements OnInit {
  resumen: any[] = [];

  constructor(
    private personaService: PersonaService,
    private estudianteService: EstudianteService,
    private profesorService: ProfesorService,
    private cursoService: CursoService,
    private inscripcionService: InscripcionService
  ) {}

  ngOnInit(): void {
    this.loadResumen();
  }

  loadResumen() {
    this.personaService.getAll().subscribe(data =>
      this.pushResumen('person', 'Personas', data.length)
    );

    this.estudianteService.getAll().subscribe(data =>
      this.pushResumen('school', 'Estudiantes', data.length)
    );

    this.profesorService.getAll().subscribe(data =>
      this.pushResumen('person_outline', 'Profesores', data.length)
    );

    this.cursoService.getAsignados().subscribe(data =>
      this.pushResumen('book', 'Cursos', data.length)
    );

    this.inscripcionService.getAll().subscribe(data =>
      this.pushResumen('assignment', 'Inscripciones', data.length)
    );
  }

  pushResumen(icon: string, label: string, total: number) {
    this.resumen.push({ icon, label, total });
  }
}
