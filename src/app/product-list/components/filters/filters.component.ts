import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  OnChanges,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';

import { IPriceRange } from '../../models/price-range.interface';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FiltersComponent implements OnInit, OnChanges {
  priceFilterMinValue = 1;
  priceFilterMaxValue = 999999;

  @Input() public priceRange: IPriceRange;
  @Input() public brandList: string[];
  @Input() public ratingList: number[];

  filterForm: FormGroup;

  sliderForm: FormGroup = new FormGroup({
    priceSlider: new FormControl([
      this.priceFilterMinValue,
      this.priceFilterMaxValue,
    ]),
    minVal: new FormControl([this.priceFilterMinValue]),
    maxVal: new FormControl([this.priceFilterMaxValue]),
  });
  ratingsForm: FormGroup = new FormGroup({
    rating1: new FormControl(''),
    rating2: new FormControl(''),
    rating3: new FormControl(''),
    rating4: new FormControl(''),
    rating5: new FormControl(''),
  });

  priceFilterOptions: Options = {
    floor: this.priceFilterMinValue,
    ceil: this.priceFilterMaxValue,
    step: 1,
  };

  constructor() {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      priceOrder: new FormControl(''),
      nameOrder: new FormControl(''),
      priceSlider: this.sliderForm,
      ratingsForm: this.ratingsForm,
    });
  }

  ngOnChanges(changes) {
    if (changes.priceRange) {
      this.priceFilterMinValue = changes.priceRange.min;
      this.priceFilterMaxValue = changes.priceRange.max;
    }
  }

  onFilterChange() {}

  onSliderChange() {
    this.sliderForm.controls['minVal'].setValue(
      this.sliderForm.controls['priceSlider'].value[0] <
        this.priceFilterMinValue
        ? this.priceFilterMinValue
        : this.sliderForm.controls['priceSlider'].value[0]
    );
    this.sliderForm.controls['maxVal'].setValue(
      this.sliderForm.controls['priceSlider'].value[1] >
        this.priceFilterMaxValue
        ? this.priceFilterMaxValue
        : this.sliderForm.controls['priceSlider'].value[1]
    );

    console.log(this.sliderForm.value);
  }

  onSliderInput() {
    let min = this.sliderForm.controls['minVal'].value;
    let max = this.sliderForm.controls['maxVal'].value;

    if (min < this.priceFilterMinValue) min = this.priceFilterMinValue;
    if (min > this.priceFilterMaxValue) min = this.priceFilterMaxValue;

    if (max > this.priceFilterMaxValue) max = this.priceFilterMaxValue;
    if (max < this.priceFilterMinValue) max = this.priceFilterMinValue;

    if (min > max) {
      let t = min;
      min = max;
      max = t;
    }

    this.sliderForm.controls['priceSlider'].setValue([min, max]);
    this.sliderForm.controls['minVal'].setValue(
      min < this.priceFilterMaxValue ? min : this.priceFilterMaxValue
    );
    this.sliderForm.controls['maxVal'].setValue(max > min ? max : min);

    console.log(this.sliderForm.value);
  }
}
