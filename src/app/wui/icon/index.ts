import { NgModule } from '@angular/core';

import { FlIconComponent } from './icon.component';

export * from './icon.component';

@NgModule({
    exports: [
        FlIconComponent
    ],
    declarations: [
        FlIconComponent
    ]
})

export class FlIconModule {}
