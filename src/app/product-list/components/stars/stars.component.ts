import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {
  @Input() starCount: number = 0;
  @Input() starIterator: number[] = [0, 0, 0, 0, 0];

  ngOnInit(): void {
    for (let i = 0; i < this.starCount; ++i) {
      this.starIterator[i] = 1;
    }
  }
}
