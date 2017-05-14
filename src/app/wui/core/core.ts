import { NgModule, ModuleWithProviders } from '@angular/core';

import { WuiColorModule } from './color/index';
import { FlShadowModule } from './shadow/index';
import { FlPaddingModule } from './padding/index';
import { FlContentModule } from './content/index';
import { PortalModule } from './portal/portal-directives';
import { OverlayModule } from './overlay/overlay-directives';
// import { WuiRippleModule } from './ripple/index';
import { FlSubtitleModule } from './subtitle/index';

// HTML Element modifiers
import { FlKbdModule } from './kbd/index';

// Coercion
export {coerceBooleanProperty} from './coercion/boolean-property';
export {coerceNumberProperty} from './coercion/number-property';

export * from './color/index';
export * from './shadow/index';
export * from './padding/index';
export * from './subtitle/index';
export * from './kbd/index';

// Portals
export {
    Portal,
    PortalHost,
    BasePortalHost,
    ComponentPortal,
    TemplatePortal
} from './portal/portal';
export {
    PortalHostDirective,
    TemplatePortalDirective,
    PortalModule
} from './portal/portal-directives';

// Overlay
export * from './overlay/index';

@NgModule({
    imports: [
        WuiColorModule,
        FlShadowModule,
        FlPaddingModule,
        FlContentModule,
        PortalModule,
        OverlayModule,
        FlKbdModule,
        FlSubtitleModule
        // WuiRippleModule
    ],
    exports: [
        WuiColorModule,
        FlShadowModule,
        FlPaddingModule,
        FlContentModule,
        PortalModule,
        OverlayModule,
        FlKbdModule,
        FlSubtitleModule
        // WuiRippleModule
    ],
})

export class WuiCoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: WuiCoreModule,
            providers: []
        }
    }
}
