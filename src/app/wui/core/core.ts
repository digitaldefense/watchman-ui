import { NgModule } from '@angular/core';
import { WuiRippleModule } from './ripple/index';

// Ripple
export * from './ripple/index';

@NgModule({
    imports: [
        WuiRippleModule
    ],
    exports: [
        WuiRippleModule
    ]
})

export class WuiCoreModule {}
