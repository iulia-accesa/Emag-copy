import { Component, Input, OnInit } from '@angular/core';
import { ProductApiService } from '../../../services/product-api.service';
import { IProductApi } from '../../models/product-api.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() categories: string[] | undefined;
  @Input() products: IProductApi[] | undefined;
  @Input() isRootNode = false;
  hoverIndex: number | undefined;
  isOpen = false;

  constructor(private service: ProductApiService) {}

  ngOnInit(): void {
    this.service.getAllCategories().subscribe((response) => {
      this.categories = response;
    });
  }
  onHover(index: number | undefined, event: any) {
    this.service.getByCategory(event.target.id).subscribe((response: Array<IProductApi>) => {
      this.products = response;
      this.isOpen = true;
      this.hoverIndex = index;
    });
  }
}
