import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

/**
 * Other modules, will be included in app.module later
 */
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    MatCheckboxModule,
    NgxSliderModule,
    FlexLayoutModule,
    MatIconModule,
  ],
  exports: [
    MatExpansionModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    MatCheckboxModule,
    NgxSliderModule,
    FlexLayoutModule,
    MatIconModule,
  ],
})
export class MaterialModule {}
