import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { APIAccountsService } from '../api-accounts.service';

@Component({
  selector: 'app-delete-account-form',
  templateUrl: './delete-account-form.component.html',
  styleUrls: ['./delete-account-form.component.css']
})
export class DeleteAccountFormComponent implements OnInit {

    constructor(private router: Router, private apiAccountsService: APIAccountsService) { }

  ngOnInit() {
  }
  title = '*****Sage Account Deletion*****';
  subTitle = 'Remember these actions cannot be UNDONE!';
  subTitle2 = '*Disclaimer*: Your real-life, AFK existence may have a slight chance of dissipating since you are removing yourself from the MULTIVERSE! SOMV holds no liability for these actions.';
  sage = null;
  sagename = null;
  password = null;
  realname = null;
  error = null;
  response = null;
  spinToggle2 = false;
  public back() {
      this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]);//has to navigate and THEN trigger the broadcast singleton
  }

  confirmDelete() {
      this.response = 'The Multiverse is Erasing Your Existence....';
      this.sage = this.apiAccountsService.deleteAccount(this.sagename, this.password, this.realname);
      this.spinToggle2 = true;
      this.sage.subscribe((data) => {
          //setNewData in Local Storage
          this.spinToggle2 = false;
          this.response = "Good News! You were successfully deleted from the Multiverse! The good news is if you are still reading this, that means you haven't dissipated!(......yet)"
              + "Account Deleted: " + JSON.stringify(data);
          setTimeout(() => {//timeout to allow user see the message before navigating
              this.router.navigate(['welcome']);
          }, 3000);

      },
          err => {
              this.error = "Sorry there was an error in deleting your account. Server Message: " + err.message +
                  ".  Also make sure your fields are EXACTLY as you entered them when you originally created your account!";
              this.spinToggle2 = false;
          }
          );
      
   
  }
}
