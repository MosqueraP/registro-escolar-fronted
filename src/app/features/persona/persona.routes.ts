import { Routes } from '@angular/router';

export const PERSONA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/persona-list/persona-list.component').then(m => m.PersonaListComponent)
  },
  {
    path: 'nueva',
    loadComponent: () =>
      import('./components/persona-list/persona-list.component').then(m => m.PersonaFormComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./components/persona-list/persona-list.component').then(m => m.PersonaFormComponent),
    data: { prerender: false }
  }
];
