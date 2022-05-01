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

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        ProfileComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
        (environment.mock_http ? { provide: AuthService, useClass: MockAuthService } : AuthService),
        (environment.mock_http ? { provide: UserService, useClass: MockUserService } : UserService),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
