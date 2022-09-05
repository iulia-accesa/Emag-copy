/**
 * Angular modules
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/**
 * Services
 */
import { ProductService } from './services/product.service';

/**
 * My components
 */
import { ProductListPageComponent } from './product-list-page.component';
import { BreadcrumbNavComponent } from './components/breadcrumb-nav/breadcrumb-nav.component';
import { ListContainerComponent } from './components/list-container/list-container.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

/**
 * My modules
 */
import { MaterialModule } from './material.module';

/**
 * Ngrx
 */
import { EffectsModule } from '@ngrx/effects';
import { ProductServiceEffects } from './ngrx/effects/product-service.effects';

@NgModule({
  declarations: [
    ProductListPageComponent,
    BreadcrumbNavComponent,
    FiltersComponent,
    ListContainerComponent,
    ProductCardComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    EffectsModule.forFeature([ProductServiceEffects]),
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
