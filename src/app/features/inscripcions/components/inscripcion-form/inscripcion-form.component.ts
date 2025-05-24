import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { EstudianteService } from '../../../estudiantes/services/estudiante.service';
import { CursoService } from '@features/cursos/services/cursos';
import { InscripcionService } from '@features/inscripcions/services/inscripcion';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-inscripcion-form',
  standalone: true,
  templateUrl: './inscripcion-form.component.html',
  styleUrls: ['./inscripcion-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class InscripcionFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  inscripcionId!: number;

  cursos: any[] = [];
  estudiantes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inscripcionService: InscripcionService,
    private cursoService: CursoService,
    private estudianteService: EstudianteService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idEstudiante: [null, Validators.required],
      idCurso: [null, Validators.required],
      fechaInscripcion: ['', Validators.required]
    });

    // Cargar cursos y estudiantes
    this.cursoService.getAsignados().subscribe(data => this.cursos = data);
    this.estudianteService.getAll().subscribe(data => this.estudiantes = data);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.inscripcionId = +id;
      this.inscripcionService.getById(this.inscripcionId).subscribe(inscripcion => {
        this.form.patchValue(inscripcion);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const inscripcion = this.form.value;

    if (this.editMode) {
      this.inscripcionService.update(this.inscripcionId, inscripcion).subscribe(() => {
        this.router.navigate(['/inscripciones']);
      });
    } else {
      this.inscripcionService.create(inscripcion).subscribe(() => {
        this.router.navigate(['/inscripciones']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/inscripciones']);
  }
}
