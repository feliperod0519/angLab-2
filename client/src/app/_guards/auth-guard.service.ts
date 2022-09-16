import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../_models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private jwtHelper:JwtHelperService, private router:Router) { }

  canActivate(){
    let jwtUser= localStorage.getItem("jwtUser");
    console.log(JSON.stringify(jwtUser));
    if (jwtUser && !this.jwtHelper.isTokenExpired(jwtUser))
    {
      return true;
    }
    this.router.navigate(["app-home"]);
    return false;
  }
}
