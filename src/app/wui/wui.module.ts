import { ModuleWithProviders, NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { WuiThemeService, THEMES } from './theme/index';
export { WuiThemeService, THEMES } from './theme/index';

import { WuiColorModule } from './core/color';

import { WuiToolbarModule } from './toolbar/index';
import { WuiButtonModule } from './button/index';
import { WuiIconModule } from './icon/index';
import { WuiInputModule } from './input/index';
import { WuiUniversalModule } from './universal';
import { WuiCardModule } from './card/index';
import { WuiListModule } from './list';
import { WuiAvatarModule } from './avatar';
import { WuiDividerModule } from './divider';

// export * from './core/color';

// import 'lodash';

const WUI_MODULES = [
  // FlexLayoutModule,
  WuiColorModule,
  WuiButtonModule,
  WuiDividerModule,
  WuiIconModule,
  WuiAvatarModule,
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
