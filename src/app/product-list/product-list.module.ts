import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from './services/product.service';
import { ModuleWithProviders } from '@angular/core';

import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreadcrumbNavComponent } from './components/breadcrumb-nav/breadcrumb-nav.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ListContainerComponent } from './components/list-container/list-container.component';

import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ProductListPageComponent,
    BreadcrumbNavComponent,
    FiltersComponent,
    ListContainerComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  exports: [ProductListPageComponent],
})
export class ProductListModule {
  static forRoot(): ModuleWithProviders<ProductListModule> {
    return {
      ngModule: ProductListModule,
      providers: [ProductService],
    };
  }
}
