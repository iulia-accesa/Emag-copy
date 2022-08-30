import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hugs for Bugs';

  constructor(
    private http: HttpClient,
  ) {}

  onClick() {
    this.http.get('https://fakestoreapi.com/products')
    .subscribe(response => {
      console.log(response);
    });
  }
}
