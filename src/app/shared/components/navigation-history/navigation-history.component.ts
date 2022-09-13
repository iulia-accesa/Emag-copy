import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HistoryService } from 'src/app/services/navigation-history/history.service';
import { ProductApiService } from '../../../services/product-api.service';
import { IProductApi } from '../../models/product-api.interface';

@Component({
  selector: 'app-navigation-history',
  templateUrl: './navigation-history.component.html',
  styleUrls: ['./navigation-history.component.scss']
})
export class NavigationHistoryComponent implements OnInit {
  products: IProductApi[] | undefined;
  productsHistory:any[] = [];
  similarProducts: IProductApi[] | undefined;
  categ: string | undefined;
  // category$: Observable<string | undefined>;
  

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

  getSameCategory(categ: string): void {
    this.similarProducts = this.products!
      .filter((item: IProductApi) => {
        return item.category === categ;
      })
      .slice(0, 5);
  }

}
