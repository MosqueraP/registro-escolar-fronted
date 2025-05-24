import { Routes } from '@angular/router';
import { InscripcionFormComponent } from './components/inscripcion-form/inscripcion-form.component';
import { InscripcionListComponent } from './components/inscripcion-list/inscripcion-list.component';

export const INSCRIPCION_ROUTES: Routes = [
  { path: '', component: InscripcionListComponent },
  { path: 'nueva', component: InscripcionFormComponent },
  { path: 'editar/:id', component: InscripcionFormComponent,
    data: { prerender: false }
   }
];
