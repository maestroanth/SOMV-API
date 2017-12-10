import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Tally } from '../tally';
import { Universe } from '../../universe';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Rx";
import { Stage2FormComponent } from "./stage-2-form/stage-2-form.component";

@Component({
  selector: 'app-stage-1-form',
  templateUrl: './stage-1-form.component.html',
  styleUrls: ['./stage-1-form.component.css']
})
export class Stage1FormComponent {

  constructor(private _fb: FormBuilder, private router: Router) { }
  response;
  spinToggle = false;
  percentages = new Array<number>();
  maxTweaks = 10;
  lastTweak = 0;
  tweakMessage = '';
  tweakMessage2 = '';
  tweakMessage3 = '';
  submitToggle = true;
  rollToggle = false;
  //crap for the html binding
  showTweakForm = false;
  universe1Name;
  universe2Name;
  universe3Name;
  universe1Percent;
  universe2Percent;
  universe3Percent;
  num;
  result;

  @Input()
  stage1Form = {
      showForm: false,
      tallyList: Array<Tally>(),
      topUniverses: new Array<Universe>(),
      cost: 5,
      faultyUniverse: 0,
      availableEnergy: 5,
      showCostFaulty: true,
      birthURL: "",
  }

  @ViewChild(Stage2FormComponent) stage2: Stage2FormComponent;//allows parent to see all child component crap; only other way is to use 'services' btw

  stage2Form = {
      showForm: false,
      rolledUniverse: new Universe,
      cost: this.stage1Form.cost,
      faultyUniverse: this.stage1Form.faultyUniverse,
      availableEnergy: this.stage1Form.availableEnergy,
      showCostFaulty: true,
      birthURL: "",
  }

  showRange() {

  }

  roll() {
      this.rollToggle = true;
      this.submitToggle = false;
      this.result = Math.floor(Math.random() * 100) + 1;

      console.log("YOU ROLLED: " + this.result);
      console.log("Percent 1: " + this.universe1Percent);
      console.log("Percent 2: " + this.universe2Percent);
      console.log("Percent 3: " + this.universe3Percent);
      console.log("You get Universe 1 if you roll between 0 and " + this.universe1Percent + "%");
      this.num = 100 - this.universe3Percent;
      console.log("You get Universe 2 if you roll between " + this.universe1Percent + " and " + this.num + "%");

      console.log("You get Universe 3 if you roll between " + this.num + " and 100%");
      console.log("Universe 1 is: " + this.stage1Form.topUniverses[0].name);
      console.log("Universe 2 is: " + this.stage1Form.topUniverses[1].name);
      console.log("Universe 3 is: " + this.stage1Form.topUniverses[2].name);

      if (this.result > 0 && this.result < this.universe1Percent) {
          this.stage2Form.rolledUniverse = this.stage1Form.topUniverses[0];
      } 
      if (this.result >= this.universe1Percent && this.result < this.num)  {
          this.stage2Form.rolledUniverse = this.stage1Form.topUniverses[1];
          
      }
      if (this.result >= this.num && this.result < 101) {
          this.stage2Form.rolledUniverse = this.stage1Form.topUniverses[2];
          
      }

      this.tweakMessage = "You rolled a " + this.result + "%!";
      this.tweakMessage2 = "Congratulations, my lord, you created the following Universe!";
      this.tweakMessage3 = "\"" + this.stage2Form.rolledUniverse.name + "\"" + " Rarity: " + this.stage2Form.rolledUniverse.Rarity; 

      //proceed to stage 2....
  }

