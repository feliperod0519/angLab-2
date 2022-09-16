import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //@Input() currentUserEmail='dummy@gmail.com';
  currentUserEmail:string;
  currentUserEmailToChild:string;

  /*
  login(loginUserEmail:string){
    this.currentUserEmail=loginUserEmail;
    this.currentUserEmailToChild=loginUserEmail;
  }
  */
 
  constructor() { }

  ngOnInit(): void {
  }

}
