import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MoviesApi} from '../services/movies-api';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../models/movie';
import {DatePipe, CommonModule} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-movie',
  imports: [
    FormsModule,
    CommonModule
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
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  currentImageUrl: string | null = null;

  constructor(private toastrService: ToastrService) {
    if (!this.id || isNaN(this.id)) {
      this.router.navigate(['/admin']);
      return;
    }

    this.moviesApi.getMovie(this.id).subscribe(movie => {
      this.movie = movie;
      this.originalTitle = movie.title;
      this.releaseDate = new Date(movie.releaseDate).toISOString().split('T')[0];
      
      this.moviesApi.getMovieImage(this.id).subscribe(blob => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.currentImageUrl = e.target.result;
        };
        reader.readAsDataURL(blob);
      }, () => {
        this.currentImageUrl = null;
      });
    });
  }

  protected onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  protected updateMovie() {
    this.moviesApi.updateMovie({
      ...this.movie,
      releaseDate: new Date(this.releaseDate)
    }).subscribe(() => {
      if (this.selectedFile) {
        this.moviesApi.updateMovieImage(this.id, this.selectedFile).subscribe(() => {
          this.toastrService.success('Film et image modifiés');
          this.router.navigate(['/admin']);
        }, () => {
          this.toastrService.success('Film modifié (erreur lors de l\'upload de l\'image)');
          this.router.navigate(['/admin']);
        });
      } else {
        this.toastrService.success('Film modifié');
        this.router.navigate(['/admin']);
      }
    });
  }
}
