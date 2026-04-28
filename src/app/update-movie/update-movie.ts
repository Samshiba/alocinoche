import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MoviesApi} from '../services/movies-api';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../models/movie';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-movie',
  imports: [
    FormsModule
  ],
  templateUrl: './update-movie.html',
  styleUrl: './update-movie.scss',
})
export class UpdateMovie {
  private readonly moviesApi = inject(MoviesApi)
  private route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly id = Number(this.route.snapshot.queryParamMap.get('id'));
  movie: Movie = {} as Movie;
  originalTitle = '';
  releaseDate = '';

  constructor(private toastrService: ToastrService) {
    if (!this.id || isNaN(this.id)) {
      this.router.navigate(['/admin']);
      return;
    }

    this.moviesApi.getMovie(this.id).subscribe(movie => {
      this.movie = movie;
      this.originalTitle = movie.title;
      this.releaseDate = new Date(movie.releaseDate).toISOString().split('T')[0];
    });
  }

  protected updateMovie() {
    this.moviesApi.updateMovie({
      ...this.movie,
      releaseDate: new Date(this.releaseDate)
    }).subscribe(() => {
      this.toastrService.success('Film modifié');
      this.router.navigate(['/admin']);
    });
  }
}
