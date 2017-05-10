import { EventEmitter, TemplateRef } from '@angular/core';

export interface FlMenuPanel {
    xPosition: string;
    yPosition: string;
    templateRef: TemplateRef<any>;
    close: EventEmitter<void>;
    _emitCloseEvent: () => void;
}
