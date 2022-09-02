import { ProductService } from './../../services/product.service';
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

  public filterForm: FormGroup;
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

  constructor(private productService: ProductService) {
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
    });
  }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      priceOrder: new FormControl(''),
      nameOrder: new FormControl(''),
      priceSlider: this.sliderForm,
      ratingsForm: this.ratingsForm,
    });
  }

  onFilterChange() {}

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

    console.log(this.priceRange, this.sliderForm.value);
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

    console.log(this.priceRange, this.sliderForm.value);
  }
}
