import { Injectable } from "@angular/core";
 
export type SeatsData = {
  total:number, free:number, occupied:number
}


@Injectable()
export class TicketsDatasource {

  private cinemaName:string='DemoCinema';

  private seatsInfo:Array<{seat:number, reserved:boolean}> = [
    {seat:1, reserved:false},
    {seat:2, reserved:false},
    {seat:3, reserved:false},
    {seat:4, reserved:false},
    {seat:5, reserved:false},
    {seat:6, reserved:false},
    {seat:7, reserved:false},
    {seat:8, reserved:false},
    {seat:9, reserved:false},
    {seat:10, reserved:false},
    {seat:11, reserved:false},
    {seat:12, reserved:false},
    {seat:13, reserved:false},
    {seat:14, reserved:false},
    {seat:15, reserved:false},
  ] 

  private reservedTickets:Array<{seat:number}>=[]; 

  private totalNumber:number=this.seatsInfo.length;

  private freeSeats:number=this.seatsInfo.length;

  private activeCash:string;

  private seats:SeatsData=
    { total:this.totalNumber, free:this.freeSeats, occupied:this.totalNumber-this.freeSeats};

  getSeats():SeatsData {
    return this.seats;
  };

  getName():string {
    return this.cinemaName;
  };

  setSeat(s:number):void {
    let newTicketsforres:Array<{seat:number}>=[];

    for (let i=this.seats.occupied; i<s+this.seats.occupied; i++) {
      this.seatsInfo[i].reserved=true;
      newTicketsforres.push({seat:Number([i+1])});
    };

    this.reservedTickets=newTicketsforres;

    this.freeSeats-=s;
    this.seats.free=this.freeSeats;
    this.seats.occupied=this.totalNumber-this.freeSeats;
  };

  setActivecash(s:string):void {
    this.activeCash=s;
  }

  getReservedTickets(){
    return this.reservedTickets;
  }

  getActivecash(){
    return this.activeCash;
  }

}
