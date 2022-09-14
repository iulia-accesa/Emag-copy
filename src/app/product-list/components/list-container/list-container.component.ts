import { IProductApi } from 'src/app/shared/models/product-api.interface';
import { Component, Input } from '@angular/core';

import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListContainerComponent {
  @Input() productList: IProductApi[] | null = null;
  @Input() categoryName: string = '';
  @Input() productCount: number | null = null;
  @Input() searchKey = '';

  constructor() {}
}
