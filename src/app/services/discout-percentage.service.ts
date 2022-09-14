import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiscoutPercentageService {

  constructor() {}
  getPercentage(rating:number): number {
    return Math.round((5 - rating) * 19);
  }

  getRating(rating:number): number {
    return Math.round(rating)
  }
}
