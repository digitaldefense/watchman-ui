import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '../core/overlay/overlay-directives';

import { DrawerComponent } from './drawer.component';
import { DrawerContainerComponent } from './drawer-container.component';

@NgModule({
    imports: [CommonModule, OverlayModule],
    exports: [DrawerComponent, DrawerContainerComponent],
    declarations: [DrawerComponent, DrawerContainerComponent]
})
export class FlDrawerModule {}

export * from './drawer.component';
export * from './drawer-container.component';
