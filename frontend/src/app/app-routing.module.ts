import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuardService as AuthGuard } from './shared/auth/auth-guard.service';
import { OnlineGuardService as OnlineGuard } from './shared/sync/online-guard.service';
// remove this for lazy loading
import { MoviesModule } from './modules/movies/movies.module';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'downloads', component: DownloadsComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard, OnlineGuard] },
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
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.router_use_hash })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
