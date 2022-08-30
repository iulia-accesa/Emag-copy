import { appReducers } from './app.reducer';
import { AccountInterceptorService } from './account/account-interceptor.service';
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
import { AccountEffects } from './account/store/account.effects';

@NgModule({
  declarations: [
    AppComponent
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
      useClass: AccountInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
