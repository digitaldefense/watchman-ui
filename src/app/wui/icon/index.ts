import { ModuleWithProviders, NgModule } from '@angular/core';

import { WuiIconComponent } from './icon.component';

export * from './icon.component';

@NgModule({
    exports: [
        WuiIconComponent
    ],
    declarations: [
        WuiIconComponent
    ]
})

export class WuiIconModule {}
