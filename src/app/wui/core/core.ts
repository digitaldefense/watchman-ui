import { NgModule, ModuleWithProviders } from '@angular/core';

// import { WuiPaddingModule } from './padding/index';
// import { WuiRippleModule } from './ripple/index';

// Padding
export * from './padding/index';

// Coercion
export {coerceBooleanProperty} from './coercion/boolean-property';
export {coerceNumberProperty} from './coercion/number-property';

@NgModule({
    imports: [
        // WuiRippleModule
        // WuiPaddingModule
    ],
    exports: [
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
