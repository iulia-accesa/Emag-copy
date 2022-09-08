import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './account/login/login.component';
import { AccountGuard } from './services/account/guards/account.guard';
import { UserAccountComponent } from './account/user-account/user-account.component';
import { LoginGuard } from './services/account/guards/login.guard';



const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'my-account', component: UserAccountComponent, canActivate: [AccountGuard] },
  // { path: 'products', component: ProductListPageComponent },
   { path: 'products/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
