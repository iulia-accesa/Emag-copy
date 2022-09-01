import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { ProductCardComponent } from "src/app/shared/components/product-card/product-card.component";

import { SearchbarProductsPageComponent } from "./searchbar-products-page.component";
import { SearchbarProductsPageService } from "src/app/services/search/searchbar-products-page.service";


export const routes:  Routes = [
  {
      path: 'products',
      
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
    exports: [SearchbarProductsPageComponent],
    imports: [
     RouterModule.forChild(routes),
     BrowserModule
     
    ],
    providers: [
        SearchbarProductsPageService
    ]
  })
  export class SearchbarProductsPageModule { }