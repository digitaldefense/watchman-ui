import { NgModule, ModuleWithProviders } from '@angular/core';

import { WuiColorModule } from './color/index';
import { FlShadowModule } from './shadow/index';
import { FlPaddingModule } from './padding/index';
import { FlContentModule } from './content/index';

import { ObserveContentModule } from './observe-content/observe-content';
import { OverlayModule } from './overlay/overlay-directives';
import { PortalModule } from './portal/portal-directives';
import { A11yModule } from './a11y/index';
import { MdRippleModule } from './ripple/index';


export * from './color/index';
export * from './shadow/index';
export * from './padding/index';

// RTL
export { Dir, LayoutDirection, RtlModule } from './rtl/dir';

// Mutation Observer
export {ObserveContentModule, ObserveContent} from './observe-content/observe-content';

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

// Gestures
export { GestureConfig } from './gestures/gesture-config';
export { HammerInput, HammerManager } from './gestures/gesture-annotations';

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
export { isFakeMousedownFromScreenReader } from './a11y/fake-mousedown';

export { A11yModule } from './a11y/index';

// Style
export * from './style/index';

// Misc
export {ComponentType} from './overlay/generic-component-type';

// Keybindings
export * from './keyboard/keycodes';

// Coercion
export {coerceBooleanProperty} from './coercion/boolean-property';
export {coerceNumberProperty} from './coercion/number-property';

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
        MdRippleModule,
        ObserveContentModule,
        OverlayModule,
        PortalModule,
        A11yModule
    ],
    exports: [
        WuiColorModule,
        FlShadowModule,
        FlPaddingModule,
        FlContentModule,
        MdRippleModule,
        ObserveContentModule,
        PortalModule,
        OverlayModule,
        A11yModule
    ],
})

export class WuiCoreModule {}
