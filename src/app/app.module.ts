import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductPhotosComponent } from './product-detail/product-photos/product-photos.component';
import { AddToCartBoxComponent } from './product-detail/add-to-cart-box/add-to-cart-box.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuComponent } from './shared/components/menu-categories/menu.component';
import { CarouselComponent } from './shared/components/menu-categories/carousel/carousel.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    LoginComponent,
    SearchBarComponent,
    ProductCardComponent,
    UserAccountComponent,
    HomepageComponent, 
    HomepageComponent
    MenuComponent,
    CarouselComponent,
    ProductDetailComponent,
    ProductPhotosComponent,
    AddToCartBoxComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    StoreModule.forRoot(APP_REDUCERS, {
      metaReducers: [localStorageSyncWrapper],
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AccountEffects, SearchEffects]),

    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    MatIconModule,
    RouterModule,
    CarouselModule,
    MatIconModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatToolbarModule,,

    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    AccountApiService,
    AccountService,
    ProductApiService,
    SearchBarService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
