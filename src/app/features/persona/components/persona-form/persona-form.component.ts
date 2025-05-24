import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PersonaService } from '../../services/persona.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  standalone: true,
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule
  ]
})
export class PersonaFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  personaId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: PersonaService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      fechaNacimiento: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.personaId = +id;
      this.service.getById(this.personaId).subscribe(persona => this.form.patchValue(persona));
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const persona = this.form.value;
    if (this.editMode && this.personaId) {
      this.service.update(this.personaId, persona).subscribe(() => this.router.navigate(['/personas']));
    } else {
      this.service.create(persona).subscribe(() => this.router.navigate(['/personas']));
    }
  }
}
