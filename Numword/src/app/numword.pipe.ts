import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name:"numword",
  pure:true,
})
export class NumwordsPipe implements PipeTransform {

  transform(num:number,wordsarr:string[]):string {
    var dd=num%100;
    if ( (dd>=11) && (dd<=19) )
        return wordsarr[2];
    var d=num%10;
    if ( d==1 )
        return wordsarr[0];
    if ( (d>=2) && (d<=4) )
        return wordsarr[1];
    return wordsarr[2];
  }

}