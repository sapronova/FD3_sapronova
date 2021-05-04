import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'base-sprite',
  templateUrl: 'base-sprite.component.html',
  styleUrls: ['base-sprite.component.css']
})
export class BaseSpriteComponent {

    @Input("sprite-img")
    private spriteImg:string;

    @Input("offsheight")
    private height:number;

    @Input("offswidth")
    private width:number; 

    @Input("offsX")
    private offsetX:number; 

    @Input("offsY")
    private offsetY:number; 
 

    @Output("spriteoutput")
    private setNewparamsEE=new EventEmitter<void>();
    
    setNewparams():void {
        this.setNewparamsEE.emit();
      }
    
    getStyle():object {
        
        return {
            'background': `url('${this.spriteImg}') no-repeat `, 
            'backgroundPosition': `${this.offsetX}px ${this.offsetY}px`,
            'width': this.width+'px',
            'height': this.height+'px'
          }
    }

}