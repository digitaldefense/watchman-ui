import { NgModule, ModuleWithProviders } from '@angular/core';

import { WuiColorModule } from './color/index';
import { ShadowModule } from './shadow/index';

// import { WuiPaddingModule } from './padding/index';
// import { WuiRippleModule } from './ripple/index';

// Padding
// export * from './padding/index';

// Coercion
export {coerceBooleanProperty} from './coercion/boolean-property';
export {coerceNumberProperty} from './coercion/number-property';

export * from './color/index';
export * from './shadow/index';

@NgModule({
    imports: [
        WuiColorModule,
        ShadowModule
        // WuiRippleModule
        // WuiPaddingModule
    ],
    exports: [
        WuiColorModule,
        ShadowModule
        // WuiRippleModule
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
