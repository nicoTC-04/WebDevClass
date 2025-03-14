// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web-app';
  navbarOpen = false;

  constructor(private authService: AuthService) {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }

  // Public method to call authService.logout()
  logout(): void {
    this.authService.logout();
  }
  
  
}