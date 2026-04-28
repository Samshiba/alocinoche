import {Component, inject, Input} from '@angular/core';
import {Movie} from '../../models/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-banner',
  imports: [],
  templateUrl: './movie-banner.html',
  styleUrl: './movie-banner.scss',
})
export class MovieBanner {
  @Input({required : true}) movie! : Movie

  private router = inject(Router)

  goToMovie() {
    this.router.navigate(['/movies', this.movie.id]);
  }
}
