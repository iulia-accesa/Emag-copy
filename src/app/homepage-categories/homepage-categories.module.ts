import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageCategoriesComponent } from './homepage-categories.component';


@NgModule({
  declarations: [
    HomepageCategoriesComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HomepageCategoriesComponent,
  ]
})
export class HomepageCategoriesModule { }
