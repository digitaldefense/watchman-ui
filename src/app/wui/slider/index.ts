import { NgModule } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdCommonModule, GestureConfig } from '../core';
import { RtlModule } from '../core/rtl/dir';
import { FlSlider } from './slider.component';
import { SliderGroupDirective } from './slider-group.directive';

@NgModule({
  imports: [CommonModule, FormsModule, MdCommonModule, RtlModule],
  exports: [FlSlider, SliderGroupDirective, MdCommonModule],
  declarations: [FlSlider, SliderGroupDirective],
  providers: [{provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}]
})
export class FlSliderModule {}

export * from './slider.component';
