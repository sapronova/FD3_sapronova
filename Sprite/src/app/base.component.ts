import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'commonsprite',
  templateUrl: 'base.component.html',
  styleUrls: ['base.component.css']
})
export class BaseComponent { 

  private photo:string="http://fe.it-academy.by/Examples/cards2.png"; 

  private offsetX:number=0;
  private offsetY:number=0;
  private width:number=144;
  private height:number=194;
  private spritenum=0;
 
  getPhoto():string {
    return this.photo;
  };

  getOffsetX():number {
    return this.offsetX;
  };

  getOffsetY():number {
    return this.offsetY;
  };

  getHeight():number {
    return this.height;
  };

  getWidth():number {
    return this.width;
  };
  
  setPars():void {
    console.log("recieve click");
    this.spritenum+=1;
    if (this.spritenum%4!=0){
      this.offsetX-=this.width;
    }
    else if (this.spritenum!=56)
    {
      this.offsetX=0;
      this.offsetY-=this.height;
    }
    if (this.spritenum===56) {
      this.offsetX=0;
      this.offsetY=0;
      this.spritenum=1;
    } 
    
  }

}
