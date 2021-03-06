import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { OverviewComponent } from './pages/overview/overview.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { MoviePreviewComponent } from './components/movie-preview/movie-preview.component';
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { WatchComponent } from './pages/watch/watch.component';


@NgModule({
  declarations: [
    OverviewComponent,
    VideoPlayerComponent,
    MoviePreviewComponent,
    DownloadButtonComponent,
    WatchComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
