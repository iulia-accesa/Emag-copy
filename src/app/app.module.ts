import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductListSearchEngineComponent } from "./product-list-search-engine/product-list-search-engine.component";
import { ProductListSearchEngineModule } from "./product-list-search-engine/product-list-search-engine.module";
import { ProductCardComponent } from "./shared/components/product-card/product-card.component";




@NgModule({
  declarations: [AppComponent,ProductCardComponent,ProductListSearchEngineComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductListSearchEngineModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
