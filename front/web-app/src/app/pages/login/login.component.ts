// login.component.ts
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}  

  onSubmit(loginForm: NgForm) {
    const email = loginForm.value.email;
    const password = loginForm.value.password;

    this.authService.validateCredentials(email, password).subscribe(
      (response) => {
        if (response.success) {
          // Successful login
          this.errorMessage = null;
          console.log('Login successful!');
          this.authService.login(response.id);
        } else {
          this.errorMessage = 'Invalid email or password. Please try again.';
          console.log('Login failed.');
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    );
  }
}