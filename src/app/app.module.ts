import { ProductListCardComponent } from './product-list/components/product-card/product-card.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';
import { ProductApiService } from './services/product-api.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { APP_REDUCERS, localStorageSyncWrapper } from './app.ngrx';
import { AccountEffects } from './services/account/account.effects';
import { AccountApiService } from './services/account/account-api.service';
import { AppInterceptor } from './app.interceptor';
import { AccountService } from './services/account/account.service';
import { LoginComponent } from './account/login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductListService } from './services/product-list/product-list.service';
import { ProductListPageComponent } from './product-list/product-list-page.component';
import { BreadcrumbNavComponent } from './product-list/components/breadcrumb-nav/breadcrumb-nav.component';
import { ListContainerComponent } from './product-list/components/list-container/list-container.component';
import { FiltersComponent } from './product-list/components/filters/filters.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductListServiceEffects } from './services/product-list/product-list-service.effects';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductCardComponent,
    HomepageComponent,
    ProductListPageComponent,
    BreadcrumbNavComponent,
    ListContainerComponent,
    FiltersComponent,
    ProductListCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(APP_REDUCERS, {
      metaReducers: [localStorageSyncWrapper],
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AccountEffects, ProductListServiceEffects]),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
