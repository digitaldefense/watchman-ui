import { NgModule } from '@angular/core';

import { ShadowDirective } from './shadow';
export { ShadowDirective } from './shadow';

@NgModule({
    exports: [ShadowDirective],
    declarations: [ShadowDirective]
})
export class FlShadowModule {}
