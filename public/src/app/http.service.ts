import { Injectable } from '@angular/core';
import { Http } from '@angular/http'


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:Http) { }

  login(user){
    return this._http.post('/api/login',user)
  }

  signUp(user){
    return this._http.post('/api/signUp',user)
  }
}