  submit() {

      this.stage2Form.birthURL = this.stage1Form.birthURL;
      this.stage2Form.showCostFaulty = this.stage1Form.showCostFaulty;
      this.stage2.initialize();
      
      this.stage1Form.showForm = false;
      this.stage2Form.showForm = true;
      //proceed to stage 2....
  }

  
    //This Function Also Initializes
  tallyToPercent() {
    this.response = '';

    let total = 1;

    for (let m = 0; m < this.stage1Form.topUniverses.length; m++) {
        this.percentages[m] = this.stage1Form.tallyList[m]['tally'] / 1000;
        total = total - this.percentages[m];
        console.log("total: " + total);
    }


    //equalize percents
    if (total < 0) {
        while (total < 0) {
            for (let n = 0; n < this.percentages.length; n++) {
                console.log("Tally: " + this.stage1Form.tallyList[n]['tally']);
                console.log("Converted Percent: " + this.percentages[n]);
                this.percentages[n] = this.percentages[n] - .001
                total = total + .001;
            };
        }
    }


    if (total > 0) {
        while (total > 0) {
            for (let o = 0; o < this.percentages.length; o++) {
                this.percentages[o] = this.percentages[o] + .001
                total = total - .001;
            };
        }
    }

    //adjusting if total percent is not 100%
    let totalPercent = 0;

    //cutting off rounding decimals
    for (let p = 0; p < this.percentages.length; p++) {
        this.percentages[p] = Math.round(this.percentages[p] * 100);
        console.log("CONVERTED PERCENTS: " + this.percentages[p]);
                
    }

    //check if it totals to 100%
    for (let r = 0; r < this.percentages.length; r++) {
        totalPercent = totalPercent + this.percentages[r];
        console.log("TOTAL PERCENT: " + totalPercent);
    }
    
    let s = 0;
    if (totalPercent > 100) {
        while (totalPercent > 100) {
            this.percentages[s] = this.percentages[s] - 1
            totalPercent = totalPercent - 1;
            console.log("TOTAL PERCENT FROM TOO HIGH!: " + totalPercent);
            s++;
            if (s > 2) {
                s = 0;
            }
        }
    }

    let t = 0;
    if (totalPercent < 100) {
        while (totalPercent < 100) {
            this.percentages[t] = this.percentages[t] + 1
            totalPercent = totalPercent + 1;
            console.log("TOTAL PERCENT FROM TOO LOW!: " + totalPercent);
            t++;
            if (t > 2) {
                t = 0;
            }
        }
    }

    //set universes
    this.universe1Name = this.stage1Form.topUniverses[0]['name'];
    this.universe2Name = this.stage1Form.topUniverses[1]['name'];
    this.universe3Name = this.stage1Form.topUniverses[2]['name'];
    this.universe1Percent = this.percentages[0];
    this.universe2Percent = this.percentages[1];
    this.universe3Percent = this.percentages[2];
    this.num = 100 - this.universe3Percent;
    this.stage2Form.availableEnergy = this.stage1Form.availableEnergy;
    this.stage2Form.faultyUniverse = this.stage1Form.faultyUniverse;

    //show
    this.stage1Form.showForm = true;
    for (let q = 0; q < this.stage1Form.topUniverses.length; q++) {
        console.log("Universe ID: " + this.stage1Form.topUniverses[q]['id']);
        console.log("Name: " + this.stage1Form.topUniverses[q]['name']);
        this.response = this.response + " #" + (q+1) + " Name: " + this.stage1Form.topUniverses[q]['name'] +
            " -> Chance of Occuring: " + this.percentages[q] + '% | ';
        console.log("Final Percent: " + this.percentages[q]);
    }


    
  }

  increase(which){
      let incrementUp = 2;
      let incrementDown = 1;


      if (this.stage2Form.cost + 1 < this.stage2Form.availableEnergy) {
          //don't need to do faulty Universe check since the tweaks make it impossible to exceed 99%
          //if user switches button reset all percentages

          if (which != this.lastTweak) {
              this.reset();
              this.lastTweak = which;
              this.tweakMessage = '';
          }
          this.maxTweaks--;
          if (this.maxTweaks >= 0) {
              this.tweakMessage = '';
              if (which == 1) {
                  if (this.universe2Percent >= 0 && this.universe3Percent >= 0) {
                      this.universe1Percent = this.universe1Percent + incrementUp;
                      this.universe2Percent = this.universe2Percent - incrementDown;
                      this.universe3Percent = this.universe3Percent - incrementDown;
                      this.num = 100 - this.universe3Percent;
                  }
                  else {
                      this.tweakMessage = 'The Multiverse says to you, "Dear Sage, the laws of the Multiverse do not let me adjust your chances to negative probability..."';

                  }
              }

              if (which == 2) {
                  if (this.universe1Percent >= 0 && this.universe3Percent >= 0) {
                      this.universe1Percent = this.universe1Percent - incrementDown;
                      this.universe2Percent = this.universe2Percent + incrementUp;
                      this.universe3Percent = this.universe3Percent - incrementDown;
                      this.num = 100 - this.universe3Percent;
                  }
                  else {
                      this.tweakMessage = 'The Multiverse says to you, "Dear Sage, the laws of the Multiverse do not let me adjust your chances to negative probability..."';

                  }
              }

              if (which == 3) {
                  if (this.universe1Percent >= 0 && this.universe2Percent >= 0) {
                      this.universe1Percent = this.universe1Percent - incrementDown;
                      this.universe2Percent = this.universe2Percent - incrementDown;
                      this.universe3Percent = this.universe3Percent + incrementUp;
                      this.num = 100 - this.universe3Percent;
                  }
                  else {
                      this.tweakMessage = 'The Multiverse says to you, "Dear Sage, the laws of the Multiverse do not let me adjust your chances to negative probability..."';

                  }
              }
              this.stage2Form.cost = this.stage2Form.cost + 1;
              this.stage2Form.faultyUniverse = this.stage2Form.cost / 2;
          }
          else {
              this.maxTweaks = 0;
              this.tweakMessage = 'The Multiverse says to you, "Dear Sage, the laws of the Multiverse do not let me adjust your chances any further!"';

          }
      }
      else {
          this.tweakMessage = 'The Multiverse says to you, "Dear Sage, I apologize, but it looks like you do not have the Energy required to tweak the odds for this Universe any further!"';
      }
   
  }
  reset() {
      this.universe1Percent = this.percentages[0];
      this.universe2Percent = this.percentages[1];
      this.universe3Percent = this.percentages[2];
      this.num = 100 - this.universe3Percent;
      this.stage2Form.cost = 5;
      this.stage2Form.faultyUniverse = 0;
      this.maxTweaks = 10;
  }
}
