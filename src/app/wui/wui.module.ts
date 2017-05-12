import { ModuleWithProviders, NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { WuiThemeService, THEMES } from './theme/index';
export { WuiThemeService, THEMES } from './theme/index';

import { WuiColorModule } from './core/color';
import { FlShadowModule } from './core/shadow';
import { FlPaddingModule } from './core/padding';
// import { FlContentModule } from './core/content';

import { FlSectionModule } from './section/index';
import { FlToolbarModule } from './toolbar/index';
import { FlButtonModule } from './button/index';
import { FlIconModule } from './icon/index';
import { FlInputModule } from './input/index';
import { FlListModule } from './list';
import { FlAvatarModule } from './avatar';
import { FlDividerModule } from './divider';
import { FlCardModule } from './card/index';
import { FlMenuModule } from './menu/index';
import { FlAccordionModule } from './accordion/index';

// export * from './core/color';

// import 'lodash';

const WUI_MODULES = [
  // FlexLayoutModule,
  WuiColorModule,
  FlAccordionModule,
  FlSectionModule,
  FlShadowModule,
  FlPaddingModule,
  // FlContentModule,
  FlCardModule,
  FlButtonModule,
  FlDividerModule,
  FlIconModule,
  FlAvatarModule,
  FlInputModule,
  FlListModule,
  FlToolbarModule,
  FlMenuModule
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
