import { NgModule } from '@angular/core';

import { WhiteframeDirective } from './whiteframe';
export { WhiteframeDirective } from './whiteframe';

@NgModule({
    exports: [WhiteframeDirective],
    declarations: [WhiteframeDirective]
})
export class WhiteframeModule {}
