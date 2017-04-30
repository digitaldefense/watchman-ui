import { ModuleWithProviders, NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { WuiThemeService, THEMES } from './theme/index';
export { WuiThemeService, THEMES } from './theme/index';

import { WuiColorModule } from './core/color';
import { WhiteframeModule } from './core/whiteframe';

import { FlSectionModule } from './section/index';
import { WuiToolbarModule } from './toolbar/index';
import { WuiButtonModule } from './button/index';
import { WuiIconModule } from './icon/index';
import { WuiInputModule } from './input/index';
import { WuiUniversalModule } from './universal';
import { WuiListModule } from './list';
import { WuiAvatarModule } from './avatar';
import { WuiDividerModule } from './divider';
import { FlCardModule } from './paper/index';

// export * from './core/color';

// import 'lodash';

const WUI_MODULES = [
  // FlexLayoutModule,
  WuiColorModule,
  FlSectionModule,
  WhiteframeModule,
  FlCardModule,
  WuiButtonModule,
  WuiDividerModule,
  WuiIconModule,
  WuiAvatarModule,
  WuiInputModule,
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
