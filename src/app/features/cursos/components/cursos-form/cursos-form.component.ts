import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../services/cursos';
import { ProfesorService } from '../../../profesores/services/profesor.service';
import { Curso } from '../../models/curso.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class CursoFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  cursoId?: number;
  profesores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: CursoService,
    private profesorService: ProfesorService
  ) {}

  ngOnInit(): void {
  this.form = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    creditos: [0, Validators.required],
    idProfesor: [null, Validators.required]
  });

  const id = this.route.snapshot.paramMap.get('id');

  // Primero cargamos los profesores
  this.profesorService.getAll().subscribe({
    next: (data) => {
      this.profesores = data;

      // Después de cargar profesores, si estamos en modo edición
      if (id) {
        this.editMode = true;
        this.cursoId = +id;

        this.service.getById(this.cursoId).subscribe((c: Curso) => {
          this.form.patchValue({
            nombre: c.nombre,
            descripcion: c.descripcion,
            creditos: c.creditos,
            idProfesor: c.idProfesor // Asegúrate que venga este campo del backend
          });
        });
      }
    },
    error: (err) => {
      console.error('Error cargando profesores:', err);
    }
  });
}


  onSubmit(): void {
    if (this.form.invalid) return;

    const curso = this.form.value;

    if (this.editMode && this.cursoId) {
      this.service.update(this.cursoId, curso).subscribe(() => {
        this.router.navigate(['/cursos']);
      });
    } else {
      this.service.create(curso).subscribe(() => {
        this.router.navigate(['/cursos']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }
}
