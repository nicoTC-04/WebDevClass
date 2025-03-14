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

  onSubmit(loginForm: NgForm) {
    const username = loginForm.value.username;
    const password = loginForm.value.password;
    const mail = loginForm.value.mail;
  }
}