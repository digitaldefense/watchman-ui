import { NgModule, ModuleWithProviders } from '@angular/core';

import {
    FlListComponent,
    FlListItemComponent,
    FlListItemBodyDirective,
    FlListItemRightDirective,
    FlListDenseDirective
} from './list';

@NgModule({
    exports: [
        FlListComponent,
        FlListItemComponent,
        FlListItemBodyDirective,
        FlListItemRightDirective,
        FlListDenseDirective
    ],
    declarations: [
        FlListComponent,
        FlListItemComponent,
        FlListItemBodyDirective,
        FlListItemRightDirective,
        FlListDenseDirective
    ]
})
export class FlListModule {}
