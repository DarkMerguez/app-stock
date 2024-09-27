import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormAddProductComponent } from './components/form-add-product/form-add-product.component';
import { AdminBoardComponent } from './components/admin-board/admin-board.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from '../guards/AuthGuard';
import { AdminGuard } from '../guards/AdminGuard';
import { FormAddEnterpriseComponent } from './components/form-add-enterprise/form-add-enterprise.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { FormUpdateProductComponent } from './components/form-update-product/form-update-product.component';
import { EnterpriseDetailsComponent } from './components/enterprise-details/enterprise-details.component';
import { AdminProductsListComponent } from './admin-products-list/admin-products-list.component';
import { ProductCategoriesListComponent } from './product-categories-list/product-categories-list.component';

export const routes: Routes = [
    {path : "signup",component:SignupComponent},
    {path : "signin",component:SigninComponent},
    {path : "dashboard",component:DashboardComponent},
    {path : "enterprise",component:EnterpriseComponent},
    {path : "add-product",component:FormAddProductComponent},
    {path : "products-list",component : ProductsListComponent},
    {path : "admin-products-list",component : AdminProductsListComponent},
    {path : "product-details/:id",component : ProductDetailsComponent},
    {path : "product-categories",component : ProductCategoriesListComponent},
    {path : "enterprise-details/:id",component : EnterpriseDetailsComponent},
    {path : "update-product/:id",component : FormUpdateProductComponent},
    {path : "admin-board",component:AdminBoardComponent, canActivate: [AdminGuard]},
    {path : "profile",component:ProfileComponent, canActivate: [AuthGuard]},
    {path : "add-enterprise",component:FormAddEnterpriseComponent, canActivate: [AuthGuard]},
    {path : "" || "home",component:HomeComponent},
    {path :"**",component:NotFoundComponent}
];


