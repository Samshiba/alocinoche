import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserApi } from '../services/user-api';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.scss'
})
export class Inscription {

  private readonly userApi = inject(UserApi);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  user: User = {
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
  };

  isLoading = false;

  onEmailBlur(): void {
    if (!this.user.email) return;
    this.userApi.getUserByEmail(this.user.email).subscribe({
      next: () => this.toastr.error('Cet email est déjà utilisé.'),
      error: () => {}
    });
  }

  register(): void {
    this.isLoading = true;
    this.userApi.createUser(this.user).subscribe({
      next: (created) => {
        if (created.id) {
          this.authService.login(created.id);
          this.toastr.success('Compte créé avec succès !');
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Une erreur est survenue.');
      }
    });
  }
}