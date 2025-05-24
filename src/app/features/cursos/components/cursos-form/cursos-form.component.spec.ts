import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class CursoFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  cursoId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: CursoService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      duracion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.cursoId = +id;
      this.service.getById(this.cursoId).subscribe(curso => {
        this.form.patchValue(curso);
      });
    }
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
