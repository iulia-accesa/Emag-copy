import { Subject, Subscription } from 'rxjs';
import { IProductApi } from 'src/app/shared/models/product-api.interface';
import { Component, Input } from '@angular/core';

import { ProductListUiService } from '../../../services/product-list/product-list-ui.service';

@Component({
  selector: 'list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
})
export class ListContainerComponent {
  @Input() productList: IProductApi[] | null = null;
  @Input() categoryName: string = '';
  @Input() productCount: number | null = null;
  @Input() searchKey = '';

  productListLoading: boolean = true;
  productListError: boolean = false;
  productListLoadingSub: Subscription;
  productListErrorSub: Subscription;

  constructor(private productListUiService: ProductListUiService) {
    this.productListLoadingSub =
      this.productListUiService.productListLoading.subscribe(
        (isLoading) => (this.productListLoading = isLoading)
      );
    this.productListErrorSub =
      this.productListUiService.productListError.subscribe(
        (isError) => (this.productListError = isError)
      );
  }
}
