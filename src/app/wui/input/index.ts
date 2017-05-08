import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    FlInputDirective,
    // WuiPlaceholderDirective,
    FlInputLabelDirective,
    FlInputBorderDirective,
    FlInputGroupComponent
} from './input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        FlInputDirective,
        FlInputGroupComponent
    ],
    declarations: [
        FlInputDirective,
        // WuiPlaceholderDirective,
        FlInputLabelDirective,
        FlInputBorderDirective,
        FlInputGroupComponent
    ],
})

export class FlInputModule {}

export * from './input.component';
