import { CartApiService } from './services/cart/cart-api.service';
import { CartService } from './services/cart/cart.service';
import { ProductListService } from './services/product-list/product-list.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { FiltersComponent } from './product-list/components/filters/filters.component';
import { ListContainerComponent } from './product-list/components/list-container/list-container.component';
import { BreadcrumbNavComponent } from './product-list/components/breadcrumb-nav/breadcrumb-nav.component';
import { ProductListPageComponent } from './product-list/product-list-page.component';
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
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { APP_REDUCERS, localStorageSyncWrapper } from './app.ngrx';
import { AccountEffects } from './services/account/account.effects';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductPhotosComponent } from './product-detail/product-photos/product-photos.component';
import { AddToCartBoxComponent } from './product-detail/add-to-cart-box/add-to-cart-box.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { AccountApiService } from './services/account/account-api.service';
import { MenuComponent } from './shared/components/menu-categories/menu.component';
import { CarouselComponent } from './shared/components/menu-categories/carousel/carousel.component';
import { LoginComponent } from './account/login/login.component';
import { AppInterceptor } from './app.interceptor';
import { AccountService } from './services/account/account.service';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchBarComponent } from './shared/components/header/search/searchbar/searchbar.component';
import { SearchEffects } from './services/search/search.effects';
import { ProductApiService } from './services/product-api.service';
import { SearchBarService } from './services/search/search.service';
import { UserAccountComponent } from './account/user-account/user-account.component';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductListServiceEffects } from './services/product-list/product-list-service.effects';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { StarsComponent } from './product-list/components/stars/stars.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    LoginComponent,
    SearchBarComponent,
    ProductCardComponent,
    UserAccountComponent,
    HomepageComponent,
    HomepageComponent,
    MenuComponent,
    CarouselComponent,
    ProductDetailComponent,
    ProductPhotosComponent,
    AddToCartBoxComponent,
    HeaderComponent,
    ProductListPageComponent,
    BreadcrumbNavComponent,
    ListContainerComponent,
    FiltersComponent,
    HeaderComponent,
    StarsComponent,
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
    EffectsModule.forRoot([
      AccountEffects,
      SearchEffects,
      ProductListServiceEffects,
    ]),

    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    CarouselModule,
    MatIconModule,
    CommonModule,
    FlexLayoutModule,
    NgxSliderModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatExpansionModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
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
    ProductListService,
    ProductApiService,
    SearchBarService,
    CartApiService,
    CartService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
