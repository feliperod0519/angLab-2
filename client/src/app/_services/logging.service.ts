import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../_models/Log';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  logSuccess(entry:Log):Observable<any>{
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post(this.baseUrl + "/log/logentry",entry,httpHeaders);
  }
}
