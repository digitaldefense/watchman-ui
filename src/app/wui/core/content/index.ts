import { NgModule } from '@angular/core';

import { FlContentDirective } from './content.directive';
export { FlContentDirective } from './content.directive';

@NgModule({
    exports: [FlContentModule],
    declarations: [FlContentDirective],

})
export class FlContentModule {}
