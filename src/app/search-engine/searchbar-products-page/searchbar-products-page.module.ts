import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SearchbarProductsPageComponent } from "./searchbar-products-page.component";


export const searchRoutes:  Routes = [
  {
      path: 'search/products',
      
      component: SearchbarProductsPageComponent
     
  }
  // ,
  // {
  //   path: 'products/:id',
  //   component: undefined //aici vine componenta de product details
  // }
]
@NgModule({
    declarations: [ SearchbarProductsPageComponent],
    exports: [SearchbarProductsPageComponent],
    imports: [
     RouterModule.forChild(searchRoutes)
    ],
    providers: [
        
    ]
  })
  export class SearchbarProductsPageModule { }