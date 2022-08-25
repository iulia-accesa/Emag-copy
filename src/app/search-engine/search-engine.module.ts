import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarService } from './services/search-bar.service';
import { SearchBarComponent } from './search-bar/search-bar.component';



@NgModule({
  declarations: [ SearchBarComponent],
  exports: [SearchBarComponent],
  imports: [
    CommonModule
  ],
  providers: [
    SearchBarService
  
  ]
})
export class SearchEngineModule { }
