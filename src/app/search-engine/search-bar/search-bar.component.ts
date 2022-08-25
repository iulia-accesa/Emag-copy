import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchBarProduct } from '../models/search-bar.product';
import { SearchBarService } from '../services/search-bar.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  _searchResults$ :Observable<Array<SearchBarProduct>> | undefined;

  constructor(private _searchBarService: SearchBarService) { }

  ngOnInit(): void {

  }








}
