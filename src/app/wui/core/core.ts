import { NgModule, ModuleWithProviders } from '@angular/core';

import { WuiColorModule } from './color/index';
import { FlShadowModule } from './shadow/index';
import { FlPaddingModule } from './padding/index';
import { FlContentModule } from './content/index';
import { PortalModule } from './portal/portal-directives';
import { OverlayModule } from './overlay/overlay-directives';

import { A11yModule } from './a11y/index';
import { MdRippleModule } from './ripple/index';

// RTL
export { Dir, LayoutDirection, RtlModule } from './rtl/dir';

// Coercion
export {coerceBooleanProperty} from './coercion/boolean-property';
export {coerceNumberProperty} from './coercion/number-property';

export * from './color/index';
export * from './shadow/index';
export * from './padding/index';

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

// Platform
export * from './platform/index';

// Overlay
export * from './overlay/index';

// Ripple
export * from './ripple/index';

// a11y
export {
  AriaLivePoliteness,
  LiveAnnouncer,
  LIVE_ANNOUNCER_ELEMENT_TOKEN,
  LIVE_ANNOUNCER_PROVIDER,
} from './a11y/live-announcer';

export * from './a11y/focus-trap';

export { A11yModule } from './a11y/index';

export * from './compatibility/compatibility';

// Compatibility
export {CompatibilityModule, NoConflictStyleCompatibilityMode} from './compatibility/compatibility';

// Common material module
export {MdCommonModule} from './common-behaviors/common-module';

@NgModule({
    imports: [
        WuiColorModule,
        FlShadowModule,
        FlPaddingModule,
        FlContentModule,
        PortalModule,
        OverlayModule,
        // WuiRippleModule
    ],
    exports: [
        WuiColorModule,
        FlShadowModule,
        FlPaddingModule,
        FlContentModule,
        PortalModule,
        OverlayModule,
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
