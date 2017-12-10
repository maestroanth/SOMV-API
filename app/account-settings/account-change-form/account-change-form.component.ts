import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { APIAccountsService } from '../../api-accounts.service';
import { Router, NavigationExtras } from '@angular/router';
//import { SageAcc } from './hero';

@Component({
    selector: 'app-account-change-form',
    templateUrl: './account-change-form.component.html',
    styleUrls: ['./account-change-form.component.css']
})
export class AccountChangeFormComponent implements OnInit {

    public myForm: FormGroup; // our form model
    constructor(private _fb: FormBuilder, private apiAccountsService: APIAccountsService, private router: Router) { }
    incCaption;
    input;
    sage;
    response;
    spinToggle = false;
    ngOnInit() {
        this.myForm = new FormGroup({
            whateverField: new FormControl()
        });
    }

    @Input()
    subForm = {
        caption: null,
        showForm: false,
        requestType: '2'
    }


    public update() {
        this.response = "Revolving the Multiverse around you to customize your needs......";
        this.spinToggle = true;
        this.sage = this.apiAccountsService.updateAccount(this.subForm.requestType, this.input);
        let oldInput = localStorage.getItem(this.subForm.requestType);
        this.sage.subscribe((data) => {
            //setNewData in Local Storage
            
            //console.log("data: " + JSON.stringify(this.sage));
            if (this.subForm.requestType == 'password') {
                this.response = "Good News! Multiverse successfully revolved to your needs! (Password sucessfully changed. Please login again.)"
                this.spinToggle = false;
                setTimeout(() => {//timeout to allow user see the message before navigating

                    this.router.navigate(['login']);
                    
                }, 3000);
            }
            else {
                localStorage.setItem(this.subForm.requestType, data['data'][this.subForm.requestType]);
                this.response = "Good News! The Multiverse successfully revolved itself to your needs! Here's the update: Old --- " + oldInput + " New --- " + localStorage.getItem(this.subForm.requestType);
                this.spinToggle = false;
            }
        });
    }

}
