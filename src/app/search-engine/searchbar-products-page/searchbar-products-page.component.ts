import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-searchbar-products-page',
  templateUrl: './searchbar-products-page.component.html',
  styleUrls: ['./searchbar-products-page.component.scss']
})
export class SearchbarProductsPageComponent implements OnInit {

  



  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.queryParams
    .pipe(first())
    .subscribe(params => {
      console.log(params);
    })
  }

}
