import { NgModule } from '@angular/core';

import {
    FlInputDirective,
    // WuiPlaceholderDirective,
    FlInputLabelDirective,
    FlInputBorderDirective,
    FlInputGroupComponent
} from './input.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
