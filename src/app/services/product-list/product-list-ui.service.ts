import { Subject } from 'rxjs';

export class ProductListUiService {
  productListLoading = new Subject<boolean>();
  productListError = new Subject<boolean>();
}
