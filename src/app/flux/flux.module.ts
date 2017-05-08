import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

import { FluxComponent } from './flux.component';
import { FluxRouting } from './flux.routes';

// const routes: Routes = [
//     { path: '', component: FluxComponent }
// ];

@NgModule({
    imports: [
        // RouterModule.forChild(routes)
        FluxRouting
    ],
    declarations: [ FluxComponent ]
})
export class FluxModule {}
