import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '../core';

import { FlMenuComponent } from './menu.component';
import { FlMenuItemComponent } from './menu-item.component';
import { FlMenuTriggerDirective } from './menu-trigger.directive';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule
    ],
    exports: [
        FlMenuComponent,
        FlMenuItemComponent,
        FlMenuTriggerDirective
    ],
    declarations: [
        FlMenuComponent,
        FlMenuItemComponent,
        FlMenuTriggerDirective
    ]
})
export class FlMenuModule {}
