import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: ``,
  redirectTo: 'home',
  pathMatch: 'full',
},
{
  path: 'home',
  loadComponent: () => import('./home/home').then(m => m.Home),
},
{
  path: 'rooms',
  loadComponent: () => import('./rooms/rooms').then(m => m.Rooms),
},
{
  path: 'hotels',
  loadComponent: () => import('./hotels/hotels').then(m => m.Hotels),
},
{
  path: 'hotel-details/:id',
  loadComponent: () => import('./hotel-details/hotel-details').then(m => m.HotelDetails),
}
];
