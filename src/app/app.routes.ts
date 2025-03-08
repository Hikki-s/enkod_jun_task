import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { CitiesPageComponent } from './pages/cities-page/cities-page.component';
import { CreateCityPageComponent } from './pages/create-city-page/create-city-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'cities',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'cities',
        component: CitiesPageComponent,
      },
      {
        path: 'create_city',
        component: CreateCityPageComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'cities',
  },
];
