// auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private dummyAccount = {
    user: "nico",
    password: "1234"
  };

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object){}

  validateCredentials(user: string, password: string): boolean {
    if(user == this.dummyAccount.user){
      return password == this.dummyAccount.password;
    }

    return false;
  }

  login(){
    localStorage.setItem('fakeToken', 'dummy-token-123');
    this.router.navigate(['/home'])
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('fakeToken');
    }

    return false;
  }

  logout() {
    localStorage.removeItem('fakeToken');
    this.router.navigate(['/login']);
  }
}



// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private readonly AUTH_KEY = 'isLoggedIn'; // Key for localStorage

//   constructor(private router: Router) {}

//   // Method to log in the user
//   login(username: string, password: string): boolean {
//     if (username === 'nico' && password === '1234') {
//       localStorage.setItem(this.AUTH_KEY, 'true'); // Save login state in localStorage
//       return true; // Login successful
//     }
//     return false; // Login failed
//   }

//   // Method to log out the user
//   logout(): void {
//     localStorage.removeItem(this.AUTH_KEY); // Remove login state from localStorage
//     this.router.navigate(['/login']); // Redirect to login page
//   }

//   // Method to check if the user is logged in
//   isAuthenticated(): boolean {
//     return localStorage.getItem(this.AUTH_KEY) === 'true'; // Check login state from localStorage
//   }
// }