// login.component.ts
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}  

  onSubmit(loginForm: NgForm) {
    const username = loginForm.value.username;
    const password = loginForm.value.password;


    if (this.authService.validateCredentials(username, password)) {
      // Si Login
      this.errorMessage = null;
      console.log('Login successful!');
      this.authService.login();
    } else {
      // Fallo login
      this.errorMessage = 'Invalid username or password. Please try again.';
      console.log('Login failed.');
    }
  }
}