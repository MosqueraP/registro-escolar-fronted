import { Routes } from '@angular/router';

export const PERSONA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/persona/components/persona-list/persona-list.component')
        .then(m => m.PersonaListComponent)
  },
  {
    path: 'nueva',
    loadComponent: () =>
      import('../features/persona/components/persona-form/persona-form.component')
        .then(m => m.PersonaFormComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('../features/persona/components/persona-form/persona-form.component')
        .then(m => m.PersonaFormComponent)
  }
];
