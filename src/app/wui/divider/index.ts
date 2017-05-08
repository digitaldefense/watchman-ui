import { NgModule } from '@angular/core';

import { DividerComponent } from './divider.component';

export * from './divider.component';

@NgModule({
    exports: [
        DividerComponent
    ],
    declarations: [
        DividerComponent
    ]
})

export class FlDividerModule {}
