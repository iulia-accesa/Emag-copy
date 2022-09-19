import { Component, HostListener, Input, OnInit } from '@angular/core';
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
  visibleCategory = false;
  belowWidth: boolean | undefined;

  constructor(private service: ProductApiService) {}
  @HostListener('window:resize') onResize() {
    if (window.innerWidth < 830) {
      this.belowWidth = false;
      this.visibleCategory = false;
    } else {
      this.belowWidth = true;
    }
  }

  ngOnInit(): void {
    this.service.getAllCategories().subscribe((response) => {
      this.categories = response;
    });
    if (window.innerWidth < 830) {
      this.belowWidth = false;
    } else {
      this.belowWidth = true;
    }
  }
  onHover(index: number | undefined, event: any) {
    this.service
      .getByCategory(event.target.id)
      .subscribe((response: Array<IProductApi>) => {
        this.products = response;
        this.isOpen = true;
        this.hoverIndex = index;
      });
  }
  toggleDisplay() {
    this.visibleCategory = !this.visibleCategory;
  }
}
