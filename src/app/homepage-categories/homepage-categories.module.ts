import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageCategoriesComponent } from './homepage-categories.component';
import { CardComponentComponent } from './card-component/card-component.component';

@NgModule({
  declarations: [
    HomepageCategoriesComponent,
    CardComponentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomepageCategoriesComponent,
    CardComponentComponent
  ]
})
export class HomepageCategoriesModule { }
