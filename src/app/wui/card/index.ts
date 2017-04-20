import { ModuleWithProviders, NgModule } from '@angular/core';

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
