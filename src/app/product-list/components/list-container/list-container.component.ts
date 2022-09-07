import { IProduct } from 'src/app/shared/models/product.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
})
export class ListContainerComponent {
  @Input() productList: IProduct[];
  @Input() categoryName: string = '';
  @Input() productCount: number = 0;
  @Input() searchKey = '';

  constructor() {}
}
