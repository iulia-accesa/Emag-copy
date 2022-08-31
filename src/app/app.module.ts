import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ProductPhotosComponent } from './details-page/product-photos/product-photos.component';
import { AddToCartBoxComponent } from './details-page/add-to-cart-box/add-to-cart-box.component';
import { SimilarProductComponent } from './details-page/similar-product/similar-product.component';
import { ProductCardComponent } from './shared/components/product-card/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsPageComponent,
    ProductPhotosComponent,
    AddToCartBoxComponent,
    SimilarProductComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
