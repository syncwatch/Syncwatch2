import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuardService as AuthGuard } from './shared/auth/auth-guard.service';
import { OnlineGuardService as OnlineGuard } from './shared/sync/online-guard.service';
import { NoFullscreenGuardService as NoFullscreenGuard } from './shared/display/no-fullscreen-guard.service';
// remove this for lazy loading
import { MoviesModule } from './modules/movies/movies.module';
import { ComicsModule } from './modules/comics/comics.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoFullscreenGuard],
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard, NoFullscreenGuard],
        data: {navTitle: 'Home', navMobileEmoji: 'home'}
    },
        // lazy loading not really working with Service Worker
    // {
    //     path: 'movies',
    //     loadChildren: () => import('./modules/movies/movies.module').then(m => m.MoviesModule),
    //     canActivate: [AuthGuard]
    // },
    // so we load it normally
    {
        path: 'movies',
        loadChildren: () => MoviesModule,
        canActivate: [AuthGuard],
        data: {navTitle: 'Movies', navMobileEmoji: 'movie'}
    },
    {
        path: 'comics',
        loadChildren: () => ComicsModule,
        canActivate: [AuthGuard],
        data: {navTitle: 'Comics', navMobileEmoji: 'comic'}
    },
    {
        path: 'upload',
        loadChildren: () => import('./modules/upload/upload.module').then(m => m.UploadModule),
        canActivate: [AuthGuard, NoFullscreenGuard],
        data: {navTitle: 'Upload'}
    },
    {
        path: 'downloads',
        component: DownloadsComponent,
        canActivate: [AuthGuard, NoFullscreenGuard],
        data: {navTitle: 'Downloads', navEnd: true}
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard, OnlineGuard, NoFullscreenGuard],
        data: {navTitle: 'Profile', navEnd: true, navMobileEmoji: 'profile'}
    },
    {
        path: '**',
        redirectTo: '/home'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.router_use_hash })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
