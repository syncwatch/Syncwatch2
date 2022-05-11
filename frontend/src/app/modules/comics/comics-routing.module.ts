import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FullscreenGuardService as FullscreenGuard } from '../../shared/display/fullscreen-guard.service';
import { OverviewComponent } from './pages/overview/overview.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [FullscreenGuard],
        pathMatch: 'full',
    },
    {
        path: ':id',
        component: OverviewComponent,
        canActivate: [FullscreenGuard],
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComicsRoutingModule { }
