import { Routes } from '@angular/router';

export const CURSO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/cursos-list/cursos-list.component')
        .then(m => m.CursoListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () =>
      import('./components/cursos-form/cursos-form.component')
        .then(m => m.CursoFormComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./components/cursos-form/cursos-form.component')
        .then(m => m.CursoFormComponent),
        data: { prerender: false }
  }
];
