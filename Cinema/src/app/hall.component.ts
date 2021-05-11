import { Component } from '@angular/core';

import { SeatsData, TicketsDatasource } from './tickets.datasource';

@Component({
  moduleId: module.id,
  selector: 'hall',
  templateUrl: 'hall.component.html',
  styleUrls: ['hall.component.css']
})
export class HallComponent {

  constructor(private datasource:TicketsDatasource) {
  }

  getName():string {
    return this.datasource.getName();
  };

  getSeats():SeatsData {
    return this.datasource.getSeats();
  };

}
