import { CanActivateCategory } from './shared/guards/can-activate-category.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './account/login/login.component';
import { ProductListPageComponent } from './product-list/product-list-page.component';
import { CanActivateSearchKey } from './shared/guards/can-activate-search-key.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
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
  // { path: 'products/:id', component: DetailsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateCategory, CanActivateSearchKey],
})
export class AppRoutingModule {}
