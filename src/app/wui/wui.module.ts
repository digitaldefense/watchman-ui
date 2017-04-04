import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WuiButtonModule } from './button/index';

const modules = [
  FlexLayoutModule,
  WuiButtonModule
];

@NgModule({
  imports: [
    FlexLayoutModule,
    WuiButtonModule,
  ],
  exports: modules,
})
export class WuiModule { }
