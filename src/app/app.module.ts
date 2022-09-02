import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SearchEffects } from 'src/app/services/search/search.effects';
import { ProductListSearchEngineService } from './services/product-list-search-engine/product-list-search-engine.service';
import { ProductApiService } from './services/product-api.service';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { APP_REDUCERS, localStorageSyncWrapper } from './app.ngrx';
import { AccountEffects } from './services/account/account.effects';
import { AccountApiService } from './services/account/account-api.service';
import { AccountService } from './services/account/account.service';
import { AppInterceptor } from './app.interceptor';
import { LoginComponent } from './account/login/login.component';
import { ProductListSearchEngineComponent } from './product-list-search-engine/product-list-search-engine.component';

@NgModule({
  declarations: [AppComponent, ProductCardComponent, LoginComponent,ProductListSearchEngineComponent],

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
    EffectsModule.forRoot([SearchEffects, AccountEffects]),

    BrowserAnimationsModule,
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
    ProductListSearchEngineService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
