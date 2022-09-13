import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from 'src/app/services/navigation-history/history.service';
import { ProductApiService } from '../../../services/product-api.service';
import { IProductApi } from '../../models/product-api.interface';

@Component({
  selector: 'app-navigation-history',
  templateUrl: './navigation-history.component.html',
  styleUrls: ['./navigation-history.component.scss']
})
export class NavigationHistoryComponent implements OnInit {
  @Input() products: IProductApi[] | undefined;
  productSimilar: IProductApi[] | undefined;
  // prodCategory: string | undefined;
  productsHistory:any[] = [];
  product!: IProductApi;

  constructor(
    private service: ProductApiService,
    private historyService: HistoryService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.service.getAll().subscribe((response) =>{
      this.products = response;
      console.log(this.products);
    });
    this.historyService.getHistory$().subscribe((response: any) => {
      this.productsHistory = response;
    })
  
  }

  productRedirect(id: number): void {
    this.router.navigate([`products/${id}`]);
  }

  openSimilar() {
    this.service.getByCategory(this.product.category).subscribe((response: IProductApi[]) => {
      this.productSimilar = response.filter((product: IProductApi) => {
        return product.category === this.productsHistory[0].category; 
      })
    })
  }
}
