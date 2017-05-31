import { Directive, ContentChild } from '@angular/core';

import { FlSlider } from './slider.component';

@Directive({
  selector: 'fl-slider-group',
  host: {
    '[class.fl-slider-group]': 'true'
  }
})
export class SliderGroupDirective {
  private _sliderVal: number;

  @ContentChild(FlSlider) _slider: FlSlider;
}
