import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {MoviesApi} from '../services/movies-api';
import {Movie} from '../models/movie';
import {RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-movies-list',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss',
})
export class MoviesList implements OnInit {
  private readonly moviesApi = inject(MoviesApi)
  movies: Movie[] = []
  private destroyRef = inject(DestroyRef)

  constructor(private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.moviesApi.getMovies().subscribe(movies => this.movies = movies);
  }

  deleteMovie(id: number): void {
    this.moviesApi.deleteMovie(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.toastrService.error('Film supprimé')
      this.movies = this.movies.filter(film => film.id !== id);
    }
    );
  }

}
