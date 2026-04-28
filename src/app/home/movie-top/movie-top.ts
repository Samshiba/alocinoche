import {Component, Input} from '@angular/core';
import {Movie} from '../../models/movie';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-movie-top',
  imports: [MovieCard],
  templateUrl: './movie-top.html',
  styleUrl: './movie-top.scss',
})
export class MovieTop {
  @Input({required : true}) movies! : Movie[]
}
