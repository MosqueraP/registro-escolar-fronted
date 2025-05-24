import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'dashboard', renderMode: RenderMode.Prerender },
  { path: 'personas', renderMode: RenderMode.Prerender },
  { path: 'personas/nueva', renderMode: RenderMode.Prerender },
  { path: 'estudiantes', renderMode: RenderMode.Prerender },
  { path: 'estudiantes/nueva', renderMode: RenderMode.Prerender },
  { path: 'profesores', renderMode: RenderMode.Prerender },
  { path: 'profesores/nueva', renderMode: RenderMode.Prerender },
  { path: 'administrativos', renderMode: RenderMode.Prerender },
  { path: 'cursos', renderMode: RenderMode.Prerender },
  { path: 'cursos/nuevo', renderMode: RenderMode.Prerender },
  { path: 'inscripciones', renderMode: RenderMode.Prerender },
  { path: 'inscripciones/nueva', renderMode: RenderMode.Prerender },
  { path: 'inscripciones-detalladas', renderMode: RenderMode.Prerender },

  // 🚫 Desactiva prerender para rutas dinámicas con parámetros
  { path: 'personas/editar/:id', renderMode: RenderMode.Client },
  { path: 'estudiantes/editar/:id', renderMode: RenderMode.Client },
  { path: 'profesores/editar/:id', renderMode: RenderMode.Client },
  { path: 'administrativos/editar/:id', renderMode: RenderMode.Client },
  { path: 'cursos/editar/:id', renderMode: RenderMode.Client },
  { path: 'inscripciones/editar/:id', renderMode: RenderMode.Client },

  // catch-all
  { path: '**', renderMode: RenderMode.Prerender },
];
