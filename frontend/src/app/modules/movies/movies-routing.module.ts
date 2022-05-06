import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { WatchComponent } from './pages/watch/watch.component';
import { FullscreenGuardService as FullscreenGuard } from '../../shared/display/fullscreen-guard.service';

const routes: Routes = [
    {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [FullscreenGuard],
    },
    {
        path: 'watch/:id',
        component: WatchComponent,
        canActivate: [FullscreenGuard],
    },
    { path: '**', redirectTo: 'overview' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MoviesRoutingModule { }
