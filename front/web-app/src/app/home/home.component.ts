// home.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Import the AuthService

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService) {} // Inject the AuthService

  logout() {
    this.authService.logout(); // Call the logout method
  }
}