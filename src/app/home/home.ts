import {Component, inject} from '@angular/core';
import {MoviesApi} from '../services/movies-api';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie';
import {AsyncPipe, DatePipe} from '@angular/common';
import {MovieCard} from './movie-card/movie-card';
import {map} from 'rxjs/operators';
import { MovieBanner } from './movie-banner/movie-banner';
import { MovieTop } from './movie-top/movie-top';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    DatePipe,
    MovieCard,
    MovieBanner,
    MovieTop
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
  topthreeMovies$: Observable<Movie[]> = this.movies$.pipe(
    map(movies => movies.sort((a, b) => (b.rate || 0) - (a.rate || 0)).slice(0, 3))
  )
}
