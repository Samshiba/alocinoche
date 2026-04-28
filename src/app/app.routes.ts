import { Routes } from '@angular/router';
import {Home} from './home/home';
import {MoviesList} from './movies-list/movies-list';
import {AddMovie} from './add-movie/add-movie';
import {UpdateMovie} from './update-movie/update-movie';

import { NotFound } from './not-found/not-found';
import { MovieInfo } from './info/info';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'inscription', component: NotFound},
  { path: 'mon-espace', component: NotFound},
  { path: 'admin', component: MoviesList},
  { path: 'admin/add', component: AddMovie},
  { path: 'admin/update', component: UpdateMovie},
  { path: 'movies/:id', component: MovieInfo, data: { preload: true }},
  { path: '**', component: NotFound}
];
