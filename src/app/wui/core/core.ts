import { NgModule } from '@angular/core';
// import { WuiRippleModule } from './ripple/index';

// Ripple
export * from './ripple/index';

// Coercion
export {coerceBooleanProperty} from './coercion/boolean-property';
export {coerceNumberProperty} from './coercion/number-property';

@NgModule({
    imports: [
        // WuiRippleModule
    ],
    exports: [
        // WuiRippleModule
    ]
})

export class WuiCoreModule {}
