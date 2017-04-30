import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    FlSectionComponent,
    FlSectionBody,
    FlSectionControls,
    FlSectionHeaderComponent,
    FlSectionSubtitle,
    FlSectionTitle,
    FlSectionTitleGroupComponent
} from './section.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        FlSectionComponent,
        FlSectionBody,
        FlSectionControls,
        FlSectionHeaderComponent,
        FlSectionSubtitle,
        FlSectionTitle,
        FlSectionTitleGroupComponent
    ],
    declarations: [
        FlSectionComponent,
        FlSectionBody,
        FlSectionControls,
        FlSectionHeaderComponent,
        FlSectionSubtitle,
        FlSectionTitle,
        FlSectionTitleGroupComponent
    ]
})

export class FlSectionModule {}
