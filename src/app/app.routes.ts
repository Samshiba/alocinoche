import { Routes } from '@angular/router';
import {Home} from './home/home';
import {MoviesList} from './movies-list/movies-list';
import {AddMovie} from './add-movie/add-movie';
import {UpdateMovie} from './update-movie/update-movie';

import { NotFound } from './not-found/not-found';
import { MovieInfo } from './info/info';
import { Inscription } from './inscription/inscription';
import { MonEspace } from './mon-espace/mon-espace';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'login', component: Login},
  { path: 'inscription', component: Inscription},
  { path: 'mon-espace', component: MonEspace},
  { path: 'admin', component: MoviesList},
  { path: 'admin/add', component: AddMovie},
  { path: 'admin/update', component: UpdateMovie},
  { path: 'movies/:id', component: MovieInfo, data: { preload: true }},
  { path: '**', component: NotFound}
];
