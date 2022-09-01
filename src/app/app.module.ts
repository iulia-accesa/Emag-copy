import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { APP_REDUCERS, localStorageSyncWrapper } from './app.ngrx';
import { AccountEffects } from './services/account/account.effects';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { AccountApiService } from './services/account/account-api.service';
import { AppInterceptor } from './app.interceptor';
import { AccountModule } from './account/account.module';
import { AccountService } from './services/account/account.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    StoreModule.forRoot(APP_REDUCERS, { metaReducers: [localStorageSyncWrapper] }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AccountEffects]),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    AccountApiService,
    AccountService
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
}
