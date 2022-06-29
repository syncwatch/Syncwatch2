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
        data: {navTitle: 'Home', navMobileEmoji: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>`}
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
        data: {navTitle: 'Movies', navMobileEmoji: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clip-rule="evenodd" /></svg>`}
    },
    {
        path: 'comics',
        loadChildren: () => ComicsModule,
        canActivate: [AuthGuard],
        data: {navTitle: 'Comics', navMobileEmoji: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>`}
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
        data: {navTitle: 'Profile', navEnd: true, navMobileEmoji: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>`}
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
