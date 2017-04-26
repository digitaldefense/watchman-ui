import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    WuiInputDirective,
    WuiPlaceholderDirective,
    WuiInputBorderDirective,
    WuiInputGroupComponent
} from './input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        WuiInputDirective,
        WuiInputGroupComponent
    ],
    declarations: [
        WuiInputDirective,
        WuiPlaceholderDirective,
        WuiInputBorderDirective,
        WuiInputGroupComponent
    ],
})

export class WuiInputModule {}

export * from './input.component';
