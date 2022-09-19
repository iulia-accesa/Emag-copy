import { CanActivateCategory } from './guards/can-activate-category.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './account/login/login.component';
import { AccountGuard } from '../app/guards/account.guard';
import { UserAccountComponent } from './account/user-account/user-account.component';
import { LoginGuard } from '../app/guards/login.guard';
import { MainTemplateComponent } from './main-template/main-template.component';
import { CartOverviewComponent } from './cart-overview/cart-overview.component';
import { ProductListPageComponent } from './product-list/product-list-page.component';
import { CanActivateSearchKey } from './guards/can-activate-search-key.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: '',
    component: MainTemplateComponent,
    children: [
      { path: '', component: HomepageComponent },
      {
        path: 'my-account',
        component: UserAccountComponent,
        canActivate: [AccountGuard],
      },
      { path: 'products/:id', component: ProductDetailComponent },
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
      { path: 'cart-overview', component: CartOverviewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateCategory, CanActivateSearchKey],
})
export class AppRoutingModule {}
