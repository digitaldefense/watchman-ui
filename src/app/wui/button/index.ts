import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    FlButtonComponent,
    FlFlatButtonStyle,
    FlIconButtonStyle,
    FlRaisedButtonStyle
} from './button.component';

export * from './button.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        FlButtonComponent,
        FlFlatButtonStyle,
        FlIconButtonStyle,
        FlRaisedButtonStyle
    ],
    declarations: [
        FlButtonComponent,
        FlFlatButtonStyle,
        FlIconButtonStyle,
        FlRaisedButtonStyle
    ]
})

export class FlButtonModule {}
