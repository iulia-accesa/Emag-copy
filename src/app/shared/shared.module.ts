import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageComponent } from './../homepage/homepage.component';
import { ProductCardComponent } from './components/product-card/product-card.component';



@NgModule({
  declarations: [ProductCardComponent,HomepageComponent],
  exports:[ProductCardComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
