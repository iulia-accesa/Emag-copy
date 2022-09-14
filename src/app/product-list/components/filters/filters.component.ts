import { IPriceRange } from './../../models/price-range.interface';
import { IFilterGroup } from './../../models/filter-group.interface';
import { IOrderGroup } from './../../models/order-group.interface';
import { Store } from '@ngrx/store';
import { ProductListService } from '../../../services/product-list/product-list.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FiltersComponent implements OnInit {
  public ratingList: number[] = [0, 0, 0, 0, 0];
  public priceRange: IPriceRange = { min: 1, max: 99999 };

  public sliderForm: FormGroup = new FormGroup({
    priceSlider: new FormControl([this.priceRange.min, this.priceRange.max]),
    minVal: new FormControl([this.priceRange.min]),
    maxVal: new FormControl([this.priceRange.max]),
  });
  public ratingsForm: FormGroup = new FormGroup({
    rating1: new FormControl(''),
    rating2: new FormControl(''),
    rating3: new FormControl(''),
    rating4: new FormControl(''),
    rating5: new FormControl(''),
  });

  public priceFilterOptions: Options = {
    floor: this.priceRange.min,
    ceil: this.priceRange.max,
    step: 1,
  };

  public filterForm = new FormGroup({
    priceOrder: new FormControl(''),
    nameOrder: new FormControl(''),
    priceSlider: this.sliderForm,
    ratingsForm: this.ratingsForm,
  });

  constructor(private productService: ProductListService) {
    forkJoin({
      priceRange: this.productService.getPriceRange(),
      ratingList: this.productService.getRatingCount(),
    }).subscribe((result) => {
      const { priceRange, ratingList } = result;
      this.ratingList = ratingList;
      this.priceRange = {
        min: Math.floor(priceRange.min),
        max: Math.ceil(priceRange.max),
      };
      this.priceFilterOptions = {
        floor: this.priceRange.min,
        ceil: this.priceRange.max,
        step: 1,
      };
      this.sliderForm = new FormGroup({
        priceSlider: new FormControl([
          this.priceRange.min,
          this.priceRange.max,
        ]),
        minVal: new FormControl([this.priceRange.min]),
        maxVal: new FormControl([this.priceRange.max]),
      });
      this.filterForm = new FormGroup({
        priceOrder: new FormControl(''),
        nameOrder: new FormControl(''),
        priceSlider: this.sliderForm,
        ratingsForm: this.ratingsForm,
      });

      this.filterForm.valueChanges.subscribe((changes) =>
        this.onFormChange(changes)
      );
    });
  }

  ngOnInit(): void {}

  onSliderChange() {
    this.sliderForm.controls['minVal'].setValue(
      this.sliderForm.controls['priceSlider'].value[0] < this.priceRange.min
        ? this.priceRange.min
        : this.sliderForm.controls['priceSlider'].value[0]
    );
    this.sliderForm.controls['maxVal'].setValue(
      this.sliderForm.controls['priceSlider'].value[1] > this.priceRange.max
        ? this.priceRange.max
        : this.sliderForm.controls['priceSlider'].value[1]
    );
  }

  onSliderInput() {
    let min = this.sliderForm.controls['minVal'].value;
    let max = this.sliderForm.controls['maxVal'].value;

    if (min < this.priceRange.min) min = this.priceRange.min;
    if (min > this.priceRange.max) min = this.priceRange.max;

    if (max > this.priceRange.max) max = this.priceRange.max;
    if (max < this.priceRange.min) max = this.priceRange.min;

    if (min > max) {
      let t = min;
      min = max;
      max = t;
    }

    this.sliderForm.controls['priceSlider'].setValue([min, max]);
    this.sliderForm.controls['minVal'].setValue(
      min < this.priceRange.max ? min : this.priceRange.max
    );
    this.sliderForm.controls['maxVal'].setValue(max > min ? max : min);
  }

  onFormChange(changes: any) {
    const nameOrder =
      changes.nameOrder.length > 0 ? changes.nameOrder : undefined;
    const priceOrder =
      changes.priceOrder.length > 0 ? changes.priceOrder : undefined;
    const min = changes.priceSlider.priceSlider[0];
    const max = changes.priceSlider.priceSlider[1];
    const ratings = [
      changes.ratingsForm.rating1,
      changes.ratingsForm.rating2,
      changes.ratingsForm.rating3,
      changes.ratingsForm.rating4,
      changes.ratingsForm.rating5,
    ];

    const orderGroup: IOrderGroup = {
      price: priceOrder,
      title: nameOrder,
    };

    const priceRange: IPriceRange = {
      min,
      max,
    };

    const filterGroup: IFilterGroup = {
      priceRange,
      ratings,
    };

    this.productService.orderItems(orderGroup);
    this.productService.filterItems(filterGroup);
  }
}
