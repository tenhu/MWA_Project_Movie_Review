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

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    if(this.currentRate > 0)
    {
      this.myRate = this.currentRate;

      this.showmyRate = true;
    }
  }
  stars = new Array(10);
    
  myindex = 1;


@Input() views:String;
@Input() avgRate:String;
@Output() rateChange = new EventEmitter();


myRate=0;



constructor() {}
  ngOnInit() {

  }

  clicked2(event:Event) {
    
    console.log("left")
    this.myindex = 1;
    this.showmyRate = false

    this.rateUs = false;


  }

  clicked(index) {
    
    this.myindex = index+1;
      }

  clickedstar(index) {
      
this.myindex = index+1
this.rateChange.emit(this.myindex)
this.showmyRate = true

    this.rateUs = false;

  }
  
 

  handleClick(event: Event) {
  this.rateUs = true;
  this.showmyRate = false


  }
}
