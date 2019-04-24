import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
  
})
export class ReviewComponent implements OnInit,OnChanges {
  @Input() currentRate:number;
  rateUs:boolean = false
showmyRate:boolean = false
@Input() views:String;
@Input() avgRate:String;
@Output() rateChange = new EventEmitter();
myindex = 1;
myRate=0;
stars = new Array(10);
  


ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    if(this.currentRate > 0)
    {
      this.myRate = this.currentRate;

      this.showmyRate = true;
    }
  }
  
    
constructor() {}
  ngOnInit() {

  }


  cancelAction(event:Event) {
    
    this.rateChange.emit(1)

    this.showmyRate = false

    this.rateUs = false;


  }

  mouseOverAction(index) {
    
    this.myindex = index+1;
      }

  selectRate(index) {
      
this.myindex = index+1
this.rateChange.emit(this.myindex)
this.showmyRate = true

    this.rateUs = false;

  }
  
 

  clickRateAction(event: Event) {
  this.rateUs = true;
  this.showmyRate = false


  }
}
