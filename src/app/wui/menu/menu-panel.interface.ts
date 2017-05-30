import { EventEmitter, TemplateRef } from '@angular/core';
import { MenuPositionX, MenuPositionY } from './menu-positions';

export interface FlMenuPanel {
    xPosition: string;
    yPosition: string;
    overlapTrigger: boolean;
    templateRef: TemplateRef<any>;
    close: EventEmitter<void>;
    focusFirstItem: () => void;
    setPositionClasses: (x: MenuPositionX, y: MenuPositionY) => void;
    _emitCloseEvent: () => void;
}
