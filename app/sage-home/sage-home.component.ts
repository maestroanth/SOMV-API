import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { SageUserService } from '../sage-user.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { SageAccount } from '../sage-account';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-sage-home',
    templateUrl: './sage-home.component.html',
    styleUrls: ['./sage-home.component.css'],
    /*IMPORTANT TIP: IF YOU WANT A SHARED SERVICE BETWEEN COMPONENTS, DO NOT ADD IT AS A PROVIDER OR IT STREAMS IT FOR JUST ONE OR THE OTHER*/
})

/*In Angular it looks like data is transmitted through components completely async with subscriptions, so
read http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject and do it this way.
Annoying than a simple value pass, but far more powerful hopefully!*/

export class SageHomeComponent implements OnInit {

    sage = {
        id: null,
        sagename: null,
        password: null,
        realname: null,
        email: null,
        created_at: null,
        updated_at: null
    }
    isValid = false;
    subscription = new Subscription;

    response = null;

    constructor(private sageUserService: SageUserService, private router: Router) {
    }

    ngOnInit() {

        if (parseInt(localStorage.getItem('Sage_Created')) == 0) {/*Toggles whether to show create Sage button or View Sage Button*/
            this.buttonToggle = true;
        }
        else {
            this.buttonToggle = false;

        };
        console.log(this.buttonToggle);
        console.log("Sage created: " + JSON.stringify(localStorage.getItem('Sage_Created')));
        this.title = 'Welcome Sage ' + localStorage.getItem('sagename') + ', to the Multiverse!';//this still throws false console error for some reason
    }

    buttonToggle;
    title = 'Loading...';


    test() {
       //
    }

    navigateToSettings() {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') + '/settings']);
    }
    navigateToUniverseGenerator() {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') + '/universe-generator']);
    }
    navigateToSageCreation() {
        console.log("Current Auth Token: " + localStorage.getItem['access_token']);
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') + '/sage-creation']);
    }
    navigateToSageProfile() {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') + '/sage-profile']);
    }

    navigateToCardCollection() {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') + '/card-collection']);
    }
}
