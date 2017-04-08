import {ModuleWithProviders, NgModule} from '@angular/core';
import { WuiColorDirective } from './color.directive';

export { WuiColorDirective } from './color.directive';

@NgModule({
    exports: [WuiColorDirective],
    declarations: [WuiColorDirective],
    providers: []
})

export class WuiColorModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: WuiColorModule,
            providers: []
        };
    }
}
