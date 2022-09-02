import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProductListSearchEngineComponent } from './product-list-search-engine/product-list-search-engine.component';
import { SearchEffects } from 'src/app/services/search/search.effects';
import { appReducers } from './shared/models/app-state.interface';
import { ProductListSearchEngineService } from './services/product-list-search-engine/product-list-search-engine.service';
import { ProductApiService } from './services/product-api.service';
@NgModule({
  declarations: [AppComponent, ProductListSearchEngineComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: true,//verifies if a developer tries to modify the state object
        strictActionImmutability: true,//An action should not be modified.verifies if a developer tries to modify an action
        strictActionSerializability: true,//This check verifies if the state is serializable. A serializable state is important to be able to persist the current state to be able to rehydrate the state in the future
        strictStateSerializability: true,// it verifies if the action is serializable . An action must be serializable to be replayed
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([SearchEffects]),
    SharedModule,
  ],
  providers: [ProductApiService,ProductListSearchEngineService],
  bootstrap: [AppComponent],
})
export class AppModule {}
