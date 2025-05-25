import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { INSCRIPCION_ROUTES } from './features/inscripcions/inscripcion.routes';
import { PROFESOR_ROUTES } from './features/profesores/profesor.routes';
import { ADMINISTRATIVO_ROUTES } from './features/administrativos/administrativo.routes';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      {
        path: 'personas',
        loadChildren: () => import('./features/persona/persona.routes').then(m => m.PERSONA_ROUTES)
      },
     { path: 'estudiantes', loadChildren: () => import('./features/estudiantes/estudiante.routes').then(m => m.ESTUDIANTE_ROUTES) },

      { path: 'profesores', children: PROFESOR_ROUTES },
      { path: 'administrativos', children: ADMINISTRATIVO_ROUTES },
      {path: 'cursos',loadChildren: () => import('./features/cursos/curso.routes').then(m => m.CURSO_ROUTES)
      },
      { path: 'inscripciones',
        loadChildren: () =>
          import('./features/inscripcions/inscripcion.routes').then(m => m.INSCRIPCION_ROUTES)
      },
      {
        path: 'inscripciones-detalladas',
        loadChildren: () =>
          import('./features/insc-detallada/inscripcion.routes').then(m => m.INSCRIPCION_DETALLADA_ROUTES)
      }

    ]
  }
];
