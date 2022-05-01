import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './shared/auth/auth.service';
import { AuthService as MockAuthService } from './shared/auth/auth.mock.service';
import { UserService } from './shared/user/user.service';
import { UserService as MockUserService } from './shared/user/user.mock.service';
import { HttpInterceptorService } from './shared/auth/http-interceptor.service';
import { LogoComponent } from './components/logo/logo.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ModalComponent } from './components/modal/modal.component';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { AuthGuardService as MockAuthGuardService } from './shared/auth/auth-guard.mock.service';
import { DisplayService } from './shared/display/display.service';
import { OnlineGuardService } from './shared/sync/online-guard.service';
import { SyncService } from './shared/sync/sync.service';
import { StorageService } from './shared/storage/storage.service';
import { DownloadsComponent } from './pages/downloads/downloads.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        ProfileComponent,
        LogoComponent,
        ModalComponent,
        DownloadsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: true,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
        DisplayService,
        OnlineGuardService,
        SyncService,
        StorageService,
        (environment.mock_http ? { provide: AuthService, useClass: MockAuthService } : AuthService),
        (environment.mock_http ? { provide: UserService, useClass: MockUserService } : UserService),
        (environment.deactivate_auth_guard ? { provide: AuthGuardService, useClass: MockAuthGuardService } : AuthGuardService),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
