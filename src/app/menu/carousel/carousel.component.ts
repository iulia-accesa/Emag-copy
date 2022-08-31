import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true,
    autoplay: true,
    navText: [ "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"]
  }

  slides = [
    {id: "1", img:"https://tpc.googlesyndication.com/simgad/7573031838953409196?"},
    {id: "2", img:"https://tpc.googlesyndication.com/simgad/9905076699393245596?"},
    {id: "3", img:"https://tpc.googlesyndication.com/simgad/1715730311661820279?"},
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
