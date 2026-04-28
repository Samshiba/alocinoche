import {Component, Input} from '@angular/core';
import {Movie} from '../../models/movie';

@Component({
  selector: 'app-movie-banner',
  imports: [],
  templateUrl: './movie-banner.html',
  styleUrl: './movie-banner.scss',
})
export class MovieBanner {
  @Input({required : true}) movie! : Movie
}
