import { Component, ViewChild } from '@angular/core'; 
import { NgForm} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})
export class MainComponent {

  private applesWordforms:string[]=['яблоко','яблока','яблок'];

  isNumber(v):boolean { 
    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(v))
    {return true};
    return false}; 

  getAppleswordforms():string[] {
    return this.applesWordforms;
  };

}
