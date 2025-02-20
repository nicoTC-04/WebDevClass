// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web-app';

  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }

  // Public method to call authService.logout()
  logout(): void {
    this.authService.logout();
  }
}