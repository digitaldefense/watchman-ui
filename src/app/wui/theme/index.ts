import { ModuleWithProviders, NgModule } from '@angular/core';

import {
    WuiColorDirective,
    WuiBackgroundColorDirective,
    WuiBorderColorDirective,
    WuiLinkColorDirective
} from './color.directive';

export * from './color.directive';

import { THEMES } from './themes';
export * from './themes';

import { WuiThemeService } from './theme.service';
export * from './theme.service';

@NgModule({
    imports: [
        // CommonModule,
        // FormsModule
    ],
    exports: [
        WuiColorDirective,
        WuiBackgroundColorDirective,
        WuiBorderColorDirective,
        WuiLinkColorDirective
    ],
    declarations: [
        WuiColorDirective,
        WuiBackgroundColorDirective,
        WuiBorderColorDirective,
        WuiLinkColorDirective
    ],
})

export class WuiColorModule {}
