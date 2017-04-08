import { NgModule, ModuleWithProviders } from '@angular/core';

import { WuiColorModule } from './color/index';
// import { WuiPaddingModule } from './padding/index';
// import { WuiRippleModule } from './ripple/index';

// Color
export * from './color/index';

// Padding
export * from './padding/index';

// Coercion
export {coerceBooleanProperty} from './coercion/boolean-property';
export {coerceNumberProperty} from './coercion/number-property';

@NgModule({
    imports: [
        // WuiRippleModule
        WuiColorModule,
        // WuiPaddingModule
    ],
    exports: [
        // WuiRippleModule
        WuiColorModule,
        // WuiPaddingModule
    ],
})

export class WuiCoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: WuiCoreModule,
            providers: []
        }
    }
}
