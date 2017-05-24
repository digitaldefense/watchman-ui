import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlToolbarModule } from '../toolbar/index';
import { FlIconModule } from '../icon/index';
import { FlButtonModule } from '../button/index';
import { WuiColorModule } from '../core/color/index';

import {
    CardComponent,
    FlCardToolbarComponent,
    FlCardToolbarDirective,
    FlCardTitleDirective,
    FlCardSubtitleDirective,
    FlCardBodyTrigger,
    FlCardBody,
    FlCardCollapsed,
    FlCardToggle,
    FlCardActionsDirective,
    FlCardDividerDirective,

    FlCardActions,
    FlCardHeader,
    FlCardText
} from './card.component';

@NgModule({
    imports: [CommonModule, FlToolbarModule, FlButtonModule, FlIconModule, WuiColorModule],
    exports: [
        CardComponent,
        FlCardTitleDirective,
        FlCardToolbarDirective,
        FlCardSubtitleDirective,
        FlCardToolbarComponent,
        FlCardBodyTrigger,
        FlCardBody,
        FlCardCollapsed,
        FlCardToggle,
        FlCardActionsDirective,
        FlCardDividerDirective,

        FlCardActions,
        FlCardHeader,
        FlCardText
    ],
    declarations: [
        CardComponent,
        FlCardToolbarComponent,
        FlCardToolbarDirective,
        FlCardTitleDirective,
        FlCardSubtitleDirective,
        FlCardBodyTrigger,
        FlCardBody,
        FlCardCollapsed,
        FlCardToggle,
        FlCardActionsDirective,
        FlCardDividerDirective,

        FlCardActions,
        FlCardHeader,
        FlCardText
    ]
})
export class FlCardModule {}
