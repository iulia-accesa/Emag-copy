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
import { searchResultFeatureKey } from 'src/app/services/search/search.feature-key';

import * as fromSearch from 'src/app/services/search/search.reducer';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SearchEffects } from 'src/app/services/search/search.effects';
import { RouterModule, Routes } from '@angular/router';
import { SearchbarProductsPageComponent } from './searchbar-products-page/searchbar-products-page.component';


export const routes:  Routes = [
  {
      path: 'search',
      
      component: SearchBarComponent
     
  }
]
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
   RouterModule.forChild(routes),
  EffectsModule.forFeature([SearchEffects]),
   
  ],
  providers: [
    SearchBarService
  
  ]
})
export class SearchModule { }
