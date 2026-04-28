import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewsApi {
  private readonly httpClient = inject(HttpClient);
  private readonly url = 'http://localhost:8080';

  getReviewsByMovie(movieId: number): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${this.url}/movies/${movieId}/reviews`);
  }
}
