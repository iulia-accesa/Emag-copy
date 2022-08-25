import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-engine/search-bar/search-bar.component';
import { SearchEngineModule } from './search-engine/search-engine.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchEngineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
