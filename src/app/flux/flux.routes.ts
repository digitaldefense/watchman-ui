import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FluxComponent } from './flux.component';

const routes: Routes = [
    { path: '', component: FluxComponent }
];

export const FluxRouting: ModuleWithProviders = RouterModule.forChild(routes);
