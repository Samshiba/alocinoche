import {Component, inject} from '@angular/core';
import {MoviesApi} from '../services/movies-api';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie';
import {AsyncPipe, DatePipe} from '@angular/common';
import {MovieCard} from './movie-card/movie-card';
import {map} from 'rxjs/operators';
import { MovieBanner } from './movie-banner/movie-banner';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    DatePipe,
    MovieCard,
    MovieBanner
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly moviesApi = inject(MoviesApi)
  movies$: Observable<Movie[]> = this.moviesApi.getMovies()
  randomMovie$: Observable<Movie | undefined> = this.movies$.pipe(
    map(movies => movies.length > 0 ? movies[Math.floor(Math.random() * movies.length)] : undefined)
  )
}
