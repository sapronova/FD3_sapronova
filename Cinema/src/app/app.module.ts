import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HallComponent } from './hall.component';
import { CashComponent } from './cash.component';
import { TicketsDatasource } from './tickets.datasource';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [
    HallComponent, CashComponent
  ],
  providers: [
    TicketsDatasource,
  ],
  bootstrap: [HallComponent]
})
export class AppModule { }
