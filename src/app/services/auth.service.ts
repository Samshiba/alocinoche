import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('userId')
  );

  readonly isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(userId: number): void {
    localStorage.setItem('userId', String(userId));
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('userId');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
  }
}
