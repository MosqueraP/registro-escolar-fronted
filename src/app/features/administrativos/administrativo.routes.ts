import { Routes } from '@angular/router';

export const ADMINISTRATIVO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../administrativos/components/administrativo-list/administrativo-list.component')
        .then(m => m.AdministrativoListComponent)
  },
  {
    path: 'nueva',
    loadComponent: () =>
      import('../administrativos/components/administrativo-form/administrativo-form.component')
        .then(m => m.AdministrativoFormComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('../administrativos/components/administrativo-form/administrativo-form.component')
        .then(m => m.AdministrativoFormComponent),
          data: { prerender: false }

  }
];
