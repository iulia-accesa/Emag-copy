import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarService } from './services/search-bar.service';
import { SearchBarComponent } from './searchbar/searchbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { searchResultFeatureKey } from './my-ngrx/features';
import { StoreModule } from '@ngrx/store';
import * as fromSearch from './my-ngrx/reducers'
import { SearchEffects } from './my-ngrx/effects';
import { EffectsModule } from '@ngrx/effects';
import { SearchbarProductsPageModule } from './searchbar-products-page/searchbar-products-page.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { SearchbarProductsPageComponent } from './searchbar-products-page/searchbar-products-page.component';



// export const routes:  Routes = [
//   {
//       path: 'search',
      
//       component: SearchBarComponent,
     
     
//   } 
// ]
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
  // RouterModule.forChild(routes),
   
   EffectsModule.forFeature([SearchEffects]),
   
  ],
  providers: [
    SearchBarService
  
  ]
})
export class SearchEngineModule { }
