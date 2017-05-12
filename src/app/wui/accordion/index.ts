import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    AccordionComponent,
    AccordionCardComponent
} from './accordion.component';

import { FlIconModule } from '../icon/index';

@NgModule({
    imports: [CommonModule, FlIconModule],
    exports: [
        AccordionComponent,
        AccordionCardComponent
    ],
    declarations: [
        AccordionComponent,
        AccordionCardComponent
    ]
})
export class FlAccordionModule {}
