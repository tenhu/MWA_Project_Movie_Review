import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MWAAngular';

  constructor(private http:HttpClient){}
  testapi(){
    this.http.get('<api>user/gettest').toPromise().then((data)=>{
      console.log(data);
    })
  }
}
