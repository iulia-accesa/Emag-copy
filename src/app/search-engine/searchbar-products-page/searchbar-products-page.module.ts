import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { ProductCardComponent } from "src/app/shared/product-card/product-card.component";

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
    declarations: [ SearchbarProductsPageComponent,ProductCardComponent],
    exports: [SearchbarProductsPageComponent,ProductCardComponent],
    imports: [
     RouterModule.forChild(searchRoutes),
     BrowserModule
     
    ],
    providers: [
        SearchbarProductsPageService
    ]
  })
  export class SearchbarProductsPageModule { }