import { ModuleWithProviders, NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { WuiThemeService, THEMES } from './theme/index';
export { WuiThemeService, THEMES } from './theme/index';

import { WuiColorModule } from './core/color';

import {
  FlPaddingModule,
  FlShadowModule,

  MdRippleModule,
  RtlModule,
  PortalModule,
  OverlayModule,
  A11yModule,
  MdCommonModule
} from './core';

import { PlatformModule } from './core/platform/index';
import { StyleModule } from './core/style/index';

import { MdDialogModule } from './dialog/index';

import { FlSectionModule } from './section/index';
import { FlToolbarModule } from './toolbar/index';
import { FlButtonModule } from './button/index';
import { FlGridListModule } from './grid-list/index';
import { FlIconModule } from './icon/index';
import { FlInputModule } from './input/index';
import { FlListModule } from './list';
import { FlAvatarModule } from './avatar';
import { FlDividerModule } from './divider';
import { FlCardModule } from './card/index';
import { FlMenuModule } from './menu/index';
import { FlAccordionModule } from './accordion/index';
import { FlSubheaderModule } from './subheader/index';
import { FlDrawerModule } from './drawer/index';
import { FlSnackbarModule } from './snackbar/index';
import { FlSliderModule } from './slider/index';

// import 'lodash';

const WUI_MODULES = [
  // FlexLayoutModule,
  WuiColorModule,
  FlAccordionModule,
  FlGridListModule,
  FlSectionModule,
  FlShadowModule,
  FlPaddingModule,
  FlSubheaderModule,
  // FlContentModule,
  FlCardModule,
  FlButtonModule,
  FlDividerModule,
  FlIconModule,
  FlAvatarModule,
  FlInputModule,
  FlListModule,
  FlToolbarModule,
  FlMenuModule,
  FlDrawerModule,
  FlSliderModule,
  FlSnackbarModule,

  MdDialogModule,

  OverlayModule,
  PortalModule,
  RtlModule,
  StyleModule,
  A11yModule,
  PlatformModule,
  MdCommonModule,
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
