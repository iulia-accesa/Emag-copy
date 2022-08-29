import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FiltersComponent implements OnInit {
  readonly priceFilterMinValue = 100;
  readonly priceFilterMaxValue = 20000;

  filterForm: FormGroup;
  brandsForm = new FormGroup({
    brand1: new FormControl(''),
    brand2: new FormControl(''),
    brand3: new FormControl(''),
    brand4: new FormControl(''),
    brand5: new FormControl(''),
  });

  priceFilterOptions: Options = {
    floor: this.priceFilterMinValue,
    ceil: this.priceFilterMaxValue,
    step: 1,
  };
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

  constructor() {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      order: new FormControl(''),
      brands: this.brandsForm,
      priceSlider: this.sliderForm,
      ratingsForm: this.ratingsForm,
    });
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
