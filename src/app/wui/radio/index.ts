import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  // MdRippleModule,
  MdCommonModule,
  UNIQUE_SELECTION_DISPATCHER_PROVIDER,
  FocusOriginMonitor,
} from '../core';

import { FlIconModule } from '../icon/index';

import { FlRadioGroup, FlRadioButton } from './radio.component';

@NgModule({
  imports: [CommonModule, FlIconModule],
  exports: [FlRadioGroup, FlRadioButton],
  declarations: [FlRadioGroup, FlRadioButton],
  providers: [UNIQUE_SELECTION_DISPATCHER_PROVIDER, FocusOriginMonitor]
})

export class FlRadioModule {}

export * from './radio.component';
