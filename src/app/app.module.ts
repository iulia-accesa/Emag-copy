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
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { ProductApiService } from './services/product-api.service';
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

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    LoginComponent,
    SearchBarComponent,
    ProductCardComponent,
    HeaderComponent,
    HomepageComponent,
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
    EffectsModule.forRoot([AccountEffects, SearchEffects]),

    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatToolbarModule,
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
