import {Component, inject, Input} from '@angular/core';
import {Movie} from '../../models/movie';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [
    DatePipe
  ],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  @Input({required : true}) movie! : Movie

  private router = inject(Router)

  goToMovie(id: number) {
    this.router.navigate(['/movies', id]);
  }
}
