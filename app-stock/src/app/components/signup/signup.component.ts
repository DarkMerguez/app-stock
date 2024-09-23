import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,HeaderComponent,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { firstName, lastName, email, password } = this.signupForm.value;
      this.apiService.signup({ firstName, lastName, email, password })
        .subscribe(
          response => {
            console.log('User registered successfully', response);
            this.router.navigate(['/signin']);
          },
          error => {
            console.log('Error registering user', error);
          }
        );
    }
  }

}
