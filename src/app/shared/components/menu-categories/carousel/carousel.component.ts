import { Component, ViewEncapsulation } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
    autoplay: true,
    navText: [
      "<img src='./assets/left-arrow.svg''/>",
      "<img src='./assets/right-arrow.svg'/>",
    ],
  };

  slides = [
    {
      id: '1',
      img: './assets/carousel1.jpeg',
    },
    {
      id: '2',
      img: './assets/carousel2.jpeg',
    },
    {
      id: '3',
      img: './assets/carousel3.jpeg',
    },
  ];

  constructor() {}
}
