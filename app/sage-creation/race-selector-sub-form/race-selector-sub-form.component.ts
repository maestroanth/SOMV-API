import { Component, OnInit } from '@angular/core';
import { Race } from '../../race';
import { Sage } from '../../sage';
import { Tooltip } from '../../tooltip';
import { environment } from '../../../environments/environment';
import { SageCreationService } from '../sage-creation.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationExtras } from '@angular/router';
import { NgStyle } from '@angular/common';
import { SageUserService } from '../../sage-user.service';

@Component({
  selector: 'app-race-selector-sub-form',
  templateUrl: './race-selector-sub-form.component.html',
  styleUrls: ['./race-selector-sub-form.component.css'],

})


export class RaceSelectorSubFormComponent implements OnInit {

    constructor(private sageUserService: SageUserService, private sageCreationService: SageCreationService, private router: Router, public race: Race, private tooltip: Tooltip) {

        this.race.race_name = "Loading Race...";
        this.spinToggle2 = true;
        this.subscription = this.sageUserService.getRaceInfo(environment.minRaceID).subscribe(incomingRace => {
            this.race = incomingRace;

            this.minRaceIntuition = parseInt(this.race.base_intuition);
            this.minRaceIngenuity = parseInt(this.race.base_ingenuity);
            this.minRaceInquisitiveness = parseInt(this.race.base_inquisition);
            this.minRaceIntelligence = parseInt(this.race.base_intelligence);
            this.minRaceInvigoration = parseInt(this.race.base_invigoration);
            this.minRaceInsanityControl = parseInt(this.race.base_insanity_control);
            this.maxBonusPoints = parseInt(this.race.bonus_points_at_creation);
            this.imageURL = environment.baseImagePath + this.race.image_1;

            this.spinToggle2 = false;
           // this.isLocked = this.race.is_locked;

        });

        this.subscription2 = this.sageUserService.getTooltipInfo().subscribe(incomingTip => {
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
    subscription = new Subscription;
    subscription2 = new Subscription;

    minRaceIntuition;
    minRaceIngenuity;
    minRaceInquisitiveness;
    minRaceIntelligence;
    minRaceInvigoration;
    minRaceInsanityControl;
    maxBonusPoints;

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

  isValid = false;
  title = "Choose Your Race";
  subTitle = "Primary Attributes";
  subTitle2 = "Approximate 3D Image Representation";
  attributeDescription = "Physical attributes we value such as strength and dexterity are not attributes relevant to a Sage of the Multiverse.  However, the six most important attributes that do matter to a Sage's character while transversing the Multiverse are the six \"In\'s\": Intuition, Inquisitiveness, Ingenuity, Invigoration, Intelligence, and finally the ability to not go Insane from the phenomena! Hover your cursor below (or hold your thumb over) the attribute and read the tooltip for a more complete in-game description.";
  imageDescription = "The Multiverse says to you, \"My Dear Lord, since you are just a lowly human mortal living in only 4-dimensions, most of these pictures I now show you are just very poor approximations of what these 5 dimensional races would look like in your primitive 4 dimensionality (Well, 3 not counting time, and 2 since you are most likely viewing this from a \"flat\" screen). Since I'm working against this significant handicap, I've added my own adjustments to help you relate to these pictures easier: I've re-shapened most of these Sages into a humanoid shape. Just remember, humanoid is not the true shape of most of these Sages.  Irregardless, you need to find an image that you would like to represent your presence in the Multiverse.\"";
  raceID;
  imageURL;
  response;
  sage = new Sage;
  spinToggle = false;
  spinToggle2 = false;
 // isLocked;
  
  maxRaceID = environment.maxRaceID;
  minRaceID = environment.minRaceID;
  currentRaceID = environment.minRaceID;
  whichImage = 1;

  ngOnInit() {
  }

  public nextRace() {
 
          let currentRaceID = this.currentRaceID + 1;

          //1. If the counter exceeds the max ID there is reset it to minID.
          if (currentRaceID > this.maxRaceID) {
              this.currentRaceID = this.minRaceID;
          }
          else {
              this.currentRaceID = this.currentRaceID + 1
          }

          this.switchRace();
  }


  public previousRace() {
      let currentRaceID = this.currentRaceID - 1;
      //console.log("Current RaceID: " + JSON.stringify(currentRaceID));
      //1. If the counter exceeds the min ID there is reset it to maxID.
      if (currentRaceID < this.minRaceID) {
          this.currentRaceID = this.maxRaceID;
      }
      else {
          this.currentRaceID = this.currentRaceID - 1
      }
      this.switchRace();

  }


  public switchRace() {
      this.spinToggle2 = true;
      console.log("RaceID: " + JSON.stringify(this.currentRaceID));//need to subscribe HERE to show this
      this.subscription = this.sageUserService.getRaceInfo(this.currentRaceID).subscribe(incomingRace => {
          this.race = incomingRace;
          this.minRaceIntuition = parseInt(this.race.base_intuition);
          this.minRaceIngenuity = parseInt(this.race.base_ingenuity);
          this.minRaceInquisitiveness = parseInt(this.race.base_inquisition);
          this.minRaceIntelligence = parseInt(this.race.base_intelligence);
          this.minRaceInvigoration = parseInt(this.race.base_invigoration);
          this.minRaceInsanityControl = parseInt(this.race.base_insanity_control);
          this.maxBonusPoints = parseInt(this.race.bonus_points_at_creation);

          this.imageURL = environment.baseImagePath + this.race.image_1;
          this.whichImage = 1;
          this.spinToggle2 = false;
          this.checkEnable();
      })
  }

  public increaseStat(whichStat) {
      let bonusPoints = parseInt(this.race.bonus_points_at_creation);
      let intuition = parseInt(this.race.base_intuition); 
      let ingenuity = parseInt(this.race.base_ingenuity);
      let inquisitiveness = parseInt(this.race.base_inquisition); 
      let intelligence = parseInt(this.race.base_intelligence); 
      let invigoration = parseInt(this.race.base_invigoration);
      let insanityControl = parseInt(this.race.base_insanity_control); 

      if (whichStat == 'intuitionUp' && bonusPoints > 0) {
          intuition = intuition + 1;
          bonusPoints = bonusPoints - 1;
          this.race.base_intuition = JSON.stringify(intuition);
          this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);

      }

      if (whichStat == 'ingenuityUp' && bonusPoints > 0) {
          ingenuity = ingenuity + 1;
          bonusPoints = bonusPoints - 1;
          this.race.base_ingenuity = JSON.stringify(ingenuity);
          this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
      }

      if (whichStat == 'inquisitivenessUp' && bonusPoints > 0) {
          inquisitiveness = inquisitiveness + 1;
          bonusPoints = bonusPoints - 1;
          this.race.base_inquisition = JSON.stringify(inquisitiveness);
          this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
      }

      if (whichStat == 'intelligenceUp' && bonusPoints > 0) {
          intelligence = intelligence + 1;
          bonusPoints = bonusPoints - 1;
          this.race.base_intelligence = JSON.stringify(intelligence);
          this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
      }

      if (whichStat == 'invigorationUp' && bonusPoints > 0) {
          invigoration = invigoration + 1;
          bonusPoints = bonusPoints - 1;
          this.race.base_invigoration = JSON.stringify(invigoration);
          this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
      }

      if (whichStat == 'insanityControlUp' && bonusPoints > 0) {
          insanityControl = insanityControl + 1;
          bonusPoints = bonusPoints - 1;
          this.race.base_insanity_control = JSON.stringify(insanityControl);
          this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
      }
      this.checkEnable();
  }


  public decreaseStat(whichStat) {
      let bonusPoints = parseInt(this.race.bonus_points_at_creation);
      let intuition = parseInt(this.race.base_intuition);
      let ingenuity = parseInt(this.race.base_ingenuity);
      let inquisitiveness = parseInt(this.race.base_inquisition);
      let intelligence = parseInt(this.race.base_intelligence);
      let invigoration = parseInt(this.race.base_invigoration);
      let insanityControl = parseInt(this.race.base_insanity_control); 

      if (whichStat == 'intuitionDown' && bonusPoints < this.maxBonusPoints && intuition > this.minRaceIntuition) {
          intuition = intuition - 1;
          bonusPoints = bonusPoints + 1;
          this.race.base_intuition = JSON.stringify(intuition);
          this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
      }

      if (whichStat == 'ingenuityDown' && bonusPoints < this.maxBonusPoints && ingenuity > this.minRaceIngenuity) {
          ingenuity = ingenuity - 1;
          bonusPoints = bonusPoints + 1;
          this.race.base_ingenuity = JSON.stringify(ingenuity);
          this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
      }

      if (whichStat == 'inquisitivenessDown' && bonusPoints < this.maxBonusPoints && inquisitiveness > this.minRaceInquisitiveness) {
          inquisitiveness = inquisitiveness - 1;
          bonusPoints = bonusPoints + 1;
          this.race.base_inquisition = JSON.stringify(inquisitiveness);
          this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
      }

      if (whichStat == 'intelligenceDown' && bonusPoints < this.maxBonusPoints && intelligence > this.minRaceIntelligence) {
          intelligence = intelligence - 1;
          bonusPoints = bonusPoints + 1;
          this.race.base_intelligence = JSON.stringify(intelligence);
          this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
      }

      if (whichStat == 'invigorationDown' && bonusPoints < this.maxBonusPoints && invigoration > this.minRaceInvigoration) {
          invigoration = invigoration - 1;
          bonusPoints = bonusPoints + 1;
          this.race.base_invigoration = JSON.stringify(invigoration);
          this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
      }

      if (whichStat == 'insanityControlDown' && bonusPoints < this.maxBonusPoints && insanityControl > this.minRaceInsanityControl) {
          insanityControl = insanityControl - 1;
          bonusPoints = bonusPoints + 1;
          this.race.base_insanity_control = JSON.stringify(insanityControl);
          this.race.bonus_points_at_creation = JSON.stringify(bonusPoints);
       
      }
      this.checkEnable();
  }
  
  public nextImage() {
      this.whichImage++
      if (this.whichImage > environment.maxImagesPerRace) {
          this.whichImage = 1;
      }

      if (this.whichImage == 1) {
          this.imageURL = environment.baseImagePath + this.race.image_1;
      }
      if (this.whichImage == 2) {
          this.imageURL = environment.baseImagePath + this.race.image_2;
      }
      if (this.whichImage == 3) {
          this.imageURL = environment.baseImagePath + this.race.image_3;
      }
  }


  public previousImage() {
      this.whichImage--
      if (this.whichImage < 1) {
          this.whichImage = 3;
      }

      if (this.whichImage == 1) {
          this.imageURL = environment.baseImagePath + this.race.image_1;
      }
      if (this.whichImage == 2) {
          this.imageURL = environment.baseImagePath + this.race.image_2;
      }
      if (this.whichImage == 3) {
          this.imageURL = environment.baseImagePath + this.race.image_3;
      }

  }

  public confirm() {

      this.response = "Creating a New Sage...";
      this.spinToggle= true;
      //1. Set sage variable
      this.sage.FK_Race = this.race.id;
      this.sage.Ingenuity = this.race.base_ingenuity;
      this.sage.Inquisitiveness = this.race.base_inquisition;
      this.sage.Insanity_Control = this.race.base_insanity_control;
      this.sage.Intelligence = this.race.base_intelligence;
      this.sage.Intuition = this.race.base_intuition;
      this.sage.Invigoration = this.race.base_invigoration;
      this.sage.Chosen_Image = JSON.stringify(this.whichImage);
      console.log('SageData to be sent off: ' + JSON.stringify(this.sage));

      this.subscription = this.sageCreationService.sendFinalSageInfo(this.sage).subscribe(incomingSage => {
          this.sage = incomingSage;
          this.response = "New Sage Profile Created! Redirecting....";
          this.sageUserService.setLocalSageStorage(this.sage);
          this.back();
      })
      
       ;
     /*
      Stuff needed to submit
      6 primary stats
      Level 1
      Sage_Created 1
      Chosen_Image (the url)
      */
  }

  public checkEnable() {
      console.log('Observing: bonuspointsatcreation' + this.race.bonus_points_at_creation);
      if (parseInt(this.race.bonus_points_at_creation) < 1 && this.race.is_locked != '1') {
          this.isValid = true;
      }
      else {
          this.isValid = false;
      }
  }

  public back() {
      this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]);//has to navigate and THEN trigger the broadcast singleton
  }
}
