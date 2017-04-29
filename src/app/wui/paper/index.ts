import { NgModule } from '@angular/core';

import { CardComponent } from './card.component';

@NgModule({
    exports: [CardComponent],
    declarations: [CardComponent]
})
export class FlCardModule {}
