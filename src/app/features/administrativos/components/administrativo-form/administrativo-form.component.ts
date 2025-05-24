import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AdministrativoService } from '../../services/administrativo.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-administrativo-form',
  standalone: true,
  templateUrl: './administrativo-form.component.html',
  styleUrls: ['./administrativo-form.component.css'],
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
export class AdministrativoFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  administrativoId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AdministrativoService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      fechaNacimiento: [''],
      cargo: ['', Validators.required],
      departamento: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.administrativoId = +id;
      this.service.getById(this.administrativoId).subscribe(a => this.form.patchValue(a));
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const administrativo = this.form.value;

    if (this.editMode && this.administrativoId) {
      this.service.update(this.administrativoId, administrativo).subscribe(() =>
        this.router.navigate(['/administrativos'])
      );
    } else {
      this.service.create(administrativo).subscribe(() =>
        this.router.navigate(['/administrativos'])
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/administrativos']);
  }
}
