<<<<<<< HEAD
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { ProductApiService } from '../services/product-api.service';
import { SearchBarService } from '../services/search/search.service';
import { SearchBarComponent } from './components/header/search/searchbar/searchbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [ProductCardComponent,SearchBarComponent],
  exports:[ProductCardComponent,SearchBarComponent],
  imports: [
    MatAutocompleteModule,
    MatIconModule,
    BrowserModule
  ],
  providers: [SearchBarService],
})
export class SharedModule {}
=======
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';



@NgModule({
  declarations: [ProductCardComponent],
  exports:[ProductCardComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
>>>>>>> develop
