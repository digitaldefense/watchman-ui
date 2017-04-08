import { ModuleWithProviders, NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { WuiToolbarModule } from './toolbar/index';
import { WuiButtonModule } from './button/index';
import { WuiInputModule } from './input/index';
import { WuiUniversalModule } from './universal';

const WUI_MODULES = [
  FlexLayoutModule,
  WuiButtonModule,
  WuiInputModule,
  WuiToolbarModule,
  WuiUniversalModule
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
