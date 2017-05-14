import { NgModule } from '@angular/core';

import { SubtitleDirective } from './subtitle.directive';

@NgModule({
    exports: [SubtitleDirective],
    declarations: [SubtitleDirective]
})
export class FlSubtitleModule {}
