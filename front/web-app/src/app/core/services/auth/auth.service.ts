// auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private loginUrl = 'http://localhost:3000/users/login';
  private registerUrl = 'http://localhost:3000/users/register';

  constructor(private router: Router, private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object){}

  validateCredentials(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password });
  }

  registerUser(name: string, email: string, password: string, birthday: Date): Observable<any> {
    return this.http.post<any>(this.registerUrl, { name, email, password, birthday });
  }

  login(id: string){
    localStorage.setItem('userID', id);
    this.router.navigate(['/home'])
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('userID');
    }

    return false;
  }

  logout() {
    localStorage.removeItem('userID');
    this.router.navigate(['/login']);
  }
}