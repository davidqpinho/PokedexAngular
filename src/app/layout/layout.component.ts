import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: [
    './layout.component.scss',
    './hinge.component.scss',
    './leds.component.scss',
    './miscellaneous.component.scss',
    './screen-place.component.scss'
  ]
})
export class LayoutComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }
}
