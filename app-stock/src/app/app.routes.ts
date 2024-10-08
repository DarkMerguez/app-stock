import { Routes } from '@angular/router';
import { AdminGuard } from '../guards/AdminGuard';
import { AuthGuard } from '../guards/AuthGuard';
import { AdminBoardComponent } from './components/admin-board/admin-board.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnterpriseDetailsComponent } from './components/enterprise-details/enterprise-details.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';
import { FormAddEnterpriseComponent } from './components/form-add-enterprise/form-add-enterprise.component';
import { FormAddProductComponent } from './components/form-add-product/form-add-product.component';
import { FormUpdateProductComponent } from './components/form-update-product/form-update-product.component';
import { FormUpdateUserComponent } from './components/form-update-user/form-update-user.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductCategoriesListComponent } from './components/product-categories-list/product-categories-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShopComponent } from './components/shop/shop.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentCancelComponent } from './components/payment-cancel/payment-cancel.component';
import { FormUpdateEnterpriseComponent } from './components/form-update-enterprise/form-update-enterprise.component';

export const routes: Routes = [
    {path : "signup",component:SignupComponent},
    {path : "signin",component:SigninComponent},
    {path : "dashboard",component:DashboardComponent, canActivate: [AuthGuard]},
    {path : "enterprise",component:EnterpriseComponent, canActivate: [AuthGuard]},
    {path : "add-product",component:FormAddProductComponent, canActivate: [AuthGuard]},
    {path : "products-list",component : ProductsListComponent},
    {path : "product-details/:id",component : ProductDetailsComponent},
    {path : "product-category/:id",component : ProductCategoryComponent},
    {path : "cart",component : CartComponent, canActivate: [AuthGuard]},
    {path : "search-results/:text",component:SearchResultsComponent},
    {path : "product-categories",component : ProductCategoriesListComponent},
    {path : "enterprise-details/:id",component : EnterpriseDetailsComponent},
    {path : "update-enterprise/:id",component : FormUpdateEnterpriseComponent, canActivate: [AuthGuard]},
    {path : "update-product/:id",component : FormUpdateProductComponent, canActivate: [AuthGuard]},
    {path : "update-user/:id",component : FormUpdateUserComponent, canActivate: [AuthGuard]},
    {path : "shop",component : ShopComponent},
    {path: 'success', component: PaymentSuccessComponent },
    {path: 'cancel', component: PaymentCancelComponent },
    {path : "admin-board",component:AdminBoardComponent, canActivate: [AdminGuard]},
    {path : "profile",component:ProfileComponent, canActivate: [AuthGuard]},
    {path : "add-enterprise",component:FormAddEnterpriseComponent, canActivate: [AuthGuard]},
    {path : "" || "home",component:HomeComponent},
    {path :"**",component:NotFoundComponent}
];


