import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu-category/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() categories: any; //trigger
  @Input() products: any;
  @Input() isRootNode = false;
  hoverIndex: number | undefined;
  isOpen = false;

  constructor(private service: MenuService) {}

  ngOnInit(): void {
    this.service.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  onHover(index: number | undefined, event: any) {
    this.service.getProducts(event.target.id).subscribe((response) => {
      this.products = response as Array<{}>;
      this.products = this.products.map((product: any) => {
        return product.title;
      });
      this.isOpen = true;
      this.hoverIndex = index;
    });
  }

}
