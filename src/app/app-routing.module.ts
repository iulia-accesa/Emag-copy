import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListSearchEngineComponent } from './product-list-search-engine/product-list-search-engine.component';
import { LoginComponent } from './account/login/login.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'products', component: ProductListPageComponent },
  //{ path: 'products/:id', component: DetailsPageComponent }
  { path: 'search/products', component: ProductListSearchEngineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
