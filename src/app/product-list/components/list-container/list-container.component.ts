import { IProduct } from 'src/app/shared/models/product.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
})
export class ListContainerComponent implements OnInit {
  @Input() productList: IProduct[];
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor() {}

  ngOnInit(): void {}
}
