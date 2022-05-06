import { Component, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/shared/display/display.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public displayService: DisplayService) { }

  ngOnInit(): void {
  }

}
