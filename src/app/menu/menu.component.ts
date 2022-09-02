import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() categories: any; //trigger
  @Input() products: any;
  @Input() isRootNode = false;
  hoverIndex: number;
  hoverOut: boolean;
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

  outHandler(index: number | undefined) {
    // this.isOpen = false;
    this.hoverIndex = index;
    if (index !== undefined) {
      this.isOpen = false;
      this.hoverIndex = undefined;
    }
  }

  onBlur(index: number | undefined) {
  
      if (this.hoverOut !== false) {
        this.hoverIndex = undefined;
        this.isOpen = false;
      } else {
        this.hoverIndex = index;
        this.isOpen = true;
      }
  }

  onHoverCheck() {
    this.hoverOut = true;
  }
}
