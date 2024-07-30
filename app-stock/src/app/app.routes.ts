import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';

export const routes: Routes = [
    {path : "signup",component:SignupComponent},
    {path : "signin",component:SigninComponent},
    {path : "home",component:HomeComponent},
    {path : "dashboard",component:DashboardComponent},
    {path : "enterprise",component:EnterpriseComponent}
];
