import { Component, inject, Input } from '@angular/core';
import {RouterLink} from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Input({ required: true }) title! : string

  private readonly authService = inject(AuthService);

  isLoggedIn$ = this.authService.isLoggedIn$;
}
