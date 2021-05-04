import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BaseComponent } from './base.component';
import { BaseSpriteComponent } from './base-sprite.component';


@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    BaseComponent, BaseSpriteComponent
  ],
  providers: [],
  bootstrap: [BaseComponent]
})
export class AppModule { }
