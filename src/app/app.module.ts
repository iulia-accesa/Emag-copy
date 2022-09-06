import { ProductListService } from './services/product-list/product-list.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { FiltersComponent } from './product-list/components/filters/filters.component';
import { ListContainerComponent } from './product-list/components/list-container/list-container.component';
import { BreadcrumbNavComponent } from './product-list/components/breadcrumb-nav/breadcrumb-nav.component';
import { ProductListPageComponent } from './product-list/product-list-page.component';
import { ProductListCardComponent } from './product-list/components/product-card/product-card.component';
import { ProductApiService } from './services/product-api.service';
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

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchEffects } from 'src/app/services/search/search.effects';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { APP_REDUCERS, localStorageSyncWrapper } from './app.ngrx';
import { AccountEffects } from './services/account/account.effects';
import { AccountApiService } from './services/account/account-api.service';
import { AccountService } from './services/account/account.service';
import { AppInterceptor } from './app.interceptor';
import { LoginComponent } from './account/login/login.component';
import { SearchBarComponent } from './shared/components/header/search/searchbar/searchbar.component';
import { SearchBarService } from './services/search/search.service';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './shared/components/header/header.component';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductListServiceEffects } from './services/product-list/product-list-service.effects';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    LoginComponent,
    SearchBarComponent,
    ProductCardComponent,
    HomepageComponent,
    ProductListPageComponent,
    BreadcrumbNavComponent,
    ListContainerComponent,
    FiltersComponent,
    ProductListCardComponent,
    HeaderComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

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
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    MatIconModule,
    CommonModule,
    FlexLayoutModule,
    NgxSliderModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatMenuModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
