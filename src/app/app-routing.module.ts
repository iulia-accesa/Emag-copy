import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './account/login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchBarComponent } from './shared/components/header/search/searchbar/searchbar.component';

const routes: Routes = [
  { path: '', component: SearchBarComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'products', component: ProductListPageComponent },
  //{ path: 'products/:id', component: DetailsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
