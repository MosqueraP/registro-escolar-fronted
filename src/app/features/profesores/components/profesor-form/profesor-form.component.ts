import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProfesorService } from '../../services/profesor.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  standalone: true,
  selector: 'app-profesor-form',
  templateUrl: './profesor-form.component.html',
  styleUrls: ['./profesor-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    RouterModule
  ]
})
export class ProfesorFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  profesorId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ProfesorService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      fechaNacimiento: [''],
      especialidad: ['', Validators.required],
      fechaContratacion: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.profesorId = +id;
      this.service.getById(this.profesorId).subscribe(p => {
        this.form.patchValue(p);
      });
    }
  }

  onSubmit(): void {
  if (this.form.invalid) {
    console.warn('Formulario inválido');
    return;
  }

  const profesor = this.form.value;

  if (this.editMode && this.profesorId) {
    this.service.update(this.profesorId, profesor).subscribe(() => {
      this.router.navigate(['/profesores']);
    });
  } else {
    this.service.create(profesor).subscribe(() => {
      this.router.navigate(['/profesores']);
    });
  }
}
  cancelar(): void {
    this.router.navigate(['/profesores']);
  }
}
