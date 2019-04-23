import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
  
})
export class ReviewComponent implements OnInit,OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    if(this.currentRate > 0)
    {
      this.myRate = this.currentRate;

      this.showmyRate = true;
    }
  }

@Input() views:String;
@Input() avgRate:String;
@Input() currentRate:number;


  show: boolean = false;
  showmyRate: boolean = false;
myRate=0;



  constructor() { }
  ngOnInit() {

  }
  
  

  handleClick(event: Event) {
    this.show = true
    this.showmyRate = false


  }
}
