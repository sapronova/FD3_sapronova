import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './main.component';
import { NumwordsPipe } from './numword.pipe';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ MainComponent, NumwordsPipe],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
