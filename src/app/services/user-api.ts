import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private readonly httpClient = inject(HttpClient)
  private readonly url = "http://localhost:8080/users"
 
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }
 
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }
 
  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/byEmail/${email}`);
  }
 
  createUser(user: Omit<User, 'id' | 'points'>): Observable<User> {
    return this.httpClient.post<User>(this.url, user);
  }
 
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/${id}`, user);
  }
 
  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
 
}
