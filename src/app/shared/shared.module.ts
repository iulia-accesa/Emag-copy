import { NgModule } from '@angular/core';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [ProductCardComponent],
  exports:[ProductCardComponent],
  imports: [],
  providers: [],
})
export class SharedModule {}
