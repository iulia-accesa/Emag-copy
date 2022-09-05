import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { SearchBarProduct } from 'src/app/services/search/searchbar-product.interface';
import { SearchBarService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchBarComponent {
  options$: Observable<SearchBarProduct[]>;
  _searchInput: string = '';
  private timeout: any;
  private minimumTextLengthForSearchToStart = 2;
  updateDebounceText = this.debounce((text: string) => {
    if (text.length > this.minimumTextLengthForSearchToStart) {
      this._searchBarService.dispatchInputChangedAction(text);
    } else {
      this._searchBarService.dispatchInputChangedAction('');
    }
  });

  constructor(
    private _searchBarService: SearchBarService,
    private _router: Router
  ) {
    this.options$ = this._searchBarService.selectSearchResult$();
  }

  private debounce(cb: Function, delay = 300) {
    return (...args: any) => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  onInputChanged(event: any): void {
    this._searchInput = event.target.value;
    this.updateDebounceText(event.target.value);
  }

  onSelectedOption(option: SearchBarProduct): void {
    this._router.navigate([`products/${option.id}`]);
  }

  onEnter(): void {
    this._router.navigate(['products'], {
      queryParams: { key: this._searchInput },
    });
  }
}
