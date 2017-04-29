import { NgModule, ModuleWithProviders } from '@angular/core';

import { WuiColorModule } from './color/index';
import { WhiteframeModule } from './whiteframe/index';

// import { WuiPaddingModule } from './padding/index';
// import { WuiRippleModule } from './ripple/index';

// Padding
// export * from './padding/index';

// Coercion
export {coerceBooleanProperty} from './coercion/boolean-property';
export {coerceNumberProperty} from './coercion/number-property';

export * from './color/index';
export * from './whiteframe/index';

@NgModule({
    imports: [
        WuiColorModule,
        WhiteframeModule
        // WuiRippleModule
        // WuiPaddingModule
    ],
    exports: [
        WuiColorModule,
        WhiteframeModule
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
