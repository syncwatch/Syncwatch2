import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { WatchComponent } from './pages/watch/watch.component';
import { FullscreenGuardService as FullscreenGuard } from '../../shared/display/fullscreen-guard.service';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [FullscreenGuard],
        pathMatch: 'full',
    },
    {
        path: 'watch/:id',
        component: WatchComponent,
        canActivate: [FullscreenGuard],
    },
    {
        path: ':movie_type/:id',
        component: OverviewComponent,
        canActivate: [FullscreenGuard],
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MoviesRoutingModule { }
