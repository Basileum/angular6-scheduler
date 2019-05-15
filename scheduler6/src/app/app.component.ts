import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scheduler6';
  slots = [
    {start: 60, stop: 450, day: 1},
    {start: 585, stop: 1140, day: 1},
    {start: 0, stop: 570, day: 2}
  ];
}
