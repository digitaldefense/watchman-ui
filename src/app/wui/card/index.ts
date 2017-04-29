import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    WuiCardComponent,
    WuiCardHeaderComponent,
    WuiCardTitleGroupComponent,
    WuiCardTitle,
    WuiCardSubtitle,
    WuiCardControls,
    WuiCardBody,
    WuiCardFooter,
    WuiCardActions
} from './card.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        WuiCardComponent,
        WuiCardHeaderComponent,
        WuiCardTitleGroupComponent,
        WuiCardTitle,
        WuiCardSubtitle,
        WuiCardControls,
        WuiCardBody,
        WuiCardFooter,
        WuiCardActions
    ],
    declarations: [
        WuiCardComponent,
        WuiCardHeaderComponent,
        WuiCardTitleGroupComponent,
        WuiCardTitle,
        WuiCardSubtitle,
        WuiCardControls,
        WuiCardBody,
        WuiCardFooter,
        WuiCardActions
    ]
})

export class WuiCardModule {}
