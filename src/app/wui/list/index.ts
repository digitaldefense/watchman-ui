import { NgModule, ModuleWithProviders } from '@angular/core';

import {
    WuiListComponent,
    WuiListItemComponent,
    WuiListItemBodyDirective,
    WuiListItemRightDirective,
    WuiListDenseDirective
} from './list';

@NgModule({
    exports: [
        WuiListComponent,
        WuiListItemComponent,
        WuiListItemBodyDirective,
        WuiListItemRightDirective,
        WuiListDenseDirective
    ],
    declarations: [
        WuiListComponent,
        WuiListItemComponent,
        WuiListItemBodyDirective,
        WuiListItemRightDirective,
        WuiListDenseDirective
    ]
})
export class WuiListModule {}
