import { Component, Injectable, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { SageCreationService } from './sage-creation.service';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../environments/environment';
import { Race } from '../race';

@Component({
    selector: 'app-sage-creation',
    templateUrl: './sage-creation.component.html',
    styleUrls: ['./sage-creation.component.css'],
    providers: [Race, SageCreationService]
})


export class SageCreationComponent implements OnInit {
    //all the main form does is the error reporting..
    constructor(private sageCreationService: SageCreationService) {

        }

    subscription = new Subscription;
    title = 'Create Your Multiverse Sage!';
    subTitle = 'Choose Your Race';
    response;
    error;

    ngOnInit() {
        this.subscription = this.sageCreationService.getError().subscribe(incomingError => {
            this.error = "Couldn't Load or Send Race Data.";
            this.response = "Please Make Sure You Are Logged In.";

        })
    }
}
