import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GridComponent} from "./utils/scheduler/grid/grid.component";
import {HandleComponent} from "./utils/scheduler/handle/handle.component";
import {MultisliderComponent} from "./utils/scheduler/multislider/multislider.component";
import {SchedulerComponent} from "./utils/scheduler/scheduler/scheduler.component";
import {SlotComponent} from "./utils/scheduler/slot/slot.component";
import {IntToTimePipe} from "./utils/scheduler/scheduler/int-to-time.pipe";
import {SlotByDayPipe} from "./utils/scheduler/multislider/slot-by-day.pipe";

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    HandleComponent,
    MultisliderComponent,
    SchedulerComponent,
    SlotComponent,
    IntToTimePipe,
    SlotByDayPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
