import { ProductService } from './services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-categories',
  templateUrl: './homepage-categories.component.html',
  styleUrls: ['./homepage-categories.component.scss'],
})
export class HomepageCategoriesComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Momentan folosesc aici fetch ca sa testez pentru ca nu am implementat service inca
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((product) => {
        fetch('https://fakestoreapi.com/products/categories')
          .then((res) => res.json())
          .then((categories) => {
            let values: any[] = [];
            categories.forEach((category: any) => {
              for (var i = 0; i < product.length; i++) {
                if (product[i].category === category) {
                  values.push(product[i]);
                }
              }
              // Afisez cardurile cu elementele din array-ul values
              // (dupa ce primesc template pentru carduri),dupa care il golesc
              console.log(values);
              values = [];
            });
          });
      });
  }
}
