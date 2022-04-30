import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './shared/auth.service';
import { AuthService as MockAuthService } from './shared/auth.mock.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
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
        (environment.mock_http ?  {provide: AuthService, useClass: MockAuthService} : AuthService),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
