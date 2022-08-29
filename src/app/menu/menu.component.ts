import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
 @Input() categories: any;
 @Input() products: any;

  constructor(private service: MenuService) {}

  ngOnInit(): void {
    this.service.getCategories().subscribe((response) => {
      this.categories = response;
    });

    this.service.getProducts().subscribe((response) => {
      this.products = response;
    })

    // fetch('https://fakestoreapi.com/products/category/{{categ}}')
    //         .then(res=>res.json())
    //         .then(json=>console.log(json))
  }
}
