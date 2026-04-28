import { User } from './user';
import { Movie } from './movie';

export interface Review {
  id?: number;
  user: User;
  movie: Movie;
  rate: number;
  text: string;
  reviewDate?: string;
}

export interface CheckReviewDTO {
  userId: number;
  filmId: number;
}