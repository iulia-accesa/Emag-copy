import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarService } from './services/search-bar.service';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { searchResultFeatureKey } from './my-ngrx/features';
import { StoreModule } from '@ngrx/store';
import * as fromSearch from './my-ngrx/reducers'
import { SearchEffects } from './my-ngrx/effects';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  declarations: [ SearchBarComponent],
  exports: [SearchBarComponent],
  imports: [
    CommonModule,
   MatAutocompleteModule,
   HttpClientModule,
   MatIconModule,
   StoreModule.forFeature(searchResultFeatureKey,fromSearch.reducer),
   EffectsModule.forFeature([SearchEffects])
  ],
  providers: [
    SearchBarService
  
  ]
})
export class SearchEngineModule { }
