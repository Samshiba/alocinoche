import { Component, inject, Input } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ReviewsApi } from '../../services/reviews-api';
import { Review } from '../../models/review';

@Component({
  selector: 'app-info-comments',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments {
  private readonly reviewsApi = inject(ReviewsApi);

  reviews$!: Observable<Review[]>;

  @Input({ required: true })
  set movieId(id: number) {
    this.reviews$ = this.reviewsApi.getReviewsByMovie(id);
  }
}
