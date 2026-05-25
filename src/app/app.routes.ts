import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
     loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'education',
    loadChildren: () => import('./modules/education/education.module').then(m => m.EducationModule)
  },
  {
    path: 'work',
    loadChildren: () => import('./modules/work/work.module').then(m => m.WorkModule)
  },
   {
    path: 'publications', loadComponent: () => import('./components/publication/publication.component').then(m => m.PublicationComponent)
   },
    {
    path: 'contact', loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent)
   },
   {
    path: '**', redirectTo: '' // Redirect any unknown paths to the home page
   }
];
