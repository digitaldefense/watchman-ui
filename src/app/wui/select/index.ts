import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlSelectComponent, FlOptionComponent } from './select.component';
import { MdOptionModule } from '../core/option/option';
import { MdCommonModule, OverlayModule } from '../core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    MdOptionModule,
    MdCommonModule,
  ],
  exports: [FlSelectComponent, FlOptionComponent, MdOptionModule, MdCommonModule],
  declarations: [FlSelectComponent, FlOptionComponent],
})
export class FlSelectModule {}


export * from './select.component';
export {fadeInContent, transformPanel, transformPlaceholder} from './select-animations';
