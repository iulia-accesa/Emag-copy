import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AppComponent /* HomeComponent */ },
  // { path: 'login', component: LoginComponent },
  // { path: 'products', component: ProductListPageComponent },
  // { path: 'products/:id', component: DetailsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
