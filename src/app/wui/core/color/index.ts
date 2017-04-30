import { NgModule } from '@angular/core';

import { WuiColorDirective, WuiBackgroundDirective, WuiLinkColorDirective } from './color';
// export { WuiColorDirective, WuiBackgroundDirective, WuiLinkColorDirective } from './color';
export * from './color';

@NgModule({
    exports: [
        WuiColorDirective,
        WuiBackgroundDirective,
        WuiLinkColorDirective
    ],
    declarations: [
        WuiColorDirective,
        WuiBackgroundDirective,
        WuiLinkColorDirective
    ]
})
export class WuiColorModule {}
