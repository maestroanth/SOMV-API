import { Component, Injectable, OnInit, ViewChild, Input, Output, EventEmitter, NgModule} from '@angular/core';
import { JsonPipe } from '@angular/common';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../environments/environment';

import { SageUserService } from '../sage-user.service';
import { CardService } from '../card.service';

import { Race } from '../race';
import { Sage } from '../sage';

import { HttpModule, Headers, Http, Response } from '@angular/http';

import { Universe } from '../universe';
import { UniverseCard } from '../universe-card';
import { Force } from '../force';
import { Concept } from '../concept';
import { Move } from '../move';
import { DataTableModule } from 'angular-4-data-table/src/index';
//import { DataTableParams } from '../../types/data-table-params.type';
import { DataTable, DataTableTranslations, DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css'],
  
})



export class CardCollectionComponent implements OnInit {

    constructor(private router: Router, private sageUserService: SageUserService, private cardService: CardService, ) {
    }
    ability1Bonus = "";
    ngOnInit() {
        this.spinToggle = true;
        
        this.subscription = this.cardService.getCardCollection(localStorage.getItem('sage_id')).subscribe(incomingCards => {
            //1. Grab the moves table

            this.cardService.getMovesTable().subscribe(incomingMoves => {
                
                this.cards = incomingCards;
                this.moves = incomingMoves;
                //2. Replace the FK's with the actual move's name 
                //console.log('CARDS: ' + JSON.stringify(this.cards));
                //console.log('MOVES: ' + JSON.stringify(this.moves));
                for (let i = 0; i < this.cards.length; i++) {
                    for (let j = 0; j < this.moves.length; j++) {
                        if (this.cards[i].FK_Move_1 == this.moves[j].id) {
                            //console.log('Found Match Move 1');
                            this.cards[i].FK_Move_1 = this.moves[j].name + ":  Lvl " + this.cards[i].Move1_Buff_Tally;
                        }
                        if (this.cards[i].FK_Move_2 == this.moves[j].id) {
                            //console.log('Found Match Move 2');
                            this.cards[i].FK_Move_2 = this.moves[j].name + ":  Lvl " + this.cards[i].Move2_Buff_Tally;
                        }
                        if (this.cards[i].FK_Move_3 == this.moves[j].id) {
                            //console.log('Found Match Move 3');
                            this.cards[i].FK_Move_3 = this.moves[j].name + ":  Lvl " + this.cards[i].Move3_Buff_Tally;;
                        }
                        if (this.cards[i].FK_Move_4 == this.moves[j].id) {
                            //console.log('Found Match Move 4');
                            this.cards[i].FK_Move_4 = this.moves[j].name + ":  Lvl " + this.cards[i].Move4_Buff_Tally;;
                        }
                        if (this.cards[i].FK_Move_Ultimate == this.moves[j].id) {
                            //console.log('Found Match Move Ultimate');
                            this.cards[i].FK_Move_Ultimate = this.moves[j].name + ":  Lvl " + this.cards[i].MoveUltimate_Buff_Tally;;
                        }
                    }

                }


                this.cardResource = new DataTableResource(this.cards);
                this.cardResource.count().then(count => this.cardCount = count);
                let params = { "sortBy": "name", "sortAsc": false, "offset": 0, "limit": 5 };
                this.cardResource.query(params).then(cards => this.cards = cards);
                this.spinToggle = false;
                this.buttonToggle = false;
                //this.rowDoubleClick.emit({ row: 1, event: event });
                //let event = new MouseEvent('click');
                //this.reloadCards(event);
            })//remember this does ALL error handling for this form
        });
        this.subscription2 = this.sageUserService.getError().subscribe(incomingError => {
            this.error = "Couldn't Load Profile Data." + incomingError;
            this.response = "Please Make Sure You Are Logged In.";
            this.spinToggle = false;

        })//remember this does ALL error handling for this form
    }

    //universeCardCollection: UniverseCard[];
    cards = new Array<UniverseCard>();
    moves = new Array<Move>();
    spinToggle = false;
    buttonToggle = true;
    cardResource = new DataTableResource(this.cards);
    cardCount = 0;
    isValid = false;
    energy = localStorage.getItem('Energy');
    //rowDoubleClick = new EventEmitter<any>();
  
    @ViewChild(DataTable) cardsTable;
    
    reloadCards(params) {
        console.log("my params: " + JSON.stringify(params));
        this.cardResource.query(params).then(cards => this.cards = cards)

    }

    cellColor(car) {
        return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7) / 1.3) * 100)) + ')';
    };

    // special params:

    translations = <DataTableTranslations>{
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'
    };

  subscription = new Subscription;
  subscription2 = new Subscription;
  subscription3 = new Subscription;
  error;
  response;
  cardList;
  title = 'Manage Your Multiverse';
  sub = null;

  public gatherSelected() {
      let selectedCards = new Array<UniverseCard>();
      this.cardsTable.selectedRows.forEach(aRow =>
          selectedCards.push(aRow.item)
      );
      return selectedCards;
  }

  public saveAll() {

  }

 
/********************************************************************************************
Gather all that's selected up into a selected array and pass that in to the delete function
*********************************************************************************************/

  public deleteAll() {
      let selectedCards = this.gatherSelected();
      if (selectedCards.length > 0) {
          this.spinToggle = true;
          this.buttonToggle = true;
          this.response = "Deleting Universes";
          let totalEnergy = null;
          this.sub = this.cardService.destroyCards(selectedCards, localStorage.getItem('sage_id'))
          this.sub.subscribe((energy) => {
              this.ngOnInit();//reload card table
              totalEnergy = parseInt(this.energy) + parseInt(energy);
              this.energy = totalEnergy;

              this.spinToggle = false;
              localStorage.setItem('Energy', totalEnergy.toString());
              this.response = "Universes Successfully Deleted.  Refunded " + energy + " Energy!";
              console.log(JSON.stringify(energy));



          }
              , err => this.sageUserService.sendError(err));
      }
      else {
          this.response = "No cards Selected";
      }
      //refresh table after deletion
 
  }

    //returns move object based on FK
  fkToMoveObject(fk){

  }


  public back() {
      this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]);//has to navigate and THEN trigger the broadcast singleton
  }
}
