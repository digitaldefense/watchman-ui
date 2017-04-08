import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  WuiColorModule,
  WuiPaddingModule
} from './core'

import { FlexLayoutModule } from '@angular/flex-layout';
import { WuiToolbarModule } from './toolbar/index';
import { WuiButtonModule } from './button/index';
import { WuiInputModule } from './input/index';

const WUI_MODULES = [
  FlexLayoutModule,
  WuiButtonModule,
  WuiColorModule,
  WuiPaddingModule,
  WuiInputModule,
  WuiToolbarModule
];

@NgModule({
  imports: WUI_MODULES,
  exports: WUI_MODULES,
})
export class WuiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WuiModule,
      providers: []
    }
  }
}
