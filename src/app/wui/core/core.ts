import { NgModule, ModuleWithProviders } from '@angular/core';

import { WuiColorModule } from './color/index';
import { FlShadowModule } from './shadow/index';
import { FlPaddingModule } from './padding/index';
import { FlContentModule } from './content/index';
// import { WuiRippleModule } from './ripple/index';

// Coercion
export {coerceBooleanProperty} from './coercion/boolean-property';
export {coerceNumberProperty} from './coercion/number-property';

export * from './color/index';
export * from './shadow/index';
export * from './padding/index';

@NgModule({
    imports: [
        WuiColorModule,
        FlShadowModule,
        FlPaddingModule,
        FlContentModule,
        // WuiRippleModule
    ],
    exports: [
        WuiColorModule,
        FlShadowModule,
        FlPaddingModule,
        FlContentModule
        // WuiRippleModule
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
