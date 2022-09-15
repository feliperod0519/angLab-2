import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from "@angular/forms";
import { environment } from 'src/environments/environment';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Output, EventEmitter } from '@angular/core';

import { IUser } from '../_models/IUser';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  baseUrl = environment.apiUrl;
  currentUser = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUser.asObservable();
  loggedIn = false;
  @Output() newAuthenticatedUser = new EventEmitter<string>();

  constructor(private http: HttpClient,
              private router: Router,
              private jwtHelper: JwtHelperService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public login = (form:NgForm)=>{
    const credentials = JSON.stringify(form.value);
    console.log("login1->" + credentials);
    const httpHeaders = new HttpHeaders({"Content-Type":"application/json"});
    this.http.post(this.baseUrl + "/users/login",credentials,{"headers":httpHeaders})
    .subscribe({
                next:(r:IUser)=>{
                                  console.log("login2->",r.email);
                                  if (r)
                                  {
                                    this.setCurrentUser(r);
                                    this.loggedIn =true;
                                    this.newAuthenticatedUser.emit(r.email);
                                    //this.toastr.success("Welcome " + r.email);
                                  }
                                },
                error:(e)=>
                { 
                    console.log(e);
                    this.loggedIn = false;
                }        
              })
  }

  setCurrentUser(jwtUser:IUser){
    localStorage.setItem('jwtUser',JSON.stringify(jwtUser));
    console.log("setCurrentUser->" + jwtUser.email);
    this.currentUser.next(jwtUser);
  }

  public logout = ()=>{
    localStorage.removeItem("jwtUser");
    this.currentUser.next(null);
    this.loggedIn = false;
  }

}
