import { ModuleWithProviders, NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { WuiThemeService, THEMES } from './theme/index';
export { WuiThemeService, THEMES } from './theme/index';

import { WuiColorModule } from './core/color';
import { FlShadowModule } from './core/shadow';

import { FlSectionModule } from './section/index';
import { FlToolbarModule } from './toolbar/index';
import { FlButtonModule } from './button/index';
import { FlIconModule } from './icon/index';
import { WuiInputModule } from './input/index';
import { WuiUniversalModule } from './universal';
import { FlListModule } from './list';
import { WuiAvatarModule } from './avatar';
import { WuiDividerModule } from './divider';
import { FlCardModule } from './card/index';

// export * from './core/color';

// import 'lodash';

const WUI_MODULES = [
  // FlexLayoutModule,
  WuiColorModule,
  FlSectionModule,
  FlShadowModule,
  FlCardModule,
  FlButtonModule,
  WuiDividerModule,
  FlIconModule,
  WuiAvatarModule,
  WuiInputModule,
  FlListModule,
  FlToolbarModule,
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
