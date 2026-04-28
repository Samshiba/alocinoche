import { Routes } from '@angular/router';
import {Home} from './home/home';
import {MoviesList} from './movies-list/movies-list';
import {AddMovie} from './add-movie/add-movie';
import {UpdateMovie} from './update-movie/update-movie';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'inscription', component: Home},
  { path: 'mon-espace', component: Home},
  { path: 'admin', component: MoviesList},
  { path: 'admin/add', component: AddMovie},
  { path: 'admin/update', component: UpdateMovie}
];
