import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SearchBarComponent } from './searchbar/searchbar.component';

import { SearchBarService } from 'src/app/services/search/search.service';
import { searchResultFeatureKey } from 'src/app/services/search/search.feature-key';

import * as fromSearch from 'src/app/services/search/search.reducer';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SearchEffects } from 'src/app/services/search/search.effects';



@NgModule({
  declarations: [SearchBarComponent],
  exports: [],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatIconModule,
    StoreModule.forFeature(searchResultFeatureKey, fromSearch.reducer),
    AppRoutingModule,
    EffectsModule.forFeature([SearchEffects]),
  ],
  providers: [SearchBarService],
})
export class SearchModule {}
