// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false; // Track login status

  constructor(private router: Router) {}

  // Method to log in the user
  login(username: string, password: string): boolean {
    if (username === 'nico' && password === '1234') {
      this.isLoggedIn = true;
      return true; // Login successful
    }
    return false; // Login failed
  }

  // Method to log out the user
  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Method to check if the user is logged in
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}