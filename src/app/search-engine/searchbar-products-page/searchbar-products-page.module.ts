import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SearchbarProductsPageComponent } from "./searchbar-products-page.component";
import { SearchbarProductsPageService } from "./searchbar-products-page.service";


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
        SearchbarProductsPageService
    ]
  })
  export class SearchbarProductsPageModule { }