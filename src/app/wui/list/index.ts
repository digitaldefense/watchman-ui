import { NgModule, ModuleWithProviders } from '@angular/core';

import {
    WuiListComponent,
    WuiListItemComponent,
    WuiListItemBodyDirective,
    WuiListItemRightDirective
} from './list';

@NgModule({
    exports: [
        WuiListComponent,
        WuiListItemComponent,
        WuiListItemBodyDirective,
        WuiListItemRightDirective
    ],
    declarations: [
        WuiListComponent,
        WuiListItemComponent,
        WuiListItemBodyDirective,
        WuiListItemRightDirective
    ]
})
export class WuiListModule {}
