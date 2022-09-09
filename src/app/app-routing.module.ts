import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './account/login/login.component';
import { AccountGuard } from './guards/account.guard';
import { UserAccountComponent } from './account/user-account/user-account.component';
import { LoginGuard } from './guards/login.guard';
import { MainTemplateComponent } from './main-template/main-template.component';
import { LoginTemplateComponent } from './login-template/login-template.component';

const routes: Routes = [
  { path: '', component: MainTemplateComponent, children: [
    { path: '', component: HomepageComponent },
    { path: 'my-account', component: UserAccountComponent, canActivate: [AccountGuard] },
    { path: 'products/:id', component: ProductDetailComponent },
    // { path: 'products', component: ProductListPageComponent },
  ] },
  { path: '', component: LoginTemplateComponent, children: [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] }
  ] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
