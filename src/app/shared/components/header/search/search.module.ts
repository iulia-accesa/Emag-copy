import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SearchBarComponent } from './searchbar/searchbar.component';
import { SearchbarProductsPageModule } from './searchbar-products-page/searchbar-products-page.module';
import { SearchBarService } from 'src/app/services/search/search.service';



@NgModule({
  declarations: [ SearchBarComponent],
  exports: [SearchBarComponent],
  imports: [
    CommonModule,
   MatAutocompleteModule,
   HttpClientModule,
   SearchbarProductsPageModule,
   MatIconModule,
   StoreModule.forFeature(searchResultFeatureKey,fromSearch.reducer),
   AppRoutingModule,

   
   EffectsModule.forFeature([SearchEffects]),
   
  ],
  providers: [
    SearchBarService
  
  ]
})
export class SearchEngineModule { }
