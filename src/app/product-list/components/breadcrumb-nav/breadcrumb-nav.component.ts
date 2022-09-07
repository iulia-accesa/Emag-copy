import { ActivatedRoute, Route } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'breadcrumb-nav',
  templateUrl: './breadcrumb-nav.component.html',
  styleUrls: ['./breadcrumb-nav.component.scss'],
})
export class BreadcrumbNavComponent {
  categoryPath: string;

  constructor(route: ActivatedRoute) {
    this.categoryPath = route.snapshot.paramMap['params'].categoryName;
  }
}
