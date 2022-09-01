import { AccountApiService } from './services/account/account-api.service';
import { appReducers } from './app.reducer';
import { AccountInterceptor } from './account/account.interceptor';
import { AccountModule } from './account/account.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountEffects } from './services/account/account.effects';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent, 
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AccountEffects]),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AccountInterceptor,
      multi: true
    },
    AccountApiService
  ],
  bootstrap: [AppComponent]

})
export class AppModule {}
