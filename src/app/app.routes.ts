import { Component } from '@angular/core';
import { WishlistComponent } from './Pages/wishlist/wishlist/wishlist.component';
import { AllorderComponent } from './Pages/allorder/allorder/allorder.component';
import { ChekOutComponent } from './Pages/ChekOut/ChekOut.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { AuthComComponent } from './core/layout/auth-com/auth-com.component';
import { BlankComComponent } from './core/layout/blank-com/blank-com.component';
import { HomeComponent } from './Pages/Home/Home.component';
import { CartComponent } from './core/cart/cart.component';
import { CategoriseComponent } from './Pages/categorise/categorise.component';
import { ProductsComponent } from './Pages/products/products.component';
import { BrandsComponent } from './Pages/Brands/Brands.component';
import { NotfoundComponent } from './Pages/Notfound/Notfound.component';
import { DetailsComponent } from './Pages/Details/Details.component';
import { authGuard } from './core/guards/auth-guard';
import { isloggedGuard } from './core/guards/islogged-guard';
import { ForgotPasswordComponent } from './core/auth/forgetPass/forgotPassword/forgotPassword.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthComComponent,

    children: [
      { path: 'login', loadComponent: () => import('./core/auth/login/login.component').then((c) => c.LoginComponent), title: 'Login' },
      { path: 'register', loadComponent: () => import('./core/auth/register/register.component').then((c) => c.RegisterComponent), title: 'Register' },
      { path: 'forgotPassword', loadComponent: () => import('./core/auth/forgetPass/forgotPassword/forgotPassword.component').then((c) => c.ForgotPasswordComponent), title: 'ForgotPassword' },

    ],
  },
  {
    path: '',
    component: BlankComComponent,
    children: [
      { path: 'home', loadComponent: () => import('./Pages/Home/Home.component').then((c) => c.HomeComponent), title: 'Home' },
      { path: 'cart', loadComponent: () => import('./core/cart/cart.component').then((c) => c.CartComponent), title: 'cart', canActivate: [authGuard] },
      { path: 'wishlist', loadComponent: () => import('./Pages/wishlist/wishlist/wishlist.component').then((c) => c.WishlistComponent), title: 'wishlist', canActivate: [authGuard] },

      { path: 'categories', component: CategoriseComponent, title: 'categories' },
      { path: 'Product', component: ProductsComponent, title: 'products' },
      { path: 'brands', component: BrandsComponent, title: 'brands' },
      {
        path: 'details/:slug/:id',
        component: DetailsComponent,
        title: 'details',
        canActivate: [authGuard],
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'details',
        canActivate: [authGuard],
      },
      { path: 'brands', component: BrandsComponent, title: 'brands' },
      { path: 'allorders', component: AllorderComponent, title: 'allorders' },

      { path: 'chekout/:id', component: ChekOutComponent, title: 'checkout' },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'Notfound' },
];
