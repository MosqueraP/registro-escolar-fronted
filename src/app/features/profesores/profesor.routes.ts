import { Routes } from '@angular/router';

export const PROFESOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../profesores/components/profesor-list/profesor-list.component')
        .then(m => m.ProfesorListComponent)
  },
  {
    path: 'nueva',
    loadComponent: () =>
      import('../profesores/components/profesor-form/profesor-form.component')
        .then(m => m.ProfesorFormComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('../profesores/components/profesor-form/profesor-form.component')
        .then(m => m.ProfesorFormComponent),
        data: { prerender: false }
  }
];
