import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wui-slider-page',
  templateUrl: './slider-page.component.html',
  styleUrls: ['./slider-page.component.scss']
})
export class SliderPageComponent implements OnInit {
  sliderDemoValue: number = 0;

  constructor() { }

  ngOnInit() {
  }

  updateSliderValue(event: Event) {
    this.sliderDemoValue = event['value'];
  }
}
