import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

export const routes: Routes = [
    {path : "signup",component:SignupComponent},
    {path : "signin",component:SigninComponent}
];
