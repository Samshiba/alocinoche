import {Component, inject} from '@angular/core';
import {Movie} from '../models/movie';
import {FormsModule} from '@angular/forms';
import {MoviesApi} from '../services/movies-api';
import {Router} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-movie',
  imports: [
    FormsModule
  ],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.scss',
})
export class AddMovie {

  private readonly moviesApi = inject(MoviesApi)
  private router = inject(Router)

  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  }

  constructor(private toastrService: ToastrService) {}

  addMovie(): void {
    this.moviesApi.addMovie(this.movie).subscribe(
      () => {
        this.toastrService.success('Film ajouté');
        this.router.navigate(['/admin'])
      }
    );
  }




}
