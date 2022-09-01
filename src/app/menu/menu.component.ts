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
    })
    this.isOpen = true;
    this.hoverIndex = index;
  });
  }
  


  // outHandler() {
  //   this.isOpen = false;
  // }


  onBlur(index: number | undefined) {
    setTimeout(() => {
      if(this.hoverOut !== false){
        this.hoverIndex = undefined;
      } else {this.hoverIndex = index}
    }, 100)
  }

  onHoverCheck() {
    this.hoverOut = true;

  }
  
}
