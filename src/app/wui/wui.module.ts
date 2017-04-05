import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WuiButtonModule } from './button/index';
import { WuiInputModule } from './input/index';

const modules = [
  FlexLayoutModule,
  WuiButtonModule,
  WuiInputModule
];

@NgModule({
  imports: [
    FlexLayoutModule,
    WuiButtonModule,
    WuiInputModule
  ],
  exports: modules,
})
export class WuiModule { }
