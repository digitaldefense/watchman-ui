import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    WuiButton,
    WuiButtonStyler,
    // WuiRaisedButtonStyler,
    FlButtonComponent,
    FlFlatButtonStyle,
    FlIconButtonStyle
} from './button.component';

export * from './button.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        WuiButton,
        WuiButtonStyler,
        // WuiRaisedButtonStyler,
        FlButtonComponent,
        FlFlatButtonStyle,
        FlIconButtonStyle
    ],
    declarations: [
        WuiButton,
        WuiButtonStyler,
        // WuiRaisedButtonStyler,
        FlButtonComponent,
        FlFlatButtonStyle,
        FlIconButtonStyle
    ]
})

export class WuiButtonModule {}
