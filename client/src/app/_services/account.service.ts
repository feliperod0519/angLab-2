import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppUser } from '../_models/AppUser';
import { environment } from 'src/environments/environment';
import { IUser } from '../_models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  register(model:AppUser):Observable<IUser>{
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<IUser>(this.baseUrl + "/users/registernew",model,httpHeaders);
  }
}
