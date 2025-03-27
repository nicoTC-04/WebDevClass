// Register.component.ts
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}  

  onSubmit(registerForm: NgForm) {
    const name = registerForm.value.username;
    const email = registerForm.value.mail;
    const password = registerForm.value.password;
    const birthday = registerForm.value.birthday;

    this.authService.registerUser(name, email, password, birthday).subscribe(
      (response) => {
        console.log('Registration successful!', response);
        this.authService.login(response.id);
      },
      (error) => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    );
  }
}