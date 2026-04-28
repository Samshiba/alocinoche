import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserApi } from '../services/user-api';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private readonly userApi = inject(UserApi);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  email = '';
  isLoading = false;

  connect(): void {
    if (!this.email) {
      this.toastr.error('Veuillez entrer votre email.');
      return;
    }

    this.isLoading = true;
    this.userApi.getUserByEmail(this.email).subscribe({
      next: (user) => {
        if (user.id) {
          this.authService.login(user.id);
          this.toastr.success('Connexion réussie !');
          this.router.navigate(['/mon-espace']);
        }
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Email non trouvé.');
      }
    });
  }
}
