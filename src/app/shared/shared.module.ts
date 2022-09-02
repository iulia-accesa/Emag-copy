import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';



@NgModule({
  declarations: [ProductCardComponent],
  exports:[ProductCardComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
