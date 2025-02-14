// login.component.ts
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule and NgForm
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null; // Variable to store error messages

  constructor(private router: Router) {} // Inject the Router

  onSubmit(loginForm: NgForm) {
    // Get the form values
    const username = loginForm.value.username;
    const password = loginForm.value.password;

    // Validate username and password
    if (username === 'nico' && password === '1234') {
      // Successful login
      this.errorMessage = null; // Clear any previous error message
      console.log('Login successful!');
      this.router.navigate(['/home']); // Navigate to the home page
    } else {
      // Failed login
      this.errorMessage = 'Invalid username or password. Please try again.';
      console.log('Login failed.');
    }
  }
}