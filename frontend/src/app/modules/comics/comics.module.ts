import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComicsRoutingModule } from './comics-routing.module';
import { OverviewComponent } from './pages/overview/overview.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    OverviewComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ComicsRoutingModule
  ]
})
export class ComicsModule { }
