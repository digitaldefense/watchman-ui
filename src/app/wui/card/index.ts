import { NgModule } from '@angular/core';

import {
    CardComponent,
    FlCardToolbarComponent,
    FlCardTitleDirective,
    FlCardSubtitleDirective,
    FlCardActionsDirective,
    FlCardDividerDirective
} from './card.component';

@NgModule({
    exports: [
        CardComponent,
        FlCardTitleDirective,
        FlCardSubtitleDirective,
        FlCardToolbarComponent,
        FlCardActionsDirective,
        FlCardDividerDirective
    ],
    declarations: [
        CardComponent,
        FlCardToolbarComponent,
        FlCardTitleDirective,
        FlCardSubtitleDirective,
        FlCardActionsDirective,
        FlCardDividerDirective
    ]
})
export class FlCardModule {}
