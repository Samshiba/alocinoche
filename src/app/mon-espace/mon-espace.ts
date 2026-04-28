import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserApi } from '../services/user-api';
import { ReviewsApi } from '../services/reviews-api';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Review } from '../models/review';

@Component({
  selector: 'app-mon-espace',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './mon-espace.html',
  styleUrl: './mon-espace.scss'
})
export class MonEspace implements OnInit {

  private readonly userApi = inject(UserApi);
  private readonly reviewsApi = inject(ReviewsApi);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  user: User | null = null;
  reviews: Review[] = [];
  isLoading = true;

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      this.toastr.error('Vous devez être connecté.');
      this.router.navigate(['/login']);
      return;
    }

    this.loadUserData(userId);
  }

  private loadUserData(userId: number): void {
    this.userApi.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.loadUserReviews(userId);
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Erreur lors du chargement du profil.');
      }
    });
  }

  private loadUserReviews(userId: number): void {
    this.reviewsApi.getReviewsByUserId(userId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Erreur lors du chargement des avis.');
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.toastr.success('Déconnexion réussie.');
    this.router.navigate(['/']);
  }
}
