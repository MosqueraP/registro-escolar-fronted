import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  standalone: true,
  selector: 'app-estudiante-form',
  templateUrl: './estudiante-form.component.html',
  styleUrls: ['./estudiante-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class EstudianteFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  estudianteId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: EstudianteService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      fechaNacimiento: [''],
      numeroMatricula: ['', Validators.required],
      grado: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.estudianteId = +id;
      this.service.getById(this.estudianteId).subscribe(est => {
        this.form.patchValue(est);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const estudiante = this.form.value;

    if (this.editMode && this.estudianteId) {
      this.service.update(this.estudianteId, estudiante).subscribe(() =>
        this.router.navigate(['/estudiantes'])
      );
    } else {
      this.service.create(estudiante).subscribe(() =>
        this.router.navigate(['/estudiantes'])
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/estudiantes']);
  }
}
