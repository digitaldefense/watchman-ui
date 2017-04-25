import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    WuiInputDirective,
    WuiInputGroupComponent
} from './input.component';

@NgModule({
    declarations: [
        WuiInputDirective,
        WuiInputGroupComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        WuiInputDirective,
        WuiInputGroupComponent
    ]
})

export class WuiInputModule {}

export * from './input.component';
