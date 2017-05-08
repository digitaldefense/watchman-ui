import { ModuleWithProviders, NgModule, Injectable } from '@angular/core';

import { FlThemeService } from './theme.service';
import { ThemePresets } from './presets';

// =============================================================================

// export function themeFactory(presets: ThemePresets): FlThemeService {
//     return new FlThemeService(presets);
// }

// =============================================================================

@NgModule({
    providers: [
        ThemePresets,
        FlThemeService,
        // { provide: FlThemeService, useClass: ThemePresets }
        // { provide: FlThemeService, useFactory: themeFactory, deps: [ThemePresets] }
    ]
})
export class FlThemeModule {}
