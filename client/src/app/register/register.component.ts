import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

import { AppUser } from '../_models/AppUser';
import { AccountService } from '../_services/account.service';
import { IUser } from '../_models/IUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  baseUrl = environment.apiUrl;
  eMail: string;
  password: string;
  lastName: string;
  firstName: string;

  constructor(private accountService:AccountService, private http:HttpClient) { }

  ngOnInit(): void {
  }

  register(){
    //console.log(JSON.stringify(this.model));
    const usr:AppUser = { eMail:this.eMail, password:this.password,
                          firstName: this.firstName, lastName:this.lastName,
                          profilePhoto: ""}                     
    this.accountService.register({ eMail:this.eMail, password:this.password,
                                   firstName: this.firstName, lastName:this.lastName,
                                   profilePhoto: ""}).subscribe({
                                                  next:(r)=>{console.log(r)},
                                                  error:(e)=>{console.log(e);}
                                                });
    //const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    
    //this.http.post(this.baseUrl + "/users/registernew",JSON.stringify(this.model),httpHeaders)
    //                .subscribe({next:(r)=>{console.log(r)},error:(e)=>{console.log(e)}});

  }

  cancel(){
    console.log("cancelled")
  }

}
