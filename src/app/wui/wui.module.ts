import { ModuleWithProviders, NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { WuiColorModule, WuiThemeService, THEMES } from './theme/index';
export { WuiThemeService, THEMES } from './theme/index';

import { WuiToolbarModule } from './toolbar/index';
import { WuiButtonModule } from './button/index';
import { WuiIconModule } from './icon/index';
import { WuiInputModule } from './input/index';
import { WuiUniversalModule } from './universal';
import { WuiCardModule } from './card/index';
import { WuiListModule } from './list';

// import 'lodash';

const WUI_MODULES = [
  // FlexLayoutModule,
  WuiButtonModule,
  WuiIconModule,
  WuiInputModule,
  WuiCardModule,
  WuiListModule,
  WuiToolbarModule,
  WuiUniversalModule
];

@NgModule({
  imports: WUI_MODULES,
  exports: [WUI_MODULES],
  providers: [],
})
export class WuiModule {
  /** Deprecated? */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WuiModule,
      providers: []
    };
  }
}
