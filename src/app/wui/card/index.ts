import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlToolbarModule } from '../toolbar/index';

import {
    CardComponent,
    FlCardToolbarComponent,
    FlCardToolbarDirective,
    FlCardTitleDirective,
    FlCardSubtitleDirective,
    FlCardBodyTrigger,
    FlCardBody,
    FlCardActionsDirective,
    FlCardDividerDirective
} from './card.component';

@NgModule({
    imports: [CommonModule, FlToolbarModule],
    exports: [
        CardComponent,
        FlCardTitleDirective,
        FlCardToolbarDirective,
        FlCardSubtitleDirective,
        FlCardToolbarComponent,
        FlCardBodyTrigger,
        FlCardBody,
        FlCardActionsDirective,
        FlCardDividerDirective
    ],
    declarations: [
        CardComponent,
        FlCardToolbarComponent,
        FlCardToolbarDirective,
        FlCardTitleDirective,
        FlCardSubtitleDirective,
        FlCardBodyTrigger,
        FlCardBody,
        FlCardActionsDirective,
        FlCardDividerDirective
    ]
})
export class FlCardModule {}
