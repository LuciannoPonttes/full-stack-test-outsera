import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { MoviesListComponent } from './app/components/movies-list/movies-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'movies',
    component: MoviesListComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
}).catch(console.error);