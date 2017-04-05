import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    WuiButton,
    WuiButtonStyler,
    WuiRaisedButtonStyler,
} from './button.component';

export * from './button.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        WuiButton,
        WuiButtonStyler,
        WuiRaisedButtonStyler
    ],
    declarations: [
        WuiButton,
        WuiButtonStyler,
        WuiRaisedButtonStyler
    ]
})

export class WuiButtonModule {}
