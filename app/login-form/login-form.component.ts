import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { SageAccount } from '../sage-account';
import { APIAccountsService } from '../api-accounts.service';
import { APIClientAuthService } from '../api-client-auth-service';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { SageUserService } from '../sage-user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [JsonPipe],
})
export class LoginFormComponent implements OnInit {

    constructor(private jsonPipe: JsonPipe, private apiAccountsService: APIAccountsService, private apiClientAuthService: APIClientAuthService,
        private router: Router, private sageUserService: SageUserService) {

    }
    

    ngOnInit() {
        this.subscription = this.apiAccountsService.getError().subscribe(incomingError => {
            this.error = "Incorrect Login";
            this.response = "Please Try Again.";
            this.spinToggle = false;
        })
  }

  subscription = new Subscription;
  title = "Login to Sage Account";
  sagename = null;
  password = null;
  response = null;
  spinToggle = false;
  apiLoginToken;//api password token
  responseData;
  error;
  userSageInfo;
  sage = new SageAccount;

  /**********************************************************************************************************************************
  /* TIP: Remember when you get the password credential, the response token WILL BE tied to the user and not just the app client in general!
  ************************************************************************************************************************************/
  loginToAccount() {
      this.response = "Finding your way to the Multiverse......";
      this.spinToggle = true;
      this.apiAccountsService.login(this.sagename, this.password);
  }


    test() {
        //this.sage['sagename'] = 'BOB';
        //this.sageUserService.sendSage(this.sage);
    }
}
