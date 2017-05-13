import { NgModule } from '@angular/core';

import { KbdDirective } from './kbd.directive';

// export * from './kbd.directive';

@NgModule({
    exports: [KbdDirective],
    declarations: [KbdDirective]
})
export class FlKbdModule {}
