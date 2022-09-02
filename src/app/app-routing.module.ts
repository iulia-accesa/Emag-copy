import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarComponent } from './shared/components/header/search/searchbar/searchbar.component';
import { ProductListSearchEngineComponent } from './product-list-search-engine/product-list-search-engine.component';




const routes: Routes = [
  { path: '', component: SearchBarComponent},
  // { path: 'login', component: LoginComponent },
  // { path: 'products', component: ProductListPageComponent },
  // { path: 'products/:id', component: DetailsPageComponent }
  {path: 'search/products',component: ProductListSearchEngineComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
