import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    WuiButton,
    WuiButtonStyler,
} from './button.component';

export * from './button.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        WuiButton,
        WuiButtonStyler
    ],
    declarations: [
        WuiButton,
        WuiButtonStyler
    ]
})

export class WuiButtonModule {}
