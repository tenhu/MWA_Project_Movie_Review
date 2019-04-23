import { Component, OnInit, Input, Output, EventEmitter   } from '@angular/core';

@Component({
    selector: 'app-star',
    template: `
    <div style="display:inline-block">
   

    <img *ngFor="let star of stars ; let i = index" [src]="myindex>i?'assets/star3.png':'assets/star2.png'" (mouseover)="clicked(i)" (click)="clickedstar(i)" style=" height: 20px; width:20px;"/> 
  <span>{{myindex}}</span>

  <img src="assets/cancel.png" (click)="clicked2($event)"  style=" height: 20px; width:20px;"/>

    </div>
  
  `,
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
    stars = new Array(10);
    
    myindex = 1;
      
        @Output() hideRate = new EventEmitter();
        @Output() rateChange = new EventEmitter();
        @Output() showRateNum = new EventEmitter();

        constructor() {
            this.stars[0] = "assets/star3.png"
         }
      ngOnInit() {
        this.rateChange.emit(0);
        this.showRateNum.emit(false);

    
      }
  
      clicked2(event:Event) {
    
        console.log("left")
        this.hideRate.emit(false);
        this.rateChange.emit(0);
        this.myindex = 1;

    
    
      }
      clickedstar(index) {
          
this.rateChange.emit(index+1);
this.hideRate.emit(false);
this.showRateNum.emit(true);

      }

      clicked(index) {
    
    this.myindex = index+1;
      }
      
    }
    
  