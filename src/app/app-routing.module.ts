import { CanActivateCategory } from './guards/can-activate-category.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './account/login/login.component';
import { AccountGuard } from './guards/account.guard';
import { UserAccountComponent } from './account/user-account/user-account.component';
import { LoginGuard } from './guards/login.guard';
import { ProductListPageComponent } from './product-list/product-list-page.component';
import { CanActivateSearchKey } from './guards/can-activate-search-key.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'my-account',
    component: UserAccountComponent,
    canActivate: [AccountGuard],
  },
  {
    path: 'category/:categoryName',
    component: ProductListPageComponent,
    canActivate: [CanActivateCategory],
  },
  {
    path: 'search',
    component: ProductListPageComponent,
    canActivate: [CanActivateSearchKey],
  },
  { path: 'products/:id', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateCategory, CanActivateSearchKey],
})
export class AppRoutingModule {}
