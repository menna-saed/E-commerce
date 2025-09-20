import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
    path: 'details/:id',
    renderMode: RenderMode.Server
  }  ,
  {
     path: 'chekout/:id',
    renderMode: RenderMode.Server
  }  ,
  {
    path: 'details/:slug/:id',
    renderMode: RenderMode.Server
  }  ,
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
