import { Component, Injectable, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../environments/environment';

import { SageUserService } from '../sage-user.service';
import { Race } from '../race';
import { Sage } from '../sage';
import { Tooltip } from '../tooltip';


@Component({
  selector: 'app-view-sage-profile',
  templateUrl: './view-sage-profile.component.html',
  styleUrls: ['./view-sage-profile.component.css']
})


export class ViewSageProfileComponent implements OnInit {

    constructor(private router: Router, private sageUserService: SageUserService, ) {

        this.title = "Loading Profile....";
        this.spinToggle2 = true;

        
    }

    tooltip = new Tooltip;
    sage = new Sage;
    race = new Race;
    subscription = new Subscription;
    subscription2 = new Subscription;
    subscription3 = new Subscription;
    title;
    subTitle = 'Primary Attributes';
    response = '';
    error = '';
    imageURL;

    tipIntuition;
    tipIntelligence;
    tipIngenuity;
    tipInvigoration;
    tipInsanityControl;
    tipInquisitiveness;
    tipPrimaryAttributes;
    tipEnergy;
    tipDimensionalWake;
    tipBonusPointsAtCreation;
    spinToggle2;


    ngOnInit() {

        this.subscription = this.sageUserService.getError().subscribe(incomingError => {
            this.error = "Couldn't Load Profile Data." + incomingError;
            this.response = "Please Make Sure You Are Logged In.";

        })//remember this does ALL error handling for this form


        console.log("FK_Race " + localStorage.getItem('FK_Race'));

        this.subscription2 = this.sageUserService.getRaceInfo(localStorage.getItem('FK_Race')).subscribe(incomingRace => {
            this.race = incomingRace;
            this.title = 'Multiverse Sage Overview';
            this.spinToggle2 = false;
            this.sage = this.sageUserService.getLocalSageStorage();
            console.log("Have Sage: " + JSON.stringify(this.sage));
            this.race = this.sageUserService.getLocalRaceStorage();
            //console.log("Have Race: " + JSON.stringify(this.raceD));
            this.imageURL = environment.baseImagePath + 'races/' + this.race.race_name.replace(' ', '_') + '_' + this.sage.Chosen_Image + environment.profileImageExtension;//reconstructing image path, other way can be to if statement the race_image variable too if this breaks later on

        })

        this.subscription3 = this.sageUserService.getTooltipInfo().subscribe(incomingTip => {
            this.tooltip = incomingTip;

            this.tipIntuition = this.tooltip[0].description;
            console.log("TIP" + this.tipIntuition);

            this.tipInquisitiveness = this.tooltip[1].description;


            this.tipIntelligence = this.tooltip[2].description;


            this.tipIngenuity = this.tooltip[3].description;


            this.tipInsanityControl = this.tooltip[4].description;


            this.tipInvigoration = this.tooltip[5].description;

            this.tipPrimaryAttributes = this.tooltip[6].description;

            this.tipEnergy = this.tooltip[7].description;

            this.tipDimensionalWake = this.tooltip[8].description;

            this.tipBonusPointsAtCreation = this.tooltip[9].description;

        });

    }


  public back() {
      this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]);//has to navigate and THEN trigger the broadcast singleton
  }
}
