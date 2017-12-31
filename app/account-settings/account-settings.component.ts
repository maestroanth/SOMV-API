import { Component, OnInit, HostBinding} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { SageAccount } from '../sage-account';
import { APIAccountsService } from '../api-accounts.service';
import { APIClientAuthService } from '../api-client-auth-service';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SageUserService } from '../sage-user.service';
import { AccountChangeFormComponent } from './account-change-form/account-change-form.component';
import { AccountSettingsService } from './account-settings.service';
//import { slideInDownAnimation } from '../animations';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
  providers: [AccountSettingsService]
  //animations: [slideInDownAnimation]
})
export class AccountSettingsComponent implements OnInit {
    sage = {
        id: null,
        sagename: null,
        password: null,
        realname: null,
        email: null,
        created_at: null,
        updated_at: null,
    }
    subForm = {
        caption: null,
        showForm: false,
        requestType: null,
    }

    subscription = new Subscription;
    subscriptionForm = new Subscription;
    sageNameWarning = null;
    title = 'Loading...';
    subTitle = '';
    constructor(private sageUserService: SageUserService, private accountSettingsService: AccountSettingsService, private router: Router) {

          this.title = 'Dear Sage, ' + localStorage.getItem('sagename') + ':';
          this.subTitle = 'I\'m sorry that the Multiverse doesn\'t quite suit your needs. How may I adjust them?';
          this.subscriptionForm = this.accountSettingsService.getSubForm().subscribe(incomingSubForm => {
            this.subForm = incomingSubForm;
          })
    }


  ngOnInit() {
  }
  public updateSageName() {
      this.subForm.showForm = false;
      this.sageNameWarning = 'In Order To Change Your Sage Name: Please Contact System Admin at https://www.netdoodler.com (then hit contact from the menu)';
      //this.accountSettingsService.sendSubForm(this.subForm, this.sage.sagename);
  }
  public updatePassword() {
      this.subForm.showForm = true;
      this.subForm.requestType = "password";
      this.subForm.caption = 'Change Password';
      this.accountSettingsService.sendSubForm(this.subForm);
  }
  public updateRealName() {
      this.subForm.showForm = true;
      this.subForm.requestType = "realname";
      this.subForm.caption = 'Change Your Real Name (*Disclaimer: This does NOT legally change your real name!)';
      this.accountSettingsService.sendSubForm(this.subForm);
  }
  public updateEmail() {
      this.subForm.showForm = true;
      this.subForm.requestType = "email";
      this.subForm.caption = 'Change Email';
      this.accountSettingsService.sendSubForm(this.subForm);
  }

  public delete() {
      this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') + '/delete']);
  }

  public back() {
      this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]);//has to navigate and THEN trigger the broadcast singleton
  }

}
