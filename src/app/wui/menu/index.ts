import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlMenuComponent } from './menu.component';
import { FlMenuItemComponent } from './menu-item.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        FlMenuComponent,
        FlMenuItemComponent
    ],
    declarations: [
        FlMenuComponent,
        FlMenuItemComponent
    ]
})
export class FlMenuModule {}
