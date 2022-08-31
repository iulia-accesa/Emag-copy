import { Component, Input } from '@angular/core';
import { IProduct } from './card-component.interface';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss'],
})
export class CardComponentComponent {
  @Input() product: IProduct | undefined;
  
  constructor() {}

  calcRating(rat: number) {
    return Math.round(rat);
  }
}