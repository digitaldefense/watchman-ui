import { NgModule } from '@angular/core';

import {
    CardComponent,
    FlCardHeaderDirective,
    FlCardActionsDirective,
    FlCardDividerDirective
} from './card.component';


@NgModule({
    exports: [
        CardComponent,
        FlCardHeaderDirective,
        FlCardActionsDirective,
        FlCardDividerDirective
    ],
    declarations: [
        CardComponent,
        FlCardHeaderDirective,
        FlCardActionsDirective,
        FlCardDividerDirective
    ]
})
export class FlCardModule {}
