import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WuiIconModule } from '../icon';
import { AvatarComponent } from './avatar.component';

export * from './avatar.component';

@NgModule({
    imports: [
        CommonModule,
        WuiIconModule
    ],
    exports: [
        AvatarComponent
    ],
    declarations: [
        AvatarComponent
    ]
})

export class WuiAvatarModule {}
