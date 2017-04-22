import { ModuleWithProviders, NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { WuiThemeService } from './core/color/theme.service';
import { THEMES } from './core/color/themes';

import { WuiColorService } from './core/color/color.service';

import { WuiToolbarModule } from './toolbar/index';
import { WuiButtonModule } from './button/index';
import { WuiIconModule } from './icon/index';
import { WuiInputModule } from './input/index';
import { WuiUniversalModule } from './universal';
import { WuiCardModule } from './card/index';

// import 'lodash';

const WUI_MODULES = [
  // FlexLayoutModule,
  WuiButtonModule,
  WuiIconModule,
  WuiInputModule,
  WuiCardModule,
  WuiToolbarModule,
  WuiUniversalModule
];

@NgModule({
  imports: WUI_MODULES,
  exports: WUI_MODULES,
  providers: [
    THEMES,
    WuiThemeService,
    WuiColorService,
  ]
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
