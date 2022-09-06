import { UserAccountComponent } from './account/user-account/user-account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './account/login/login.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'my-account', component: UserAccountComponent },
  // { path: 'products', component: ProductListPageComponent },
  // { path: 'products/:id', component: DetailsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
