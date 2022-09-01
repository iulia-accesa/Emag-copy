import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { ProductListSearchEngineService } from "../services/product-list-search-engine/product-list-search-engine.service";
import { SharedModule } from "../shared/shared.module";

import { ProductListSearchEngineComponent } from "./product-list-search-engine.component";



export const routes:  Routes = [
  {
      path: 'products',
      
      component: ProductListSearchEngineComponent
     
  }
  // ,
  // {
  //   path: 'products/:id',
  //   component: undefined //aici vine componenta de product details
  // }
]
@NgModule({
    declarations: [ProductListSearchEngineComponent],
    exports: [],
    imports: [
     RouterModule.forChild(routes),
     BrowserModule,
      SharedModule
     
    ],
    providers: [
      ProductListSearchEngineService
    ]
  })
  export class ProductListSearchEngineModule { }