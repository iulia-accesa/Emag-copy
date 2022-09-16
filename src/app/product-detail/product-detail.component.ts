import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { IProductApi } from '../shared/models/product-api.interface';
import { ProductApiService } from '../services/product-api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, forkJoin } from 'rxjs';
import { DiscoutPercentageService } from '../services/discout-percentage.service';
import { HistoryService } from '../services/navigation-history/history.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @ViewChild('addToCartBox', { read: ElementRef }) set addToCartBox(
    content: ElementRef
  ) {
    if (content) {
      this.setIntersectionObserver(content);
    }
  }
  showAddToCart: boolean = false;
  product: IProductApi | undefined;
  productSimilar: IProductApi[] | undefined;
  productId: number = 0;
  prodCategory: string | undefined;
  private observer: IntersectionObserver | undefined;
  discountPers: number = 0;

  constructor(
    private _productService: ProductApiService,
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private discoutPercentageService: DiscoutPercentageService
  ) {}

  ngOnInit() {
    this.route.url.subscribe(() => {
      this.productId = this.route.snapshot.params['id'];
      forkJoin([
        this._productService.getById(this.productId),
        this._productService.getAll(),
      ]).subscribe((res) => {
        this.product = res[0];
        this.prodCategory = this.product.category;
        this.getSameCategory(res[1]);
        this.discountPers = this.discoutPercentageService.getPercentage(
          this.product.rating.rate
        );
        this.historyService.updateHistory$(
          this.product.image,
          this.product.category
        );
      });
    });
  }

  setIntersectionObserver(content: ElementRef) {
    const observedElement = content?.nativeElement;
    this.observer = new IntersectionObserver(([entry]) => {
      this.renderContents(entry.isIntersecting);
    });
    this.observer.observe(observedElement);
  }

  renderContents(isIntersecting: boolean) {
    this.showAddToCart = !isIntersecting;
  }

  getSameCategory(productList: IProductApi[]): void {
    this.productSimilar = productList
      .filter((item: IProductApi) => {
        return item.category === this.prodCategory;
      })
      .slice(0, 5);
  }
  ngOnDestroy(): void {
    this.observer?.disconnect;
  }
}
