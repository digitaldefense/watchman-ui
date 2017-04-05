import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WuiInput } from './input.component';

@NgModule({
    declarations: [
        WuiInput
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        WuiInput
    ]
})

export class WuiInputModule {}
