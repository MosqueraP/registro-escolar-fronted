import { Routes } from '@angular/router';

export const ESTUDIANTE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/estudiante-list/estudiante-list.component').then(m => m.EstudianteListComponent)
  },
  {
    path: 'nueva',
    loadComponent: () =>
      import('../estudiantes/components/estudiante-form/estudiante-form.component')
        .then(m => m.EstudianteFormComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('../estudiantes/components/estudiante-form/estudiante-form.component')
        .then(m => m.EstudianteFormComponent),
          data: { prerender: false }
  }

];
