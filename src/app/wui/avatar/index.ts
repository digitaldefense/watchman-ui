import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlIconModule } from '../icon';
import { AvatarComponent } from './avatar.component';

export * from './avatar.component';

@NgModule({
    imports: [
        CommonModule,
        FlIconModule
    ],
    exports: [
        AvatarComponent
    ],
    declarations: [
        AvatarComponent
    ]
})

export class FlAvatarModule {}
