import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _httpService:HttpService , private _route:Router) { }

  loginUser;
  createUser;


  ngOnInit() {
    this.loginUser={email:"",password:""}
    this.createUser={email:"",password:"",first_name:"",last_name:""}
  }

  login(form){
    if(form){

      console.log("trying to log user: ",this.loginUser)
      let obs = this._httpService.login(this.loginUser)
      obs.subscribe(data =>{
        if(data['status']==200)
        console.log("printing the data",data)
      })


      this.loginUser={email:"",password:""}
    }
    else{"Error loging in"}


  }

  signUp(form){
    if(form){

      console.log("creating user",this.createUser)
      let obs = this._httpService.signUp(this.createUser)
      obs.subscribe(data=>{
        console.log("after signing up",data)
      })
      this.createUser={email:"",password:"",first_name:"",last_name:""}
    }
    else{"Error signUp"}
  }

}
