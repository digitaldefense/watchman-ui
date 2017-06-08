import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdRippleModule, MdCommonModule, FocusOriginMonitor } from '../core';
import { FlIconModule } from '../icon/index';

import { FlCheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [CommonModule, MdRippleModule, MdCommonModule, FlIconModule],
  exports: [FlCheckboxComponent, MdCommonModule],
  declarations: [FlCheckboxComponent],
  providers: [FocusOriginMonitor]
})
export class FlCheckboxModule {}

export * from './checkbox.component';
