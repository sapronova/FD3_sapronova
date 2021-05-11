import { Component, Input, ViewChild } from '@angular/core';
import { SeatsData, TicketsDatasource } from './tickets.datasource';

@Component({
  moduleId: module.id,
  selector: 'cash',
  templateUrl: 'cash.component.html',
  styleUrls: ['cash.component.css']
})
export class CashComponent {

  @Input("cash-type")
  private cashType:string;

  @ViewChild("qtickets") qticketsRef;

  public caution:string='';

  public falseCaution:string='введите целое число';
  public reservedCaution:string='вы выбрали недоступное количество билетов';

  constructor(private datasource:TicketsDatasource) {
  }

  getCashtype():string {
    return this.cashType;
  }

  setNum(n:string):void {
    if (n.trim()==''||Number(n)==0||!Number.isInteger(Number(n))){
    this.caution=this.falseCaution;
    } 
    else {
      let currNum:SeatsData=this.datasource.getSeats();
      if (currNum.free>=Number(n)) {
        this.datasource.setSeat(Number(n));
        this.datasource.setActivecash(this.cashType);
        this.getReservedtickets();
        this.caution='';
      }
      else {
        this.caution=this.reservedCaution;
      }
    }
  }

  getReservedtickets():Array<{seat:number}> {
    return this.datasource.getReservedTickets();
  }

  getFreeSeatsnum():number {
    return this.datasource.getSeats().free;
  }

  getActivecashtype():string{
    return this.datasource.getActivecash();
  }

}
