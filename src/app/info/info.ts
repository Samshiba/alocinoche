import { Component, inject, Input, input } from '@angular/core';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { MoviesApi } from '../services/movies-api';
import { AsyncPipe } from '@angular/common';
import { Header } from './header/header';
import { Rating } from './rating/rating';
import { InfoDate } from './date/date';
import { Director } from './director/director';
import { Comments } from './comments/comments';

@Component({
  selector: 'app-movie-info',
  imports: [
    AsyncPipe,
    Header,
    Rating,
    InfoDate,
    Director,
    Comments
  ],
  templateUrl: './info.html',
  styleUrl: './info.scss',
})


export class MovieInfo {
  private readonly moviesApi = inject(MoviesApi)

  movie$!: Observable<Movie>;

  @Input()
  set id(id: number) {
    this.movie$ = this.moviesApi.getMovie(id);
  }
}
