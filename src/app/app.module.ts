import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
import { SearchBarComponent } from './shared/components/header/search/searchbar/searchbar.component';
import { SearchBarService } from './services/search/search.service';



@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    LoginComponent,
    ProductListSearchEngineComponent,
    SearchBarComponent,

  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(APP_REDUCERS, { metaReducers: [localStorageSyncWrapper] }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AccountEffects,SearchEffects]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatAutocompleteModule,
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
    SearchBarService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
