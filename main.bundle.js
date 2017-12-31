webpackJsonp([1,4],{

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SageAccount; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SageAccount = (function () {
    function SageAccount() {
    }
    return SageAccount;
}());
SageAccount = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], SageAccount);

//# sourceMappingURL=sage-account.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__race__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SageCreationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SageCreationService = (function () {
    function SageCreationService(http, router) {
        this.http = http;
        this.router = router;
        this.error = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["Subject"]();
        this.race = new __WEBPACK_IMPORTED_MODULE_8__race__["a" /* Race */];
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Headers */]({
            'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json',
        });
    }
    SageCreationService.prototype.sendError = function (error) {
        console.log("In Sage Creation Service: " + JSON.stringify(error));
        //console.log('sendSage() ' + JSON.stringify(sage));
        this.error.next(error);
    };
    SageCreationService.prototype.clearError = function () {
        this.error.next();
    };
    SageCreationService.prototype.getError = function () {
        //console.log('getSage() ' + JSON.stringify(this.sageSubject.asObservable));
        return this.error.asObservable();
    };
    SageCreationService.prototype.sendFinalSageInfo = function (sageData) {
        var _this = this;
        //1. Get Tooltip Data
        //console.log("Current Auth Token: " + localStorage.getItem('access_token'));
        this.token = localStorage.getItem('access_token');
        this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));
        this.url = __WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].baseAPIUrl + 'api/new-sage/' + localStorage.getItem('sage_id');
        this.response = this.http.post(this.url, JSON.stringify(sageData), { headers: this.headers })
            .map(function (res) { return _this.response = res.json(); }).retryWhen(function (attempts) { return attempts.zip(__WEBPACK_IMPORTED_MODULE_5_rxjs__["Observable"].range(1, 4))
            .flatMap(function (_a) {
            var error = _a[0], i = _a[1];
            if (i > 3) {
                return __WEBPACK_IMPORTED_MODULE_5_rxjs__["Observable"].throw(error.json().error || 'Server error');
            }
            console.log('delay retry by ' + i + ' second(s)');
            return __WEBPACK_IMPORTED_MODULE_5_rxjs__["Observable"].timer(i * 100);
        }); });
        this.response.subscribe(function (data) {
            //console.log('observing Tooltip: ' + JSON.stringify(this.response));
        }, function (err) { return _this.sendError(err); });
        //console.log("Local Race Variable: " + JSON.stringify(this.response));
        return this.response;
    };
    return SageCreationService;
}());
SageCreationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], SageCreationService);

var _a, _b;
//# sourceMappingURL=sage-creation.service.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__universe__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stage_2_form_stage_2_form_component__ = __webpack_require__(159);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Stage1FormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Stage1FormComponent = (function () {
    function Stage1FormComponent(_fb, router) {
        this._fb = _fb;
        this.router = router;
        this.spinToggle = false;
        this.percentages = new Array();
        this.maxTweaks = 10;
        this.lastTweak = 0;
        this.tweakMessage = '';
        this.tweakMessage2 = '';
        this.tweakMessage3 = '';
        this.submitToggle = true;
        this.rollToggle = false;
        //crap for the html binding
        this.showTweakForm = false;
        this.stage1Form = {
            showForm: false,
            tallyList: Array(),
            topUniverses: new Array(),
            cost: 5,
            faultyUniverse: 0,
            availableEnergy: 5,
            showCostFaulty: true,
            birthURL: "",
        };
        this.stage2Form = {
            showForm: false,
            rolledUniverse: new __WEBPACK_IMPORTED_MODULE_3__universe__["a" /* Universe */],
            cost: this.stage1Form.cost,
            faultyUniverse: this.stage1Form.faultyUniverse,
            availableEnergy: this.stage1Form.availableEnergy,
            showCostFaulty: true,
            birthURL: "",
        };
    }
    Stage1FormComponent.prototype.showRange = function () {
    };
    Stage1FormComponent.prototype.roll = function () {
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
        if (this.result >= this.universe1Percent && this.result < this.num) {
            this.stage2Form.rolledUniverse = this.stage1Form.topUniverses[1];
        }
        if (this.result >= this.num && this.result < 101) {
            this.stage2Form.rolledUniverse = this.stage1Form.topUniverses[2];
        }
        this.tweakMessage = "You rolled a " + this.result + "%!";
        this.tweakMessage2 = "Congratulations, my lord, you created the following Universe!";
        this.tweakMessage3 = "\"" + this.stage2Form.rolledUniverse.name + "\"" + " Rarity: " + this.stage2Form.rolledUniverse.Rarity;
        //proceed to stage 2....
    };
    Stage1FormComponent.prototype.submit = function () {
        this.stage2Form.birthURL = this.stage1Form.birthURL;
        this.stage2Form.showCostFaulty = this.stage1Form.showCostFaulty;
        this.stage2.initialize();
        this.stage1Form.showForm = false;
        this.stage2Form.showForm = true;
        //proceed to stage 2....
    };
    //This Function Also Initializes
    Stage1FormComponent.prototype.tallyToPercent = function () {
        this.response = '';
        var total = 1;
        for (var m = 0; m < this.stage1Form.topUniverses.length; m++) {
            this.percentages[m] = this.stage1Form.tallyList[m]['tally'] / 1000;
            total = total - this.percentages[m];
            console.log("total: " + total);
        }
        //equalize percents
        if (total < 0) {
            while (total < 0) {
                for (var n = 0; n < this.percentages.length; n++) {
                    console.log("Tally: " + this.stage1Form.tallyList[n]['tally']);
                    console.log("Converted Percent: " + this.percentages[n]);
                    this.percentages[n] = this.percentages[n] - .001;
                    total = total + .001;
                }
                ;
            }
        }
        if (total > 0) {
            while (total > 0) {
                for (var o = 0; o < this.percentages.length; o++) {
                    this.percentages[o] = this.percentages[o] + .001;
                    total = total - .001;
                }
                ;
            }
        }
        //adjusting if total percent is not 100%
        var totalPercent = 0;
        //cutting off rounding decimals
        for (var p = 0; p < this.percentages.length; p++) {
            this.percentages[p] = Math.round(this.percentages[p] * 100);
            console.log("CONVERTED PERCENTS: " + this.percentages[p]);
        }
        //check if it totals to 100%
        for (var r = 0; r < this.percentages.length; r++) {
            totalPercent = totalPercent + this.percentages[r];
            console.log("TOTAL PERCENT: " + totalPercent);
        }
        var s = 0;
        if (totalPercent > 100) {
            while (totalPercent > 100) {
                this.percentages[s] = this.percentages[s] - 1;
                totalPercent = totalPercent - 1;
                console.log("TOTAL PERCENT FROM TOO HIGH!: " + totalPercent);
                s++;
                if (s > 2) {
                    s = 0;
                }
            }
        }
        var t = 0;
        if (totalPercent < 100) {
            while (totalPercent < 100) {
                this.percentages[t] = this.percentages[t] + 1;
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
        for (var q = 0; q < this.stage1Form.topUniverses.length; q++) {
            console.log("Universe ID: " + this.stage1Form.topUniverses[q]['id']);
            console.log("Name: " + this.stage1Form.topUniverses[q]['name']);
            this.response = this.response + " #" + (q + 1) + " Name: " + this.stage1Form.topUniverses[q]['name'] +
                " -> Chance of Occuring: " + this.percentages[q] + '% | ';
            console.log("Final Percent: " + this.percentages[q]);
        }
    };
    Stage1FormComponent.prototype.increase = function (which) {
        var incrementUp = 2;
        var incrementDown = 1;
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
    };
    Stage1FormComponent.prototype.reset = function () {
        this.universe1Percent = this.percentages[0];
        this.universe2Percent = this.percentages[1];
        this.universe3Percent = this.percentages[2];
        this.num = 100 - this.universe3Percent;
        this.stage2Form.cost = 5;
        this.stage2Form.faultyUniverse = 0;
        this.maxTweaks = 10;
    };
    return Stage1FormComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], Stage1FormComponent.prototype, "stage1Form", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4__stage_2_form_stage_2_form_component__["a" /* Stage2FormComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__stage_2_form_stage_2_form_component__["a" /* Stage2FormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__stage_2_form_stage_2_form_component__["a" /* Stage2FormComponent */]) === "function" && _a || Object)
], Stage1FormComponent.prototype, "stage2", void 0);
Stage1FormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-stage-1-form',
        template: __webpack_require__(460),
        styles: [__webpack_require__(393)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _c || Object])
], Stage1FormComponent);

var _a, _b, _c;
//# sourceMappingURL=stage-1-form.component.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__universe__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__card_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stage_3_form_stage_3_form_component__ = __webpack_require__(160);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Stage2FormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { Tally } from '../tally';



var Stage2FormComponent = (function () {
    function Stage2FormComponent(cardService) {
        this.cardService = cardService;
        this.stage2Form = {
            showForm: false,
            rolledUniverse: new __WEBPACK_IMPORTED_MODULE_1__universe__["a" /* Universe */],
            cost: 5,
            faultyUniverse: 0,
            availableEnergy: 5,
            birthURL: "",
            showCostFaulty: true,
        };
        this.stage3Form = {
            showForm: false,
            rolledUniverse: new __WEBPACK_IMPORTED_MODULE_1__universe__["a" /* Universe */],
            cost: this.stage2Form.cost,
            faultyUniverse: 0,
            availableEnergy: 0,
            spinToggle: false,
            birthURL: "",
            showCostFaulty: true,
        };
        this.blah = "blah";
        this.maxPointsYouCanAdjust = localStorage.getItem('Level');
        this.pointsLeftYouCanAdjust = parseInt(this.maxPointsYouCanAdjust);
        this.submitToggle = false;
        this.randomIncrease = 3; //turn to zero to get rid of random stats. I like to make this larger as the Sage grows in Level
        this.scoldMessage = '';
        this.pointsInPool = 0;
    }
    Stage2FormComponent.prototype.ngOnInit = function () {
    };
    Stage2FormComponent.prototype.submit = function () {
        this.stage3Form.rolledUniverse = this.stage2Form.rolledUniverse;
        this.stage3Form.cost = this.stage2Form.cost;
        this.stage3Form.faultyUniverse = this.stage2Form.faultyUniverse;
        this.stage3Form.spinToggle = true;
        this.stage3Form.birthURL = this.stage2Form.birthURL;
        this.stage3.initialize();
        this.stage2Form.showForm = false;
        this.stage3Form.showForm = true;
        //proceed to stage 3....
    };
    Stage2FormComponent.prototype.initialize = function () {
        this.stage3Form.availableEnergy = this.stage2Form.availableEnergy;
        this.stage3Form.faultyUniverse = this.stage2Form.faultyUniverse;
        this.originalCost = this.stage2Form.cost;
        this.originalfaultyUniverse = this.stage2Form.faultyUniverse;
        this.originalForceStr1 = parseInt(this.stage2Form.rolledUniverse.Force_Str_1) + Math.floor(Math.random() * this.randomIncrease) + 1;
        this.originalForceStr2 = parseInt(this.stage2Form.rolledUniverse.Force_Str_2) + Math.floor(Math.random() * this.randomIncrease) + 1;
        this.originalForceStr3 = parseInt(this.stage2Form.rolledUniverse.Force_Str_3) + Math.floor(Math.random() * this.randomIncrease) + 1;
        this.originalConceptStr1 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_1) + Math.floor(Math.random() * this.randomIncrease) + 1;
        this.originalConceptStr2 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_2) + Math.floor(Math.random() * this.randomIncrease) + 1;
        this.originalConceptStr3 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_3) + Math.floor(Math.random() * this.randomIncrease) + 1;
        this.SoriginalForceStr1 = parseInt(this.stage2Form.rolledUniverse.Force_Str_1);
        this.SoriginalForceStr2 = parseInt(this.stage2Form.rolledUniverse.Force_Str_2);
        this.SoriginalForceStr3 = parseInt(this.stage2Form.rolledUniverse.Force_Str_3);
        this.SoriginalConceptStr1 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_1);
        this.SoriginalConceptStr2 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_2);
        this.SoriginalConceptStr3 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_3);
        this.reset();
    };
    Stage2FormComponent.prototype.reroll = function () {
        if (this.stage2Form.cost + 1 < this.stage2Form.availableEnergy) {
            if (this.originalfaultyUniverse < 89) {
                this.originalCost = this.originalCost + 5;
                this.originalfaultyUniverse = this.originalfaultyUniverse + 10;
                this.originalForceStr1 = this.SoriginalForceStr1 + Math.floor(Math.random() * this.randomIncrease) + 1;
                this.originalForceStr2 = this.SoriginalForceStr2 + Math.floor(Math.random() * this.randomIncrease) + 1;
                this.originalForceStr3 = this.SoriginalForceStr3 + Math.floor(Math.random() * this.randomIncrease) + 1;
                this.originalConceptStr1 = this.SoriginalConceptStr1 + Math.floor(Math.random() * this.randomIncrease) + 1;
                this.originalConceptStr2 = this.SoriginalConceptStr2 + Math.floor(Math.random() * this.randomIncrease) + 1;
                this.originalConceptStr3 = this.SoriginalConceptStr3 + Math.floor(Math.random() * this.randomIncrease) + 1;
                this.reset();
            }
            else {
                this.scoldMessage = 'The Multiverse says to you, "Dear Sage, I apologize, but you cannot reroll anymore; otherwise, you will have a 100% or greater chance of a "Faulty Universe"!!!';
            }
        }
        else {
            this.scoldMessage = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to reroll anymore."';
        }
    };
    Stage2FormComponent.prototype.reset = function () {
        console.log("points left you can adjust reset: " + this.pointsLeftYouCanAdjust);
        this.pointsLeftYouCanAdjust = parseInt(this.maxPointsYouCanAdjust);
        console.log("points left you can adjust reset: " + this.pointsLeftYouCanAdjust);
        this.pointsInPool = 0;
        this.stage2Form.rolledUniverse.Force_Str_1 = this.originalForceStr1;
        this.stage2Form.rolledUniverse.Force_Str_2 = this.originalForceStr2;
        this.stage2Form.rolledUniverse.Force_Str_3 = this.originalForceStr3;
        this.stage2Form.rolledUniverse.Concept_Str_1 = this.originalConceptStr1;
        this.stage2Form.rolledUniverse.Concept_Str_2 = this.originalConceptStr2;
        this.stage2Form.rolledUniverse.Concept_Str_3 = this.originalConceptStr3;
        this.stage2Form.cost = this.originalCost;
        this.stage2Form.faultyUniverse = this.originalfaultyUniverse;
    };
    Stage2FormComponent.prototype.increaseStat = function (whichStat) {
        var Force_Str_1 = parseInt(this.stage2Form.rolledUniverse.Force_Str_1);
        var Force_Str_2 = parseInt(this.stage2Form.rolledUniverse.Force_Str_2);
        var Force_Str_3 = parseInt(this.stage2Form.rolledUniverse.Force_Str_3);
        var Concept_Str_1 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_1);
        var Concept_Str_2 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_2);
        var Concept_Str_3 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_3);
        console.log("originalfaultyUniverse: " + this.originalfaultyUniverse);
        //console.log("stage1Availenergy: " + this.stage1Form.availableEnergy);
        if (this.stage2Form.cost + 5 < this.stage2Form.availableEnergy) {
            if (this.originalfaultyUniverse < 94) {
                if (whichStat == 'Force_Str_1-Up' && this.pointsInPool > 0) {
                    Force_Str_1 = Force_Str_1 + 1;
                    this.stage2Form.rolledUniverse.Force_Str_1 = JSON.stringify(Force_Str_1);
                    this.pointsInPool = this.pointsInPool - 1;
                    this.stage2Form.cost = this.stage2Form.cost + 5;
                    this.stage2Form.faultyUniverse = this.stage2Form.faultyUniverse + 5;
                }
                if (whichStat == 'Force_Str_2-Up' && this.pointsInPool > 0) {
                    Force_Str_2 = Force_Str_2 + 1;
                    this.stage2Form.rolledUniverse.Force_Str_2 = JSON.stringify(Force_Str_2);
                    this.pointsInPool = this.pointsInPool - 1;
                    this.stage2Form.cost = this.stage2Form.cost + 5;
                    this.stage2Form.faultyUniverse = this.stage2Form.faultyUniverse + 5;
                }
                if (whichStat == 'Force_Str_3-Up' && this.pointsInPool > 0) {
                    Force_Str_3 = Force_Str_3 + 1;
                    this.stage2Form.rolledUniverse.Force_Str_3 = JSON.stringify(Force_Str_3);
                    this.pointsInPool = this.pointsInPool - 1;
                    this.stage2Form.cost = this.stage2Form.cost + 5;
                    this.stage2Form.faultyUniverse = this.stage2Form.faultyUniverse + 5;
                }
                if (whichStat == 'Concept_Str_1-Up' && this.pointsInPool > 0) {
                    Concept_Str_1 = Concept_Str_1 + 1;
                    this.stage2Form.rolledUniverse.Concept_Str_1 = JSON.stringify(Concept_Str_1);
                    this.pointsInPool = this.pointsInPool - 1;
                    this.stage2Form.cost = this.stage2Form.cost + 5;
                    this.stage2Form.faultyUniverse = this.stage2Form.faultyUniverse + 5;
                }
                if (whichStat == 'Concept_Str_2-Up' && this.pointsInPool > 0) {
                    Concept_Str_2 = Concept_Str_2 + 1;
                    this.stage2Form.rolledUniverse.Concept_Str_2 = JSON.stringify(Concept_Str_2);
                    this.pointsInPool = this.pointsInPool - 1;
                    this.stage2Form.cost = this.stage2Form.cost + 5;
                    this.stage2Form.faultyUniverse = this.stage2Form.faultyUniverse + 5;
                }
                if (whichStat == 'Concept_Str_3-Up' && this.pointsInPool > 0) {
                    Concept_Str_3 = Concept_Str_3 + 1;
                    this.stage2Form.rolledUniverse.Concept_Str_3 = JSON.stringify(Concept_Str_3);
                    this.pointsInPool = this.pointsInPool - 1;
                    this.stage2Form.cost = this.stage2Form.cost + 5;
                    this.stage2Form.faultyUniverse = this.stage2Form.faultyUniverse + 5;
                }
            }
            else {
                this.scoldMessage = 'The Multiverse says to you, "Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
            }
        }
        else {
            this.scoldMessage = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
        }
    };
    Stage2FormComponent.prototype.decreaseStat = function (whichStat) {
        var Force_Str_1 = parseInt(this.stage2Form.rolledUniverse.Force_Str_1);
        var Force_Str_2 = parseInt(this.stage2Form.rolledUniverse.Force_Str_2);
        var Force_Str_3 = parseInt(this.stage2Form.rolledUniverse.Force_Str_3);
        var Concept_Str_1 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_1);
        var Concept_Str_2 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_2);
        var Concept_Str_3 = parseInt(this.stage2Form.rolledUniverse.Concept_Str_3);
        if (whichStat == 'Force_Str_1-Down' && this.pointsLeftYouCanAdjust > 0 && Force_Str_1 > 0) {
            Force_Str_1 = Force_Str_1 - 1;
            this.pointsLeftYouCanAdjust = this.pointsLeftYouCanAdjust - 1;
            this.stage2Form.rolledUniverse.Force_Str_1 = JSON.stringify(Force_Str_1);
            this.pointsInPool = this.pointsInPool + 1;
        }
        if (whichStat == 'Force_Str_2-Down' && this.pointsLeftYouCanAdjust > 0 && Force_Str_2 > 0) {
            Force_Str_2 = Force_Str_2 - 1;
            this.pointsLeftYouCanAdjust = this.pointsLeftYouCanAdjust - 1;
            this.stage2Form.rolledUniverse.Force_Str_2 = JSON.stringify(Force_Str_2);
            this.pointsInPool = this.pointsInPool + 1;
        }
        if (whichStat == 'Force_Str_3-Down' && this.pointsLeftYouCanAdjust > 0 && Force_Str_3 > 0) {
            Force_Str_3 = Force_Str_3 - 1;
            this.pointsLeftYouCanAdjust = this.pointsLeftYouCanAdjust - 1;
            this.stage2Form.rolledUniverse.Force_Str_3 = JSON.stringify(Force_Str_3);
            this.pointsInPool = this.pointsInPool + 1;
        }
        if (whichStat == 'Concept_Str_1-Down' && this.pointsLeftYouCanAdjust > 0 && Concept_Str_1 > 0) {
            Concept_Str_1 = Concept_Str_1 - 1;
            this.pointsLeftYouCanAdjust = this.pointsLeftYouCanAdjust - 1;
            this.stage2Form.rolledUniverse.Concept_Str_1 = JSON.stringify(Concept_Str_1);
            this.pointsInPool = this.pointsInPool + 1;
        }
        if (whichStat == 'Concept_Str_2-Down' && this.pointsLeftYouCanAdjust > 0 && Concept_Str_2 > 0) {
            Concept_Str_2 = Concept_Str_2 - 1;
            this.pointsLeftYouCanAdjust = this.pointsLeftYouCanAdjust - 1;
            this.stage2Form.rolledUniverse.Concept_Str_2 = JSON.stringify(Concept_Str_2);
            this.pointsInPool = this.pointsInPool + 1;
        }
        if (whichStat == 'Concept_Str_3-Down' && this.pointsLeftYouCanAdjust > 0 && Concept_Str_3 > 0) {
            Concept_Str_3 = Concept_Str_3 - 1;
            this.pointsLeftYouCanAdjust = this.pointsLeftYouCanAdjust - 1;
            this.stage2Form.rolledUniverse.Concept_Str_3 = JSON.stringify(Concept_Str_3);
            this.pointsInPool = this.pointsInPool + 1;
        }
        //this.checkEnable();
    };
    return Stage2FormComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], Stage2FormComponent.prototype, "stage2Form", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3__stage_3_form_stage_3_form_component__["a" /* Stage3FormComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__stage_3_form_stage_3_form_component__["a" /* Stage3FormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__stage_3_form_stage_3_form_component__["a" /* Stage3FormComponent */]) === "function" && _a || Object)
], Stage2FormComponent.prototype, "stage3", void 0);
Stage2FormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-stage-2-form',
        template: __webpack_require__(461),
        styles: [__webpack_require__(394)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__card_service__["a" /* CardService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__card_service__["a" /* CardService */]) === "function" && _b || Object])
], Stage2FormComponent);

var _a, _b;
//# sourceMappingURL=stage-2-form.component.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__universe__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__card_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stage_4_form_stage_4_form_component__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sage_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__move__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__universe_card__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Stage3FormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { Tally } from '../tally';







var Stage3FormComponent = (function () {
    function Stage3FormComponent(cardService, sageUserService) {
        this.cardService = cardService;
        this.sageUserService = sageUserService;
        this.stage3Form = {
            showForm: false,
            rolledUniverse: new __WEBPACK_IMPORTED_MODULE_1__universe__["a" /* Universe */],
            cost: 5,
            faultyUniverse: 0,
            availableEnergy: 5,
            spinToggle: false,
            showCostFaulty: true,
            birthURL: "",
        };
        this.stage4Form = {
            showForm: false,
            universeCard: new __WEBPACK_IMPORTED_MODULE_7__universe_card__["a" /* UniverseCard */],
            availableEnergy: 5,
            rollMessage: '',
            showCostFaulty: false,
        };
        this.renderUniverseForm = {
            showForm: false,
            universeCard: new __WEBPACK_IMPORTED_MODULE_7__universe_card__["a" /* UniverseCard */],
            availableEnergy: 5,
            rollMessage: '',
            showCostFaulty: false,
        };
        this.finalUniverseCard = new __WEBPACK_IMPORTED_MODULE_7__universe_card__["a" /* UniverseCard */];
        this.scoldMessage = '';
        this.buff1EnergyCost = 2;
        this.buff1FaultyIncrease = 1;
        this.buff2EnergyCost = 2;
        this.buff2FaultyIncrease = 1;
        this.buff3EnergyCost = 2;
        this.buff3FaultyIncrease = 1;
        this.buff4EnergyCost = 2;
        this.buff4FaultyIncrease = 1;
        this.buff5EnergyCost = 2;
        this.buff5FaultyIncrease = 1;
        this.rollUniverse = true;
        this.purchase2EnergyCost = 1;
        this.purchase2FaultyIncrease = 1;
        this.purchase3EnergyCost = 5;
        this.purchase3FaultyIncrease = 2;
        this.purchase4EnergyCost = 10;
        this.purchase4FaultyIncrease = 5;
        this.purchase5EnergyCost = 0;
        this.purchase5FaultyIncrease = 10;
        this.reroll2EnergyCost = 5;
        this.reroll2FaultyIncrease = 2;
        this.reroll3EnergyCost = 5;
        this.reroll3FaultyIncrease = 3;
        this.reroll4EnergyCost = 5;
        this.reroll4FaultyIncrease = 4;
        this.reroll5EnergyCost = 0;
        this.reroll5FaultyIncrease = 0;
        this.buff1Tally = 0;
        this.buff2Tally = 0;
        this.buff3Tally = 0;
        this.buff4Tally = 0;
        this.buff5Tally = 0;
        this.moves = new Array();
        this.noMoveEligibleMessage = "No eligible move is avilable for this slot.";
        this.chosenMoves = new Array();
        this.Move1Name = '';
        /*
         
          Ability Design: For now, I'm thinking about limiting the game to 7 global forces and 5 global concepts all around.  Forces can be about dealing
          and resisting damage and concepts can be applied towards ultimate move buildups. (You gain points toward a concept from moves)
      
          Form Design:
          What the user needs to be rendered: 5 slots The Default Move (cannot be modified, but can be buffed), a common move, an uncommon move, a rare move,
          and an ultimate move.
      
          Do a random die roll on each during initialization and show the results:
            A common move slot can cost 1 energy and  1%: can only contain moves within the scope of the forces/concepts
            An uncommonmove slot can cost 5 energy and 2% Faulty Universe chance.
            An rare move slot can cost 10 energy and 5% Faulty Universe chance. This can be from anywhere.
      
            An Ultimate move slot...IDK yet, I'm thinking this will be a rare one time roll per Universe to see if it's eligble for cheap price.
            It can say a cool bonus effect like, "Congratualations you have the chance to create a "Perfect Universe"! If you choose to go for it,
            you will gain a random Ultimate Move for this Universe and it will be marked accordingly, but you also risk blowing it up! (Extra 10% Faulty
            Universe chance)...I'm leaning towards letting the user either choose one of the default ultimate moves, or allowing them to access to any
            ultimate move, but it will be random.
      
          Rerolling all of these is an option at a price (Except the Ultimate Move slot. This one is stuck).
      
          It'll be possible to buff a move at the cost of 2 energy and faulty universe 1% chance . There will be a buff count which will start small and increase
          the more you buff it. (I'm just going to have it cost double as you buff it) The cost is the same no matter rarity.
      
          Make sure the moves where you re-roll are done in the correct order (re-roll can be done first with a purchase, and only after purchase, the buff option becomes available)
      
          Submitting
          At this point there will be a faulty Universe roll.  Higher is always good.  If failed, it will jump to render-universe with a 'sowwy' message,
          and add a faulty Universe tag storing the stat's of what it "could have" been.  Later in design, I'll probably add an option to let user
          try again and making this old Universe.
      
          If success, then pass the card object along to stage 4 so user can name it and edit the description.
      
          */
        this.RandMoveName1 = new Array();
        this.RandMoveName2 = new Array();
        this.RandMoveName3 = new Array();
        this.move2Purchase = new __WEBPACK_IMPORTED_MODULE_6__move__["a" /* Move */];
        this.move3Purchase = new __WEBPACK_IMPORTED_MODULE_6__move__["a" /* Move */];
        this.move4Purchase = new __WEBPACK_IMPORTED_MODULE_6__move__["a" /* Move */];
        this.perfectUniverse = false;
        this.perfectUniverseMessage = "Congratulations Sage! You made a PERFECT UNIVERSE! For a 10% faulty Universe risk, you may purchase an ULTIMATE MOVE to add to your Universe card! " +
            "In addition, if you do not like the default choice this Universe provides, you may re-roll it once FOR FREE!";
        this.deepCopy = new Array();
        this.buff1Toggle = true;
        this.buff2Toggle = false;
        this.buff3Toggle = false;
        this.buff4Toggle = false;
        this.buff5Toggle = false;
        this.MoveUltimateName = "";
        this.purchase2Toggle = true;
        this.purchase3Toggle = true;
        this.purchase4Toggle = true;
        this.purchase5Toggle = true;
        this.reroll2Toggle = true;
        this.reroll3Toggle = true;
        this.reroll4Toggle = true;
        this.reroll5Toggle = true;
        this.move2Radio = true;
        this.move3Radio = true;
        this.move4Radio = true;
        this.scoldMessage1 = "";
        this.scoldMessage2 = "";
        this.scoldMessage3 = "";
        this.scoldMessage4 = "";
        this.scoldMessage5 = "";
        this.rollMessage = "";
    }
    Stage3FormComponent.prototype.ngOnInit = function () {
    };
    Stage3FormComponent.prototype.onSelectionChange2 = function (entry) {
        this.selectedEntry2 = entry;
    };
    Stage3FormComponent.prototype.onSelectionChange3 = function (entry) {
        this.selectedEntry3 = entry;
    };
    Stage3FormComponent.prototype.onSelectionChange4 = function (entry) {
        this.selectedEntry4 = entry;
    };
    Stage3FormComponent.prototype.reroll = function (which) {
        var cost;
        var faulty;
        this.scoldMessage1 = "";
        this.scoldMessage2 = "";
        this.scoldMessage3 = "";
        this.scoldMessage4 = "";
        this.scoldMessage5 = "";
        if (which == 2) {
            faulty = 99;
        }
        if (which == 3) {
            faulty = 98;
        }
        if (which == 4) {
            faulty = 96;
        }
        if (this.stage3Form.cost + 5 < this.stage3Form.availableEnergy) {
            if (this.stage3Form.faultyUniverse < faulty) {
                this.moves = this.deepCopy; //I'm hoping this fills up the referenced array
                this.deepCopy = JSON.parse(JSON.stringify(this.moves));
                this.movesInitialize(which);
                this.stage3Form.cost = this.stage3Form.cost + 5;
                this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + (101 - faulty);
            }
            else {
                if (which == 2) {
                    this.scoldMessage2 = 'The Multiverse says to you, "Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                }
                if (which == 3) {
                    this.scoldMessage3 = 'The Multiverse says to you, "Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                }
                if (which == 4) {
                    this.scoldMessage4 = 'The Multiverse says to you, "Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                }
            }
        }
        else {
            if (which == 2) {
                this.scoldMessage2 = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
            }
            if (which == 3) {
                this.scoldMessage3 = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
            }
            if (which == 4) {
                this.scoldMessage4 = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
            }
        }
    };
    Stage3FormComponent.prototype.rerollUltimate = function () {
        var rand5;
        this.moves = this.deepCopy; //I'm hoping this fills up the referenced array
        this.deepCopy = JSON.parse(JSON.stringify(this.moves));
        var trimmedMoves = this.moves;
        for (var i = 0; i < trimmedMoves.length; i++) {
            if (this.moves[i].ultimate == '0') {
                trimmedMoves.splice(i, 1); //no force and concept fields are in common to be eligible for Move 2
                i--; //counts i back down so it doesn't skip evaulating one
            }
        }
        if (this.moves.length > 0) {
            do {
                rand5 = Math.floor(Math.random() * trimmedMoves.length);
            } while (this.stage3Form.rolledUniverse.FK_Move_Ultimate_Default == trimmedMoves[rand5].id); //so it doesn't match original move
            this.MoveUltimateName = this.moves[rand5].name;
        }
        this.moves = this.deepCopy;
        this.reroll5Toggle = false;
    };
    Stage3FormComponent.prototype.purchase2 = function () {
        this.scoldMessage1 = "";
        this.scoldMessage2 = "";
        this.scoldMessage3 = "";
        this.scoldMessage4 = "";
        this.scoldMessage5 = "";
        if (this.stage3Form.cost + 1 < this.stage3Form.availableEnergy) {
            if (this.stage3Form.faultyUniverse < 99) {
                if (this.selectedEntry2 != undefined && this.selectedEntry2 != null) {
                    this.name = this.selectedEntry2;
                    console.log("Move 2 Purchase: " + this.name);
                    this.stage3Form.cost = this.stage3Form.cost + 1;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + 1;
                    this.purchase2Toggle = false;
                    this.reroll2Toggle = false;
                    this.buff2Toggle = true;
                    this.move2Radio = false;
                    //this.stage3Form.availableEnergy = this.stage3Form.availableEnergy - 1;
                }
                else {
                    this.scoldMessage2 = 'The Multiverse says to you, "Dear Sage, you must realize that it is pointless to purchase a move that is out of existence!"';
                }
            }
            else {
                this.scoldMessage2 = 'The Multiverse says to you, "Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
            }
        }
        else {
            this.scoldMessage2 = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
        }
    };
    Stage3FormComponent.prototype.purchase3 = function () {
        this.scoldMessage1 = "";
        this.scoldMessage2 = "";
        this.scoldMessage3 = "";
        this.scoldMessage4 = "";
        this.scoldMessage5 = "";
        if (this.stage3Form.cost + 5 < this.stage3Form.availableEnergy) {
            if (this.stage3Form.faultyUniverse < 98) {
                if (this.selectedEntry3 != undefined && this.selectedEntry3 != null) {
                    this.name = this.selectedEntry3;
                    console.log("Move 3 Purchase: " + this.name);
                    this.stage3Form.cost = this.stage3Form.cost + 5;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + 2;
                    this.purchase3Toggle = false;
                    this.reroll3Toggle = false;
                    this.buff3Toggle = true;
                    this.move3Radio = false;
                    //this.stage3Form.availableEnergy = this.stage3Form.availableEnergy - 5;
                }
                else {
                    this.scoldMessage3 = 'The Multiverse says to you, "Dear Sage, you must realize that it is pointless to purchase a move that is out of existence!"';
                }
            }
            else {
                this.scoldMessage3 = 'The Multiverse says to you, "Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
            }
        }
        else {
            this.scoldMessage3 = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
        }
    };
    Stage3FormComponent.prototype.purchase4 = function () {
        this.scoldMessage1 = "";
        this.scoldMessage2 = "";
        this.scoldMessage3 = "";
        this.scoldMessage4 = "";
        this.scoldMessage5 = "";
        if (this.stage3Form.cost + 10 < this.stage3Form.availableEnergy) {
            if (this.stage3Form.faultyUniverse < 95) {
                if (this.selectedEntry4 != undefined && this.selectedEntry4 != null) {
                    this.name = this.selectedEntry4;
                    console.log("Move 4 Purchase: " + this.name);
                    this.stage3Form.cost = this.stage3Form.cost + 10;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + 5;
                    this.purchase4Toggle = false;
                    this.reroll4Toggle = false;
                    this.buff4Toggle = true;
                    this.move4Radio = false;
                    //this.stage3Form.availableEnergy = this.stage3Form.availableEnergy - 10;
                }
                else {
                    this.scoldMessage4 = 'The Multiverse says to you, "Dear Sage, you must realize that it is pointless to purchase a move that is out of existence!"';
                }
            }
            else {
                this.scoldMessage4 = 'The Multiverse says to you, "Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
            }
        }
        else {
            this.scoldMessage4 = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
        }
    };
    Stage3FormComponent.prototype.purchase5 = function () {
        this.scoldMessage1 = "";
        this.scoldMessage2 = "";
        this.scoldMessage3 = "";
        this.scoldMessage4 = "";
        this.scoldMessage5 = "";
        if (this.stage3Form.faultyUniverse < 90) {
            this.name = this.MoveUltimateName;
            console.log("Move 5 Purchase: " + this.name);
            this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + 10;
            this.purchase5Toggle = false;
            this.reroll5Toggle = false;
            this.buff5Toggle = true;
        }
        else {
            this.scoldMessage5 = 'The Multiverse says to you, "Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
        }
    };
    Stage3FormComponent.prototype.buff = function (which) {
        this.scoldMessage1 = "";
        this.scoldMessage2 = "";
        this.scoldMessage3 = "";
        this.scoldMessage4 = "";
        this.scoldMessage5 = "";
        if (which == 1) {
            if (this.stage3Form.cost + this.buff1EnergyCost < this.stage3Form.availableEnergy) {
                if (this.stage3Form.faultyUniverse < (100 - this.buff1FaultyIncrease)) {
                    this.buff1Tally = this.buff1Tally + 1;
                    this.stage3Form.cost = this.stage3Form.cost + this.buff1EnergyCost;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + this.buff1FaultyIncrease;
                    this.buff1EnergyCost = this.buff1EnergyCost * 2;
                    this.buff1FaultyIncrease = this.buff1FaultyIncrease * 2;
                }
                else {
                    this.scoldMessage1 = 'The Multiverse says to you, "Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                }
            }
            else {
                this.scoldMessage4 = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
            }
        }
        if (which == 2) {
            if (this.stage3Form.cost + this.buff2EnergyCost < this.stage3Form.availableEnergy) {
                if (this.stage3Form.faultyUniverse < (100 - this.buff2FaultyIncrease)) {
                    this.buff2Tally = this.buff2Tally + 1;
                    this.stage3Form.cost = this.stage3Form.cost + this.buff2EnergyCost;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + this.buff2FaultyIncrease;
                    this.buff2EnergyCost = this.buff2EnergyCost * 2;
                    this.buff2FaultyIncrease = this.buff2FaultyIncrease * 2;
                }
                else {
                    this.scoldMessage2 = 'The Multiverse says to you, "Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                }
            }
            else {
                this.scoldMessage2 = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
            }
        }
        if (which == 3) {
            if (this.stage3Form.cost + this.buff3EnergyCost < this.stage3Form.availableEnergy) {
                if (this.stage3Form.faultyUniverse < (100 - this.buff3FaultyIncrease)) {
                    this.buff3Tally = this.buff3Tally + 1;
                    this.stage3Form.cost = this.stage3Form.cost + this.buff3EnergyCost;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + this.buff3FaultyIncrease;
                    this.buff3EnergyCost = this.buff3EnergyCost * 2;
                    this.buff3FaultyIncrease = this.buff3FaultyIncrease * 2;
                }
                else {
                    this.scoldMessage3 = 'The Multiverse says to you, "Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                }
            }
            else {
                this.scoldMessage3 = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
            }
        }
        if (which == 4) {
            if (this.stage3Form.cost + this.buff4EnergyCost < this.stage3Form.availableEnergy) {
                if (this.stage3Form.faultyUniverse < (100 - this.buff4FaultyIncrease)) {
                    this.buff4Tally = this.buff4Tally + 1;
                    this.stage3Form.cost = this.stage3Form.cost + this.buff4EnergyCost;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + this.buff4FaultyIncrease;
                    this.buff4EnergyCost = this.buff4EnergyCost * 2;
                    this.buff4FaultyIncrease = this.buff4FaultyIncrease * 2;
                }
                else {
                    this.scoldMessage4 = 'The Multiverse says to you, "Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                }
            }
            else {
                this.scoldMessage4 = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
            }
        }
        if (which == 5) {
            if (this.stage3Form.cost + this.buff5EnergyCost < this.stage3Form.availableEnergy) {
                if (this.stage3Form.faultyUniverse < (100 - this.buff5FaultyIncrease)) {
                    this.buff5Tally = this.buff5Tally + 1;
                    this.stage3Form.cost = this.stage3Form.cost + this.buff5EnergyCost;
                    this.stage3Form.faultyUniverse = this.stage3Form.faultyUniverse + this.buff5FaultyIncrease;
                    this.buff5EnergyCost = this.buff5EnergyCost * 2;
                    this.buff5FaultyIncrease = this.buff5FaultyIncrease * 2;
                }
                else {
                    this.scoldMessage5 = 'The Multiverse says to you, "Dear Sage, I apologize, but you tinker with this Universe any more it is to be sure to explode!"';
                }
            }
            else {
                this.scoldMessage5 = 'The Multiverse says to you, "Dear Sage, I apologize, but you do not have the energy to fine-tune anymore."';
            }
        }
    };
    Stage3FormComponent.prototype.rollUniverseCard = function () {
        var _this = this;
        this.spinToggle = true;
        //roll faulty Universe
        var randFaulty = Math.floor(Math.random() * 100) + 1;
        var needToRoll = this.stage3Form.faultyUniverse;
        if (randFaulty >= needToRoll) {
            this.rollMessage = "Congratulations Sage! You rolled a " + randFaulty + "%, and needed a " + needToRoll + "%!  Redirecting.......";
        }
        else {
            this.rollMessage = "My apologies Ma' Lord, You rolled a " + randFaulty + "%, and needed a " + needToRoll + "%!  Redirecting.......";
        }
        console.log("You rolled a " + randFaulty + "%!");
        //set stage4 model universe
        this.finalUniverseCard.FK_base_universe = this.stage3Form.rolledUniverse.id;
        if (randFaulty >= this.stage3Form.faultyUniverse) {
            this.finalUniverseCard.name = this.stage3Form.rolledUniverse.name;
            this.finalUniverseCard.description = this.stage3Form.rolledUniverse.description;
            this.finalUniverseCard.FK_base_universe = this.stage3Form.rolledUniverse.id;
        }
        else {
            this.finalUniverseCard.name = "A Faulty " + this.stage3Form.rolledUniverse.name;
            this.finalUniverseCard.description = "A failed Universe. There maybe some way to recover this Universe, but for now it is useless.....";
            this.finalUniverseCard.FK_base_universe = this.stage3Form.rolledUniverse.id;
        }
        this.finalUniverseCard.Force_Name_1 = this.stage3Form.rolledUniverse.Force_1;
        this.finalUniverseCard.Force_Name_2 = this.stage3Form.rolledUniverse.Force_2;
        this.finalUniverseCard.Force_Name_3 = this.stage3Form.rolledUniverse.Force_3;
        this.finalUniverseCard.Strength_Force_1 = this.stage3Form.rolledUniverse.Force_Str_1;
        this.finalUniverseCard.Strength_Force_2 = this.stage3Form.rolledUniverse.Force_Str_2;
        this.finalUniverseCard.Strength_Force_3 = this.stage3Form.rolledUniverse.Force_Str_3;
        this.finalUniverseCard.Concept_Name_1 = this.stage3Form.rolledUniverse.Concept_1;
        this.finalUniverseCard.Concept_Name_2 = this.stage3Form.rolledUniverse.Concept_2;
        this.finalUniverseCard.Concept_Name_3 = this.stage3Form.rolledUniverse.Concept_3;
        this.finalUniverseCard.Strength_Concept_1 = this.stage3Form.rolledUniverse.Concept_Str_1;
        this.finalUniverseCard.Strength_Concept_2 = this.stage3Form.rolledUniverse.Concept_Str_2;
        this.finalUniverseCard.Strength_Concept_3 = this.stage3Form.rolledUniverse.Concept_Str_3;
        this.finalUniverseCard.FK_Move_1 = this.stage3Form.rolledUniverse.FK_Move_1_Default;
        //need to get FK's from names
        for (var i = 0; i < this.deepCopy.length; i++) {
            if (this.selectedEntry2 == this.deepCopy[i].name) {
                console.log("Move 2 Added into final model: " + this.selectedEntry2);
                this.finalUniverseCard.FK_Move_2 = this.deepCopy[i].id;
            }
            if (this.selectedEntry3 == this.deepCopy[i].name) {
                console.log("Move 3 Added into final model: " + this.selectedEntry2);
                this.finalUniverseCard.FK_Move_3 = this.deepCopy[i].id;
            }
            if (this.selectedEntry4 == this.deepCopy[i].name) {
                console.log("Move 4 Added into final model: " + this.selectedEntry2);
                this.finalUniverseCard.FK_Move_4 = this.deepCopy[i].id;
            }
            if (this.MoveUltimateName == this.deepCopy[i].name) {
                console.log("Move Ultimate Added into final model: " + this.selectedEntry2);
                this.finalUniverseCard.FK_Move_Ultimate = this.deepCopy[i].id;
            }
        }
        this.finalUniverseCard.Move1_Buff_Tally = this.buff1Tally.toString();
        this.finalUniverseCard.Move2_Buff_Tally = this.buff2Tally.toString();
        this.finalUniverseCard.Move3_Buff_Tally = this.buff3Tally.toString();
        this.finalUniverseCard.Move4_Buff_Tally = this.buff4Tally.toString();
        this.finalUniverseCard.MoveUltimate_Buff_Tally = this.buff5Tally.toString();
        this.finalUniverseCard.Birth_URL = "https://" + this.stage3Form.birthURL;
        this.finalUniverseCard.Created_By = localStorage.getItem('sagename');
        console.log("Created By sage: " + this.finalUniverseCard.Created_By);
        var stopCondition = false;
        __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].interval(2000)
            .takeWhile(function () { return !stopCondition; })
            .subscribe(function (i) {
            _this.stage3Form.showForm = false;
            _this.spinToggle = false;
            //upload card to API
            _this.cardService.postNewCard(_this.finalUniverseCard, localStorage.getItem('sage_id')).subscribe(function (response) {
                if (randFaulty >= needToRoll) {
                    _this.stage4Form.availableEnergy = _this.stage3Form.availableEnergy;
                    _this.stage4Form.rollMessage = _this.rollMessage;
                    _this.stage4Form.universeCard = response;
                    _this.stage4Form.showCostFaulty = false;
                    _this.stage4.initialize();
                    _this.stage4Form.showForm = true;
                }
                else {
                    _this.renderUniverseForm.availableEnergy = _this.stage3Form.availableEnergy;
                    _this.renderUniverseForm.rollMessage = _this.rollMessage;
                    _this.renderUniverseForm.universeCard = response;
                    _this.renderUniverseForm.showCostFaulty = false;
                    _this.renderUniverseForm.showForm = true;
                }
                console.log("Buff1Tally: " + _this.finalUniverseCard.Move1_Buff_Tally);
                console.log("New Card added to DB: " + " Name: " + _this.finalUniverseCard.name + " Birth URL: " + _this.finalUniverseCard.Birth_URL);
            });
            stopCondition = true;
            //this.rollUniverse = true;
        });
    };
    Stage3FormComponent.prototype.getMove1 = function () {
        //console.log("Default Move FK In Stored Universe: " + this.stage3Form.rolledUniverse.FK_Move_1_Default);
        for (var i = 0; i < this.moves.length; i++) {
            if (this.moves[i]['id'] == this.stage3Form.rolledUniverse.FK_Move_1_Default) {
                this.chosenMoves[0] = this.moves[i];
                this.Move1Name = this.chosenMoves[0].name;
                //console.log("Default Move: " + this.chosenMoves[0].name);
                this.moves.splice(i, 1); //removes '1' item at i'th index...this is important so it doesn't turn up as an option for later
            }
        }
    };
    Stage3FormComponent.prototype.initialize = function () {
        var _this = this;
        ///this.stage4Form.availableEnergy = this.stage3Form.availableEnergy;
        ///this.stage4Form.faultyUniverse = this.stage3Form.faultyUniverse;
        ///this.stage4Form.cost = this.stage3Form.cost;
        this.spinToggle = false;
        this.cardService.getMovesTable().subscribe(function (incomingMoves) {
            _this.moves = incomingMoves;
            //console.log(JSON.parse(incomingMoves));
            //Move 1 Move FK is already in universe just search the moves array for that
            //console.log("FK DEFAULT MOVE: " + this.stage3Form.rolledUniverse.FK_Move_1_Default);
            _this.getMove1();
            _this.deepCopy = JSON.parse(JSON.stringify(_this.moves));
            //initializes in reverse order since the trim restrictions increase (and one is a subset of another
            //and I cannot get deep array cloning to work for each case without circular referencing being cause
            //let perfectRoll = Math.floor(Math.random() * 30) + 1;
            var perfectRoll = 30;
            console.log("Perfect Roll: " + perfectRoll);
            if (perfectRoll == 30) {
                _this.initializeUltimate();
            }
            _this.movesInitialize(4);
            _this.movesInitialize(3);
            _this.movesInitialize(2);
            console.log("Moves object size: " + _this.moves.length);
            console.log("Universe Force 1: " + _this.stage3Form.rolledUniverse['Force_1']);
            console.log("Universe Force 2: " + _this.stage3Form.rolledUniverse['Force_2']);
            console.log("Universe Force 3: " + _this.stage3Form.rolledUniverse['Force_3']);
            console.log("Universe Concept 1: " + _this.stage3Form.rolledUniverse['Concept_1']);
            console.log("Universe Concept 2: " + _this.stage3Form.rolledUniverse['Concept_2']);
            console.log("Universe Concept 3: " + _this.stage3Form.rolledUniverse['Concept_3']);
            //Move 2 Randomly Populate choices from moves that match one force AND one concept
            //this.test = deepCopy[11].name;//deep copying is working otherwise it'd be undefined here
            //Move 3 Randomly Populate choices from moves that match one force OR one concept
            //Move 4 Randomly Populate choices from moves of whole moves table
            //****Choices MAY duplicate between different moves, but not duplicate within the same move
            _this.stage3Form.spinToggle = false;
        });
        this.sageUserService.getError().subscribe(function (incomingError) {
            _this.scoldMessage = "Couldn't Load Move Data." + incomingError;
            _this.response = "Please Make Sure You Are Logged In.";
            _this.spinToggle = false;
        }); //remember this does ALL error handling for this form
        //need to pull in the whole table of moves
        //perfectUniverse roll
        console.log("Universe Data So Far (Stage 3): " + this.stage3Form.rolledUniverse.name);
        console.log("Universe Data So Far (Stage 3) Force 1: " + this.stage3Form.rolledUniverse.Force_1 + " Strength: " + this.stage3Form.rolledUniverse.Force_Str_1);
    };
    Stage3FormComponent.prototype.initializeUltimate = function () {
        this.perfectUniverse = true;
        for (var i = 0; i < this.moves.length; i++) {
            if (this.stage3Form.rolledUniverse.FK_Move_Ultimate_Default == this.moves[i].id) {
                this.MoveUltimateName = this.moves[i].name;
            }
        }
    };
    Stage3FormComponent.prototype.movesInitialize = function (whichMove) {
        //trim array to a temp array contain only moves that share a matching force and concept to the Universe
        //let trimmedMoves = new Array();
        var trimmedMoves = this.moves;
        console.log("Info For Move: " + whichMove);
        console.log("Trimmed Moves size: " + this.moves.length);
        console.log("Moves size: " + this.moves.length);
        //needs to pass 4 tests before it is trimmed None of ForceCat1&2 match None of ConceptCat1&2 match, then trim it from eligible array
        for (var i = 0; i < this.moves.length; i++) {
            //console.log("move being checked #" + i + ": " + this.moves[i].name);
            //forces compare
            var forceComparisonTrim = true;
            //concepts compare
            var conceptComparisonTrim = true;
            console.log("whichMove = " + whichMove);
            if (this.moves[i].ultimate == '1') {
                trimmedMoves.splice(i, 1); //no force and concept fields are in common to be eligible for Move 2
                i--; //counts i back down so it doesn't skip evaulating one
            }
            else {
                forceComparisonTrim = this.moveLogicForceComparison(trimmedMoves, forceComparisonTrim, i); //checks to see if any forces match the universe's forces
                conceptComparisonTrim = this.moveLogicForceComparison(trimmedMoves, conceptComparisonTrim, i); //checks to see if any concepts match the universe's concepts
                //here's where the rule is enforced
                //for common moves
                if (whichMove == 2) {
                    if (forceComparisonTrim == true || conceptComparisonTrim == true) {
                        trimmedMoves.splice(i, 1); //no force and concept fields are in common to be eligible for Move 2
                        i--; //counts i back down so it doesn't skip evaulating one
                    }
                }
                //for uncommon moves
                if (whichMove == 3) {
                    if (forceComparisonTrim == true && conceptComparisonTrim == true) {
                        trimmedMoves.splice(i, 1); //no force and concept fields are in common to be eligible for Move 2
                        i--; //counts i back down so it doesn't skip evaulating one
                    }
                }
                //for rare moves
                if (whichMove == 4) {
                    //no trim
                }
            }
        }
        console.log("Showing Trimmed Array");
        if (trimmedMoves[0] == null || trimmedMoves[0] == undefined) {
            this.RandMoveName1[whichMove] = this.noMoveEligibleMessage;
            this.RandMoveName2[whichMove] = this.noMoveEligibleMessage;
            this.RandMoveName3[whichMove] = this.noMoveEligibleMessage;
        }
        else if (trimmedMoves.length < 1) {
            this.RandMoveName1[whichMove] = trimmedMoves[0].name;
            this.RandMoveName2[whichMove] = this.noMoveEligibleMessage;
            this.RandMoveName3[whichMove] = this.noMoveEligibleMessage;
        }
        else if (trimmedMoves.length < 2) {
            this.RandMoveName1[whichMove] = trimmedMoves[0].name;
            this.RandMoveName2[whichMove] = trimmedMoves[1].name;
            this.RandMoveName3[whichMove] = this.noMoveEligibleMessage;
        }
        else if (trimmedMoves.length < 3) {
            this.RandMoveName1[whichMove] = trimmedMoves[0].name;
            this.RandMoveName2[whichMove] = trimmedMoves[1].name;
            this.RandMoveName3[whichMove] = trimmedMoves[2].name;
        }
        else {
            for (var j = 0; j < trimmedMoves.length; j++) {
                console.log("Move " + j + " Name: " + trimmedMoves[j].name);
            }
            //Roll 3 Random Index ID's
            var rand1 = Math.floor(Math.random() * trimmedMoves.length);
            var rand2 = void 0;
            var rand3 = void 0;
            do {
                rand2 = Math.floor(Math.random() * trimmedMoves.length);
            } while (rand2 == rand1); //no duplicates
            do {
                rand3 = Math.floor(Math.random() * trimmedMoves.length);
            } while (rand3 == rand1 || rand3 == rand2); //no duplicates
            //Show the Names (Finally)
            this.RandMoveName1[whichMove] = trimmedMoves[rand1].name;
            this.RandMoveName2[whichMove] = trimmedMoves[rand2].name;
            this.RandMoveName3[whichMove] = trimmedMoves[rand3].name;
            //update radio button bindings
            if (whichMove == 2) {
                this.radioMove2Choice1 = this.RandMoveName1[whichMove];
                this.radioMove2Choice2 = this.RandMoveName2[whichMove];
                this.radioMove2Choice3 = this.RandMoveName3[whichMove];
                this.onSelectionChange2(this.radioMove2Choice1); //initialize check
            }
            if (whichMove == 3) {
                this.radioMove3Choice1 = this.RandMoveName1[whichMove];
                this.radioMove3Choice2 = this.RandMoveName2[whichMove];
                this.radioMove3Choice3 = this.RandMoveName3[whichMove];
                this.onSelectionChange3(this.radioMove3Choice1); //initialize check
            }
            if (whichMove == 4) {
                this.radioMove4Choice1 = this.RandMoveName1[whichMove];
                this.radioMove4Choice2 = this.RandMoveName2[whichMove];
                this.radioMove4Choice3 = this.RandMoveName3[whichMove];
                this.onSelectionChange4(this.radioMove4Choice1); //initialize check
            }
            //Show the Tooltip Stats
        }
    };
    Stage3FormComponent.prototype.moveLogicForceComparison = function (trimmedMoves, forceComparisonTrim, i) {
        for (var j = 0; j < 3; j++) {
            var jj = j + 1;
            var index = 'Force_' + jj;
            //console.log("Concatenated index + 1: " + index);
            //console.log("Does " + trimmedMoves[i]['Force_Category_1'] + " Match " + this.stage3Form.rolledUniverse[index] + "?");
            if (trimmedMoves[i]['Force_Category_1'] == this.stage3Form.rolledUniverse[index]) {
                //console.log("Booled to False for Force 1 based on: " + trimmedMoves[i]['Force_Category_1'] + " Matching " + this.stage3Form.rolledUniverse[index]);
                forceComparisonTrim = false; //if one of these matches then it shouldn't be trimmed due to a force matching
            }
        }
        for (var l = 0; l < 3; l++) {
            var ll = l + 1;
            var index = 'Force_' + ll;
            if (trimmedMoves[i]['Force_Category_2'] == this.stage3Form.rolledUniverse[index]) {
                //console.log("Booled to False for Force 2 based on: " + trimmedMoves[i]['Force_Category_2'] + " Matching " + this.stage3Form.rolledUniverse[index]);
                forceComparisonTrim = false; //if one of these matches then it shouldn't be trimmed due to a force matching
            }
        }
        return forceComparisonTrim;
    };
    Stage3FormComponent.prototype.moveLogicConceptComparison = function (trimmedMoves, conceptComparisonTrim, i) {
        for (var n = 0; n < 3; n++) {
            var nn = n + 1;
            var index = 'Concept_' + nn;
            if (trimmedMoves[i]['Concept_Category_1'] == this.stage3Form.rolledUniverse[index]) {
                //console.log("Booled to False for Concept 1 based on: " + trimmedMoves[i]['Concept_Category_1'] + " Matching " + this.stage3Form.rolledUniverse[index]);
                conceptComparisonTrim = false; //if one of these matches then it shouldn't be trimmed due to a concept matching
            }
        }
        for (var p = 0; p < 3; p++) {
            var pp = p + 1;
            var index = 'Concept_' + pp;
            if (trimmedMoves[i]['Concept_Category_2'] == this.stage3Form.rolledUniverse[index]) {
                //console.log("Booled to False for Concept 2 based on: " + trimmedMoves[i]['Concept_Category_2'] + " Matching " + this.stage3Form.rolledUniverse[index]);
                conceptComparisonTrim = false; //if one of these matches then it shouldn't be trimmed due to a concept matching
            }
        }
        return conceptComparisonTrim;
    };
    return Stage3FormComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], Stage3FormComponent.prototype, "stage3Form", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4__stage_4_form_stage_4_form_component__["a" /* Stage4FormComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__stage_4_form_stage_4_form_component__["a" /* Stage4FormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__stage_4_form_stage_4_form_component__["a" /* Stage4FormComponent */]) === "function" && _a || Object)
], Stage3FormComponent.prototype, "stage4", void 0);
Stage3FormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-stage-3-form',
        template: __webpack_require__(462),
        styles: [__webpack_require__(395)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__card_service__["a" /* CardService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__card_service__["a" /* CardService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__sage_user_service__["a" /* SageUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__sage_user_service__["a" /* SageUserService */]) === "function" && _c || Object])
], Stage3FormComponent);

var _a, _b, _c;
//# sourceMappingURL=stage-3-form.component.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__universe__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__card_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__universe_card__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderUniverseComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { Tally } from '../tally';



var RenderUniverseComponent = (function () {
    function RenderUniverseComponent(cardService) {
        this.cardService = cardService;
        this.renderUniverseForm = {
            showForm: false,
            universeCard: new __WEBPACK_IMPORTED_MODULE_3__universe_card__["a" /* UniverseCard */],
            availableEnergy: 5,
            rolledMessage: "",
            showCostFaulty: false,
        };
        this.fourthForce = false;
        this.fourthConcept = false;
        this.scoldMessage = '';
        this.moves = new Array();
        this.moveName = new Array();
        this.universeCategory = new __WEBPACK_IMPORTED_MODULE_1__universe__["a" /* Universe */];
        this.move2 = true;
        this.move3 = true;
        this.move4 = true;
        this.moveUltimate = true;
        this.noMoveEligibleMessage = "No eligible move is avilable for this slot.";
    }
    RenderUniverseComponent.prototype.ngOnInit = function () {
    };
    RenderUniverseComponent.prototype.initialize = function () {
        var _this = this;
        this.cardService.getMovesTable().subscribe(function (incomingMoves) {
            _this.moveName[0] = 'null';
            _this.moves = incomingMoves;
            _this.renderUniverseForm.universeCard.Force_Name_4 = "no 4th forces or concepts yet";
            _this.renderUniverseForm.universeCard.Concept_Name_4 = "no 4th forces or concepts yet";
            _this.renderUniverseForm.universeCard.Strength_Force_4 = "no 4th forces or concepts yet";
            _this.renderUniverseForm.universeCard.Strength_Concept_4 = "no 4th forces or concepts yet";
            for (var i = 0; i < _this.moves.length; i++) {
                if (_this.renderUniverseForm.universeCard.FK_Move_1 == _this.moves[i].id) {
                    _this.moveName[1] = _this.moves[i].name;
                }
                if (_this.renderUniverseForm.universeCard.FK_Move_2 == _this.moves[i].id) {
                    _this.moveName[2] = _this.moves[i].name;
                }
                if (_this.renderUniverseForm.universeCard.FK_Move_3 == _this.moves[i].id) {
                    _this.moveName[3] = _this.moves[i].name;
                }
                if (_this.renderUniverseForm.universeCard.FK_Move_4 == _this.moves[i].id) {
                    _this.moveName[4] = _this.moves[i].name;
                }
                if (_this.renderUniverseForm.universeCard.FK_Move_Ultimate == _this.moves[i].id) {
                    _this.moveName[5] = _this.moves[i].name;
                }
            }
            if (_this.moveName[1] == null || _this.moveName[2] == undefined) {
                _this.moveName[1] = _this.noMoveEligibleMessage;
                _this.renderUniverseForm.universeCard.Move1_Buff_Tally = "N/a";
            }
            if (_this.moveName[2] == null || _this.moveName[2] == undefined) {
                _this.moveName[2] = _this.noMoveEligibleMessage;
                _this.renderUniverseForm.universeCard.Move2_Buff_Tally = "N/a";
            }
            if (_this.moveName[3] == null || _this.moveName[3] == undefined) {
                _this.moveName[3] = _this.noMoveEligibleMessage;
                _this.renderUniverseForm.universeCard.Move3_Buff_Tally = "N/a";
            }
            if (_this.moveName[4] == null || _this.moveName[4] == undefined) {
                _this.moveName[4] = _this.noMoveEligibleMessage;
                _this.renderUniverseForm.universeCard.Move4_Buff_Tally = "N/a";
            }
            if (_this.moveName[5] == null || _this.moveName[5] == undefined) {
                _this.moveName[5] = _this.noMoveEligibleMessage;
                _this.renderUniverseForm.universeCard.MoveUltimate_Buff_Tally = "N/a";
            }
            _this.cardService.getUniverseInfo(_this.renderUniverseForm.universeCard.FK_base_universe).subscribe(function (incomingUniverse) {
                console.log("INC UNIVESE CATEGORY: " + JSON.stringify(incomingUniverse));
                _this.universeCategory = incomingUniverse;
                console.log("INC UNIVESE CATEGORY2: " + JSON.stringify(_this.universeCategory));
            });
            //console.log("Universe Data So Far: " + JSON.stringify(this.renderUniverseForm.universeCard));
        });
    };
    return RenderUniverseComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], RenderUniverseComponent.prototype, "renderUniverseForm", void 0);
RenderUniverseComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-render-universe',
        template: __webpack_require__(463),
        styles: [__webpack_require__(396)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__card_service__["a" /* CardService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__card_service__["a" /* CardService */]) === "function" && _a || Object])
], RenderUniverseComponent);

var _a;
//# sourceMappingURL=render-universe.component.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__card_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render_universe_render_universe_component__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__universe_card__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Stage4FormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Stage4FormComponent = (function () {
    function Stage4FormComponent(cardService) {
        this.cardService = cardService;
        this.stage4Form = {
            showForm: false,
            universeCard: new __WEBPACK_IMPORTED_MODULE_3__universe_card__["a" /* UniverseCard */],
            availableEnergy: 5,
            rollMessage: '',
            showCostFaulty: false,
        };
        this.renderUniverseForm = {
            showForm: false,
            availableEnergy: 5,
            universeCard: new __WEBPACK_IMPORTED_MODULE_3__universe_card__["a" /* UniverseCard */],
            rollMessage: '',
            showCostFaulty: false,
        };
        this.universeName = '';
        this.universeDescription = '';
    }
    Stage4FormComponent.prototype.ngOnInit = function () {
    };
    Stage4FormComponent.prototype.submit = function () {
        var _this = this;
        this.renderUniverseForm.universeCard.name = this.universeName;
        this.renderUniverseForm.universeCard.description = this.universeDescription;
        this.cardService.updateUniverseCardNameDescription(this.renderUniverseForm.universeCard, this.stage4Form.universeCard.id).subscribe(function (response) {
            _this.renderUniverseForm.universeCard = response;
            console.log("Card Updated: " + _this.renderUniverseForm.universeCard);
            _this.renderUniverse.initialize();
            _this.stage4Form.showForm = false;
            _this.renderUniverseForm.showForm = true;
            //proceed to finish....
        });
    };
    Stage4FormComponent.prototype.initialize = function () {
        this.renderUniverseForm.universeCard = this.stage4Form.universeCard;
        this.renderUniverseForm.availableEnergy = this.stage4Form.availableEnergy;
        this.universeName = this.stage4Form.universeCard.name;
        this.universeDescription = this.stage4Form.universeCard.description;
        console.log("Universe Data So Far: " + this.stage4Form.universeCard);
    };
    return Stage4FormComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], Stage4FormComponent.prototype, "stage4Form", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2__render_universe_render_universe_component__["a" /* RenderUniverseComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__render_universe_render_universe_component__["a" /* RenderUniverseComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__render_universe_render_universe_component__["a" /* RenderUniverseComponent */]) === "function" && _a || Object)
], Stage4FormComponent.prototype, "renderUniverse", void 0);
Stage4FormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-stage-4-form',
        template: __webpack_require__(464),
        styles: [__webpack_require__(397)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__card_service__["a" /* CardService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__card_service__["a" /* CardService */]) === "function" && _b || Object])
], Stage4FormComponent);

var _a, _b;
//# sourceMappingURL=stage-4-form.component.js.map

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sage__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__race__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SageUserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SageUserService = (function () {
    function SageUserService(http) {
        this.http = http;
        this.error = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.sageSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Headers */]({
            'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json',
        });
        this.sage = new __WEBPACK_IMPORTED_MODULE_5__sage__["a" /* Sage */];
        this.race = new __WEBPACK_IMPORTED_MODULE_6__race__["a" /* Race */];
    }
    SageUserService.prototype.sendSage = function (sage) {
        //console.log('sendSage() ' + JSON.stringify(sage));
        this.sageSubject.next(sage);
    };
    SageUserService.prototype.clearSage = function () {
        this.sageSubject.next();
    };
    SageUserService.prototype.getSage = function () {
        //console.log('getSage() ' + JSON.stringify(this.sageSubject.asObservable));
        return this.sageSubject.asObservable();
    };
    SageUserService.prototype.sendError = function (error) {
        console.log("In Sage Creation Service: " + JSON.stringify(error));
        //console.log('sendSage() ' + JSON.stringify(sage));
        this.error.next(error);
    };
    SageUserService.prototype.clearError = function () {
        this.error.next();
    };
    SageUserService.prototype.getError = function () {
        //console.log('getSage() ' + JSON.stringify(this.sageSubject.asObservable));
        return this.error.asObservable();
    };
    SageUserService.prototype.getRaceInfo = function (raceID) {
        var _this = this;
        //1. Get Race Data
        //console.log("Current Auth Token: " + localStorage.getItem('access_token'));
        this.token = localStorage.getItem('access_token');
        this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));
        this.url = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].baseAPIUrl + 'api/race/' + raceID;
        this.response = this.http.get(this.url, { headers: this.headers })
            .map(function (res) { return _this.response = res.json(); }).retryWhen(function (attempts) { return attempts.zip(__WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].range(1, 4))
            .flatMap(function (_a) {
            var error = _a[0], i = _a[1];
            if (i > 3) {
                return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].throw(error.json().error || 'Server error');
            }
            console.log('delay retry by ' + i + ' second(s)');
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].timer(i * 100);
        }); });
        this.response.subscribe(function (data) {
            _this.race = data;
            _this.setLocalRaceStorage(_this.race);
        }, function (err) { return _this.sendError(err); });
        //console.log("Local Race Variable: " + JSON.stringify(this.response));
        return this.response;
    };
    SageUserService.prototype.getTooltipInfo = function () {
        var _this = this;
        //1. Get Tooltip Data
        //console.log("Current Auth Token: " + localStorage.getItem('access_token'));
        this.token = localStorage.getItem('access_token');
        this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));
        //this.tipCategoryID = 1;
        this.url = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].baseAPIUrl + 'api/tooltips';
        this.response = this.http.get(this.url, { headers: this.headers })
            .map(function (res) { return _this.response = res.json(); }).retryWhen(function (attempts) { return attempts.zip(__WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].range(1, 4))
            .flatMap(function (_a) {
            var error = _a[0], i = _a[1];
            if (i > 3) {
                return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].throw(error.json().error || 'Server error');
            }
            console.log('delay retry by ' + i + ' second(s)');
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].timer(i * 100);
        }); });
        this.response.subscribe(function (data) {
            // console.log('observing Tooltip: ' + JSON.stringify(this.response));
        }, function (err) { return _this.sendError(err); });
        //console.log("Local Race Variable: " + JSON.stringify(this.response));
        return this.response;
    };
    /*Sage Storage*/
    SageUserService.prototype.setLocalSageStorage = function (sage) {
        localStorage.setItem('Intuition', sage.Intuition);
        localStorage.setItem('Ingenuity', sage.Ingenuity);
        localStorage.setItem('Inquisitiveness', sage.Inquisitiveness);
        localStorage.setItem('Insanity_Control', sage.Insanity_Control);
        localStorage.setItem('Intelligence', sage.Intelligence);
        localStorage.setItem('Invigoration', sage.Invigoration);
        localStorage.setItem('Chosen_Image', sage.Chosen_Image);
        localStorage.setItem('FK_Race', sage.FK_Race);
        localStorage.setItem('Energy', sage.Energy);
        localStorage.setItem('XP', sage.XP);
        localStorage.setItem('Level', sage.Level);
        localStorage.setItem('Sage_Created', sage.Sage_Created);
        localStorage.setItem('Personality', sage.Personality);
        console.log("SET Sage's Full Account Info: " + JSON.stringify(sage));
    };
    SageUserService.prototype.getLocalSageStorage = function () {
        if (localStorage.getItem('sage_id')) {
            this.sage.Intuition = localStorage.getItem('Intuition');
            this.sage.Ingenuity = localStorage.getItem('Ingenuity');
            this.sage.Inquisitiveness = localStorage.getItem('Inquisitiveness');
            this.sage.Insanity_Control = localStorage.getItem('Insanity_Control');
            this.sage.Intelligence = localStorage.getItem('Intelligence');
            this.sage.Invigoration = localStorage.getItem('Invigoration');
            this.sage.Chosen_Image = localStorage.getItem('Chosen_Image');
            this.sage.FK_Race = localStorage.getItem('FK_Race');
            this.sage.Energy = localStorage.getItem('Energy');
            this.sage.XP = localStorage.getItem('XP');
            this.sage.Level = localStorage.getItem('Level');
            this.sage.Personality = localStorage.getItem('Personality');
            this.sage.Sage_Created = localStorage.getItem('Sage_Created');
            console.log("GET Sage's Full Account Info: " + JSON.stringify(this.sage));
            console.log("Sage's Full Account Info: " + JSON.stringify(this.sage));
            return this.sage;
        }
        else {
            this.response = 'No Sage Data Found: Please make sure user is Logged in!';
            this.sendError(this.response);
            return this.response;
        }
    };
    /*Race Storage*/
    SageUserService.prototype.setLocalRaceStorage = function (race) {
        localStorage.setItem('birth_universe', race.birth_universe);
        localStorage.setItem('race_name', race.race_name);
        localStorage.setItem('racial_bonuses', race.racial_bonuses);
        localStorage.setItem('description', race.description);
        localStorage.setItem('starting_personality', race.starting_personality);
        localStorage.setItem('dimensional_wake', race.dimensional_wake);
        localStorage.setItem('is_metaphysical', race.is_metaphysical);
        console.log("Race's Full Account Info: " + JSON.stringify(race));
        console.log("SET Races's Full Account Info: " + JSON.stringify(race));
    };
    SageUserService.prototype.getLocalRaceStorage = function () {
        if (localStorage.getItem('FK_Race')) {
            this.race.birth_universe = localStorage.getItem('birth_universe');
            this.race.race_name = localStorage.getItem('race_name');
            this.race.racial_bonuses = localStorage.getItem('racial_bonuses');
            this.race.description = localStorage.getItem('description');
            this.race.dimensional_wake = localStorage.getItem('dimensional_wake');
            this.race.is_metaphysical = localStorage.getItem('is_metaphysical');
            console.log("GET Races's Full Account Info: " + JSON.stringify(this.race));
            return this.race;
        }
        else {
            this.response = 'No Sage Data Found: Please make sure user is Logged in!';
            this.sendError(this.response);
            return this.response;
        }
    };
    return SageUserService;
}());
SageUserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* Http */]) === "function" && _a || Object])
], SageUserService);

var _a;
//# sourceMappingURL=sage-user.service.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: true,
    baseAPIUrl: 'https://sageofthemultiverse.com/public/',
    tokenURL: 'https://sageofthemultiverse.com/public/oauth/token',
    grantType: 'client_credentials',
    appID: 71,
    appSecret: 'bHFAwcSejLJXTplv05R1MnUUY9RUBa2TcsxjAj54',
    scope: '*',
    //for sage creation page. Since I'm too lazy currently to query the API for id's to have this dynamic, just remember to update these values whenever I add or delete a race from the DB.
    minRaceID: 1001,
    maxRaceID: 1010,
    baseImagePath: 'assets/images/',
    maxImagesPerRace: 3,
    profileImageExtension: '.jpg',
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 283:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 283;


/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(27);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_accounts_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(17);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountChangeFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { SageAcc } from './hero';
var AccountChangeFormComponent = (function () {
    function AccountChangeFormComponent(_fb, apiAccountsService, router) {
        this._fb = _fb;
        this.apiAccountsService = apiAccountsService;
        this.router = router;
        this.spinToggle = false;
        this.subForm = {
            caption: null,
            showForm: false,
            requestType: '2'
        };
    }
    AccountChangeFormComponent.prototype.ngOnInit = function () {
        this.myForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
            whateverField: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]()
        });
    };
    AccountChangeFormComponent.prototype.update = function () {
        var _this = this;
        this.response = "Revolving the Multiverse around you to customize your needs......";
        this.spinToggle = true;
        this.sage = this.apiAccountsService.updateAccount(this.subForm.requestType, this.input);
        var oldInput = localStorage.getItem(this.subForm.requestType);
        this.sage.subscribe(function (data) {
            //setNewData in Local Storage
            //console.log("data: " + JSON.stringify(this.sage));
            if (_this.subForm.requestType == 'password') {
                _this.response = "Good News! Multiverse successfully revolved to your needs! (Password sucessfully changed. Please login again.)";
                _this.spinToggle = false;
                setTimeout(function () {
                    _this.router.navigate(['login']);
                }, 3000);
            }
            else {
                localStorage.setItem(_this.subForm.requestType, data['data'][_this.subForm.requestType]);
                _this.response = "Good News! The Multiverse successfully revolved itself to your needs! Here's the update: Old --- " + oldInput + " New --- " + localStorage.getItem(_this.subForm.requestType);
                _this.spinToggle = false;
            }
        });
    };
    return AccountChangeFormComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AccountChangeFormComponent.prototype, "subForm", void 0);
AccountChangeFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-account-change-form',
        template: __webpack_require__(449),
        styles: [__webpack_require__(382)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__api_accounts_service__["a" /* APIAccountsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__api_accounts_service__["a" /* APIAccountsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _c || Object])
], AccountChangeFormComponent);

var _a, _b, _c;
//# sourceMappingURL=account-change-form.component.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sage_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__account_settings_service__ = __webpack_require__(295);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountSettingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { slideInDownAnimation } from '../animations';
var AccountSettingsComponent = (function () {
    function AccountSettingsComponent(sageUserService, accountSettingsService, router) {
        var _this = this;
        this.sageUserService = sageUserService;
        this.accountSettingsService = accountSettingsService;
        this.router = router;
        this.sage = {
            id: null,
            sagename: null,
            password: null,
            realname: null,
            email: null,
            created_at: null,
            updated_at: null,
        };
        this.subForm = {
            caption: null,
            showForm: false,
            requestType: null,
        };
        this.subscription = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__["Subscription"];
        this.subscriptionForm = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__["Subscription"];
        this.sageNameWarning = null;
        this.title = 'Loading...';
        this.subTitle = '';
        this.title = 'Dear Sage, ' + localStorage.getItem('sagename') + ':';
        this.subTitle = 'I\'m sorry that the Multiverse doesn\'t quite suit your needs. How may I adjust them?';
        this.subscriptionForm = this.accountSettingsService.getSubForm().subscribe(function (incomingSubForm) {
            _this.subForm = incomingSubForm;
        });
    }
    AccountSettingsComponent.prototype.ngOnInit = function () {
    };
    AccountSettingsComponent.prototype.updateSageName = function () {
        this.subForm.showForm = false;
        this.sageNameWarning = 'In Order To Change Your Sage Name: Please Contact System Admin at https://www.netdoodler.com (then hit contact from the menu)';
        //this.accountSettingsService.sendSubForm(this.subForm, this.sage.sagename);
    };
    AccountSettingsComponent.prototype.updatePassword = function () {
        this.subForm.showForm = true;
        this.subForm.requestType = "password";
        this.subForm.caption = 'Change Password';
        this.accountSettingsService.sendSubForm(this.subForm);
    };
    AccountSettingsComponent.prototype.updateRealName = function () {
        this.subForm.showForm = true;
        this.subForm.requestType = "realname";
        this.subForm.caption = 'Change Your Real Name (*Disclaimer: This does NOT legally change your real name!)';
        this.accountSettingsService.sendSubForm(this.subForm);
    };
    AccountSettingsComponent.prototype.updateEmail = function () {
        this.subForm.showForm = true;
        this.subForm.requestType = "email";
        this.subForm.caption = 'Change Email';
        this.accountSettingsService.sendSubForm(this.subForm);
    };
    AccountSettingsComponent.prototype.delete = function () {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') + '/delete']);
    };
    AccountSettingsComponent.prototype.back = function () {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]); //has to navigate and THEN trigger the broadcast singleton
    };
    return AccountSettingsComponent;
}());
AccountSettingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-account-settings',
        template: __webpack_require__(450),
        styles: [__webpack_require__(383)],
        providers: [__WEBPACK_IMPORTED_MODULE_6__account_settings_service__["a" /* AccountSettingsService */]]
        //animations: [slideInDownAnimation]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__sage_user_service__["a" /* SageUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__sage_user_service__["a" /* SageUserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__account_settings_service__["a" /* AccountSettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__account_settings_service__["a" /* AccountSettingsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _c || Object])
], AccountSettingsComponent);

var _a, _b, _c;
//# sourceMappingURL=account-settings.component.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountSettingsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AccountSettingsService = (function () {
    function AccountSettingsService() {
        this.subForm = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    AccountSettingsService.prototype.sendSubForm = function (subForm) {
        //console.log('sendSage() ' + JSON.stringify(sage));
        this.subForm.next(subForm);
    };
    AccountSettingsService.prototype.clearSubForm = function () {
        this.subForm.next();
    };
    AccountSettingsService.prototype.getSubForm = function () {
        //console.log('getSage() ' + JSON.stringify(this.sageSubject.asObservable));
        return this.subForm.asObservable();
    };
    return AccountSettingsService;
}());
AccountSettingsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], AccountSettingsService);

//# sourceMappingURL=account-settings.service.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Sage of the Multiverse: Universe Generator!';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(451),
        styles: [__webpack_require__(384)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular_font_awesome_angular_font_awesome__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_tooltip__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular_4_data_table__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular_4_data_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angular_4_data_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__universe_generator_universe_generator_component__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__tooltip__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__universe__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__universe_card__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__api_accounts_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__welcome_form_welcome_form_component__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__api_client_auth_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__card_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__sage_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__page_not_found_page_not_found_component__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__new_account_form_new_account_form_component__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__login_form_login_form_component__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__sage_home_sage_home_component__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__account_settings_account_settings_component__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__account_settings_account_change_form_account_change_form_component__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__delete_account_form_delete_account_form_component__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__sage_creation_sage_creation_component__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__view_sage_profile_view_sage_profile_component__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__sage_creation_race_selector_sub_form_race_selector_sub_form_component__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__card_collection_card_collection_component__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__universe_generator_stage_1_form_stage_1_form_component__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__universe_generator_stage_1_form_stage_2_form_stage_2_form_component__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__universe_generator_stage_1_form_stage_2_form_stage_3_form_stage_3_form_component__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__universe_generator_stage_1_form_stage_2_form_stage_3_form_stage_4_form_stage_4_form_component__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__universe_generator_stage_1_form_stage_2_form_stage_3_form_stage_4_form_render_universe_render_universe_component__ = __webpack_require__(161);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//modules









//components


//models



//services





//routes

















var appRoutes = [
    /*Note: Routes have to go 'in order', if you put '**' above all others it'll resolve to '**' first and show not found component.**/
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: __WEBPACK_IMPORTED_MODULE_15__welcome_form_welcome_form_component__["a" /* WelcomeFormComponent */] },
    { path: 'new-account', component: __WEBPACK_IMPORTED_MODULE_21__new_account_form_new_account_form_component__["a" /* NewAccountFormComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_22__login_form_login_form_component__["a" /* LoginFormComponent */] },
    { path: 'sagehome/:id', component: __WEBPACK_IMPORTED_MODULE_23__sage_home_sage_home_component__["a" /* SageHomeComponent */] },
    { path: 'sagehome/:id/settings', component: __WEBPACK_IMPORTED_MODULE_24__account_settings_account_settings_component__["a" /* AccountSettingsComponent */] },
    { path: 'sagehome/:id/delete', component: __WEBPACK_IMPORTED_MODULE_26__delete_account_form_delete_account_form_component__["a" /* DeleteAccountFormComponent */] },
    { path: 'sagehome/:id/sage-creation', component: __WEBPACK_IMPORTED_MODULE_27__sage_creation_sage_creation_component__["a" /* SageCreationComponent */] },
    { path: 'sagehome/:id/sage-profile', component: __WEBPACK_IMPORTED_MODULE_28__view_sage_profile_view_sage_profile_component__["a" /* ViewSageProfileComponent */] },
    { path: 'sagehome/:id/universe-generator', component: __WEBPACK_IMPORTED_MODULE_10__universe_generator_universe_generator_component__["a" /* UniverseGeneratorComponent */] },
    { path: 'sagehome/:id/card-collection', component: __WEBPACK_IMPORTED_MODULE_30__card_collection_card_collection_component__["a" /* CardCollectionComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_20__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */] },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_15__welcome_form_welcome_form_component__["a" /* WelcomeFormComponent */],
            __WEBPACK_IMPORTED_MODULE_20__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */],
            __WEBPACK_IMPORTED_MODULE_21__new_account_form_new_account_form_component__["a" /* NewAccountFormComponent */],
            __WEBPACK_IMPORTED_MODULE_22__login_form_login_form_component__["a" /* LoginFormComponent */],
            __WEBPACK_IMPORTED_MODULE_23__sage_home_sage_home_component__["a" /* SageHomeComponent */],
            __WEBPACK_IMPORTED_MODULE_24__account_settings_account_settings_component__["a" /* AccountSettingsComponent */],
            __WEBPACK_IMPORTED_MODULE_25__account_settings_account_change_form_account_change_form_component__["a" /* AccountChangeFormComponent */],
            __WEBPACK_IMPORTED_MODULE_26__delete_account_form_delete_account_form_component__["a" /* DeleteAccountFormComponent */],
            __WEBPACK_IMPORTED_MODULE_27__sage_creation_sage_creation_component__["a" /* SageCreationComponent */],
            __WEBPACK_IMPORTED_MODULE_28__view_sage_profile_view_sage_profile_component__["a" /* ViewSageProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_29__sage_creation_race_selector_sub_form_race_selector_sub_form_component__["a" /* RaceSelectorSubFormComponent */],
            __WEBPACK_IMPORTED_MODULE_30__card_collection_card_collection_component__["a" /* CardCollectionComponent */],
            __WEBPACK_IMPORTED_MODULE_10__universe_generator_universe_generator_component__["a" /* UniverseGeneratorComponent */],
            __WEBPACK_IMPORTED_MODULE_31__universe_generator_stage_1_form_stage_1_form_component__["a" /* Stage1FormComponent */],
            __WEBPACK_IMPORTED_MODULE_32__universe_generator_stage_1_form_stage_2_form_stage_2_form_component__["a" /* Stage2FormComponent */],
            __WEBPACK_IMPORTED_MODULE_33__universe_generator_stage_1_form_stage_2_form_stage_3_form_stage_3_form_component__["a" /* Stage3FormComponent */],
            __WEBPACK_IMPORTED_MODULE_34__universe_generator_stage_1_form_stage_2_form_stage_3_form_stage_4_form_stage_4_form_component__["a" /* Stage4FormComponent */],
            __WEBPACK_IMPORTED_MODULE_35__universe_generator_stage_1_form_stage_2_form_stage_3_form_stage_4_form_render_universe_render_universe_component__["a" /* RenderUniverseComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap__["a" /* AlertModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_19__angular_router__["a" /* RouterModule */].forRoot(appRoutes, { enableTracing: true } // <-- debugging purposes only
            ),
            __WEBPACK_IMPORTED_MODULE_5_angular_font_awesome_angular_font_awesome__["a" /* AngularFontAwesomeModule */],
            __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_tooltip__["a" /* TooltipModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__["a" /* ModalModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8_angular_4_data_table__["DataTableModule"],
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_14__api_accounts_service__["a" /* APIAccountsService */], __WEBPACK_IMPORTED_MODULE_16__api_client_auth_service__["a" /* APIClientAuthService */], __WEBPACK_IMPORTED_MODULE_18__sage_user_service__["a" /* SageUserService */], __WEBPACK_IMPORTED_MODULE_11__tooltip__["a" /* Tooltip */], __WEBPACK_IMPORTED_MODULE_17__card_service__["a" /* CardService */], __WEBPACK_IMPORTED_MODULE_12__universe__["a" /* Universe */], __WEBPACK_IMPORTED_MODULE_13__universe_card__["a" /* UniverseCard */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sage_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__card_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular_4_data_table__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular_4_data_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angular_4_data_table__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardCollectionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { DataTableParams } from '../../types/data-table-params.type';

var CardCollectionComponent = (function () {
    function CardCollectionComponent(router, sageUserService, cardService) {
        this.router = router;
        this.sageUserService = sageUserService;
        this.cardService = cardService;
        this.ability1Bonus = "";
        //universeCardCollection: UniverseCard[];
        this.cards = new Array();
        this.moves = new Array();
        this.spinToggle = false;
        this.buttonToggle = true;
        this.cardResource = new __WEBPACK_IMPORTED_MODULE_7_angular_4_data_table__["DataTableResource"](this.cards);
        this.cardCount = 0;
        this.energy = localStorage.getItem('Energy');
        // special params:
        this.translations = {
            indexColumn: 'Index column',
            expandColumn: 'Expand column',
            selectColumn: 'Select column',
            paginationLimit: 'Max results',
            paginationRange: 'Result range'
        };
        this.subscription = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__["Subscription"];
        this.subscription2 = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__["Subscription"];
        this.subscription3 = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__["Subscription"];
        this.title = 'Manage Your Multiverse';
        this.sub = null;
    }
    CardCollectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinToggle = true;
        this.subscription = this.cardService.getCardCollection(localStorage.getItem('sage_id')).subscribe(function (incomingCards) {
            //1. Grab the moves table
            _this.cardService.getMovesTable().subscribe(function (incomingMoves) {
                _this.cards = incomingCards;
                _this.moves = incomingMoves;
                //2. Replace the FK's with the actual move's name 
                //console.log('CARDS: ' + JSON.stringify(this.cards));
                //console.log('MOVES: ' + JSON.stringify(this.moves));
                for (var i = 0; i < _this.cards.length; i++) {
                    for (var j = 0; j < _this.moves.length; j++) {
                        if (_this.cards[i].FK_Move_1 == _this.moves[j].id) {
                            //console.log('Found Match Move 1');
                            _this.cards[i].FK_Move_1 = _this.moves[j].name + ":  Lvl " + _this.cards[i].Move1_Buff_Tally;
                        }
                        if (_this.cards[i].FK_Move_2 == _this.moves[j].id) {
                            //console.log('Found Match Move 2');
                            _this.cards[i].FK_Move_2 = _this.moves[j].name + ":  Lvl " + _this.cards[i].Move2_Buff_Tally;
                        }
                        if (_this.cards[i].FK_Move_3 == _this.moves[j].id) {
                            //console.log('Found Match Move 3');
                            _this.cards[i].FK_Move_3 = _this.moves[j].name + ":  Lvl " + _this.cards[i].Move3_Buff_Tally;
                            ;
                        }
                        if (_this.cards[i].FK_Move_4 == _this.moves[j].id) {
                            //console.log('Found Match Move 4');
                            _this.cards[i].FK_Move_4 = _this.moves[j].name + ":  Lvl " + _this.cards[i].Move4_Buff_Tally;
                            ;
                        }
                        if (_this.cards[i].FK_Move_Ultimate == _this.moves[j].id) {
                            //console.log('Found Match Move Ultimate');
                            _this.cards[i].FK_Move_Ultimate = _this.moves[j].name + ":  Lvl " + _this.cards[i].MoveUltimate_Buff_Tally;
                            ;
                        }
                    }
                }
                _this.cardResource = new __WEBPACK_IMPORTED_MODULE_7_angular_4_data_table__["DataTableResource"](_this.cards);
                _this.cardResource.count().then(function (count) { return _this.cardCount = count; });
                var params = { "sortBy": "name", "sortAsc": false, "offset": 0, "limit": 5 };
                _this.cardResource.query(params).then(function (cards) { return _this.cards = cards; });
                _this.spinToggle = false;
                _this.buttonToggle = false;
                //this.rowDoubleClick.emit({ row: 1, event: event });
                //let event = new MouseEvent('click');
                //this.reloadCards(event);
            }); //remember this does ALL error handling for this form
        });
        this.subscription2 = this.sageUserService.getError().subscribe(function (incomingError) {
            _this.error = "Couldn't Load Profile Data." + incomingError;
            _this.response = "Please Make Sure You Are Logged In.";
            _this.spinToggle = false;
        }); //remember this does ALL error handling for this form
    };
    CardCollectionComponent.prototype.reloadCards = function (params) {
        var _this = this;
        console.log("my params: " + JSON.stringify(params));
        this.cardResource.query(params).then(function (cards) { return _this.cards = cards; });
    };
    CardCollectionComponent.prototype.cellColor = function (car) {
        return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7) / 1.3) * 100)) + ')';
    };
    ;
    CardCollectionComponent.prototype.gatherSelected = function () {
        var selectedCards = new Array();
        this.cardsTable.selectedRows.forEach(function (aRow) {
            return selectedCards.push(aRow.item);
        });
        return selectedCards;
    };
    CardCollectionComponent.prototype.saveAll = function () {
    };
    /********************************************************************************************
    Gather all that's selected up into a selected array and pass that in to the delete function
    *********************************************************************************************/
    CardCollectionComponent.prototype.deleteAll = function () {
        var _this = this;
        var selectedCards = this.gatherSelected();
        if (selectedCards.length > 0) {
            this.spinToggle = true;
            this.buttonToggle = true;
            this.response = "Deleting Universes";
            var totalEnergy_1 = null;
            this.sub = this.cardService.destroyCards(selectedCards, localStorage.getItem('sage_id'));
            this.sub.subscribe(function (energy) {
                _this.ngOnInit(); //reload card table
                totalEnergy_1 = parseInt(_this.energy) + parseInt(energy);
                _this.energy = totalEnergy_1;
                _this.spinToggle = false;
                localStorage.setItem('Energy', totalEnergy_1.toString());
                _this.response = "Universes Successfully Deleted.  Refunded " + energy + " Energy!";
                console.log(JSON.stringify(energy));
            }, function (err) { return _this.sageUserService.sendError(err); });
        }
        else {
            this.response = "No cards Selected";
        }
        //refresh table after deletion
    };
    //returns move object based on FK
    CardCollectionComponent.prototype.fkToMoveObject = function (fk) {
    };
    CardCollectionComponent.prototype.back = function () {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]); //has to navigate and THEN trigger the broadcast singleton
    };
    return CardCollectionComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_7_angular_4_data_table__["DataTable"]),
    __metadata("design:type", Object)
], CardCollectionComponent.prototype, "cardsTable", void 0);
CardCollectionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-card-collection',
        template: __webpack_require__(452),
        styles: [__webpack_require__(385)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__sage_user_service__["a" /* SageUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__sage_user_service__["a" /* SageUserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__card_service__["a" /* CardService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__card_service__["a" /* CardService */]) === "function" && _c || Object])
], CardCollectionComponent);

var _a, _b, _c;
//# sourceMappingURL=card-collection.component.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_accounts_service__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeleteAccountFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DeleteAccountFormComponent = (function () {
    function DeleteAccountFormComponent(router, apiAccountsService) {
        this.router = router;
        this.apiAccountsService = apiAccountsService;
        this.title = '*****Sage Account Deletion*****';
        this.subTitle = 'Remember these actions cannot be UNDONE!';
        this.subTitle2 = '*Disclaimer*: Your real-life, AFK existence may have a slight chance of dissipating since you are removing yourself from the MULTIVERSE! SOMV holds no liability for these actions.';
        this.sage = null;
        this.sagename = null;
        this.password = null;
        this.realname = null;
        this.error = null;
        this.response = null;
        this.spinToggle2 = false;
    }
    DeleteAccountFormComponent.prototype.ngOnInit = function () {
    };
    DeleteAccountFormComponent.prototype.back = function () {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]); //has to navigate and THEN trigger the broadcast singleton
    };
    DeleteAccountFormComponent.prototype.confirmDelete = function () {
        var _this = this;
        this.response = 'The Multiverse is Erasing Your Existence....';
        this.sage = this.apiAccountsService.deleteAccount(this.sagename, this.password, this.realname);
        this.spinToggle2 = true;
        this.sage.subscribe(function (data) {
            //setNewData in Local Storage
            _this.spinToggle2 = false;
            _this.response = "Good News! You were successfully deleted from the Multiverse! The good news is if you are still reading this, that means you haven't dissipated!(......yet)"
                + "Account Deleted: " + JSON.stringify(data);
            setTimeout(function () {
                _this.router.navigate(['welcome']);
            }, 3000);
        }, function (err) {
            _this.error = "Sorry there was an error in deleting your account. Server Message: " + err.message +
                ".  Also make sure your fields are EXACTLY as you entered them when you originally created your account!";
            _this.spinToggle2 = false;
        });
    };
    return DeleteAccountFormComponent;
}());
DeleteAccountFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-delete-account-form',
        template: __webpack_require__(453),
        styles: [__webpack_require__(386)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__api_accounts_service__["a" /* APIAccountsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__api_accounts_service__["a" /* APIAccountsService */]) === "function" && _b || Object])
], DeleteAccountFormComponent);

var _a, _b;
//# sourceMappingURL=delete-account-form.component.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sage_account__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_accounts_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_client_auth_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sage_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_Subscription__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_Subscription__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LoginFormComponent = (function () {
    function LoginFormComponent(jsonPipe, apiAccountsService, apiClientAuthService, router, sageUserService) {
        this.jsonPipe = jsonPipe;
        this.apiAccountsService = apiAccountsService;
        this.apiClientAuthService = apiClientAuthService;
        this.router = router;
        this.sageUserService = sageUserService;
        this.subscription = new __WEBPACK_IMPORTED_MODULE_9_rxjs_Subscription__["Subscription"];
        this.title = "Login to Sage Account";
        this.sagename = null;
        this.password = null;
        this.response = null;
        this.spinToggle = false;
        this.sage = new __WEBPACK_IMPORTED_MODULE_2__sage_account__["a" /* SageAccount */];
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.apiAccountsService.getError().subscribe(function (incomingError) {
            _this.error = "Incorrect Login";
            _this.response = "Please Try Again.";
            _this.spinToggle = false;
        });
    };
    /**********************************************************************************************************************************
    /* TIP: Remember when you get the password credential, the response token WILL BE tied to the user and not just the app client in general!
    ************************************************************************************************************************************/
    LoginFormComponent.prototype.loginToAccount = function () {
        this.response = "Finding your way to the Multiverse......";
        this.spinToggle = true;
        this.apiAccountsService.login(this.sagename, this.password);
    };
    LoginFormComponent.prototype.test = function () {
        //this.sage['sagename'] = 'BOB';
        //this.sageUserService.sendSage(this.sage);
    };
    return LoginFormComponent;
}());
LoginFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login-form',
        template: __webpack_require__(454),
        styles: [__webpack_require__(387)],
        providers: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["JsonPipe"]],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["JsonPipe"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common__["JsonPipe"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__api_accounts_service__["a" /* APIAccountsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__api_accounts_service__["a" /* APIAccountsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__api_client_auth_service__["a" /* APIClientAuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__api_client_auth_service__["a" /* APIClientAuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__sage_user_service__["a" /* SageUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__sage_user_service__["a" /* SageUserService */]) === "function" && _e || Object])
], LoginFormComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=login-form.component.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Move; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Move = (function () {
    function Move() {
    }
    return Move;
}());
Move = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Move);

//# sourceMappingURL=move.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sage_account__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_accounts_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sage_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Subscription__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Subscription__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewAccountFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var NewAccountFormComponent = (function () {
    function NewAccountFormComponent(jsonPipe, apiAccountsService, router, sageUserService) {
        this.jsonPipe = jsonPipe;
        this.apiAccountsService = apiAccountsService;
        this.router = router;
        this.sageUserService = sageUserService;
        this.subscription = new __WEBPACK_IMPORTED_MODULE_8_rxjs_Subscription__["Subscription"];
        this.title = 'Create Your New Sage Account';
        this.newSageInfo = new __WEBPACK_IMPORTED_MODULE_2__sage_account__["a" /* SageAccount */];
        this.sageNameError = null;
        this.spinToggle = false;
        this.sageRequest = {
            id: null,
            sagename: null,
            password: null,
            realname: null,
            email: null,
            created_at: null,
            updated_at: null
        }; //if you don't instantiate these you get an error :/
    }
    NewAccountFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.apiAccountsService.getError().subscribe(function (incomingError) {
            _this.sageNameError = "Server Error: " + incomingError.message;
            _this.response = "Please Try Again.";
            _this.spinToggle = false;
        });
        //this.apiAccountsService.handleError.subscribe(error => {
        //console.log(error)
        //this.error = error;
        //})
    };
    /**
     * Gets app authorization token from api and then uses that token to create user, then uses new user's credentials to get a new password authorization token
     */
    NewAccountFormComponent.prototype.createNewAccount = function () {
        this.response = "Directing a new Sage to the Multiverse (Loading)...";
        this.spinToggle = true;
        this.apiAccountsService.createAccount(this.sageRequest);
    };
    return NewAccountFormComponent;
}());
NewAccountFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-new-account-form',
        template: __webpack_require__(455),
        styles: [__webpack_require__(388)],
        providers: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["JsonPipe"]],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["JsonPipe"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common__["JsonPipe"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__api_accounts_service__["a" /* APIAccountsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__api_accounts_service__["a" /* APIAccountsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__sage_user_service__["a" /* SageUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__sage_user_service__["a" /* SageUserService */]) === "function" && _d || Object])
], NewAccountFormComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=new-account-form.component.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    return PageNotFoundComponent;
}());
PageNotFoundComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-page-not-found',
        template: __webpack_require__(456),
        styles: [__webpack_require__(389)]
    }),
    __metadata("design:paramtypes", [])
], PageNotFoundComponent);

//# sourceMappingURL=page-not-found.component.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__race__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sage__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tooltip__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sage_creation_service__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subscription__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Subscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sage_user_service__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RaceSelectorSubFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var RaceSelectorSubFormComponent = (function () {
    function RaceSelectorSubFormComponent(sageUserService, sageCreationService, router, race, tooltip) {
        var _this = this;
        this.sageUserService = sageUserService;
        this.sageCreationService = sageCreationService;
        this.router = router;
        this.race = race;
        this.tooltip = tooltip;
        this.subscription = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subscription__["Subscription"];
        this.subscription2 = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subscription__["Subscription"];
        this.isValid = false;
        this.title = "Choose Your Race";
        this.subTitle = "Primary Attributes";
        this.subTitle2 = "Approximate 3D Image Representation";
        this.attributeDescription = "Physical attributes we value such as strength and dexterity are not attributes relevant to a Sage of the Multiverse.  However, the six most important attributes that do matter to a Sage's character while transversing the Multiverse are the six \"In\'s\": Intuition, Inquisitiveness, Ingenuity, Invigoration, Intelligence, and finally the ability to not go Insane from the phenomena! Hover your cursor below (or hold your thumb over) the attribute and read the tooltip for a more complete in-game description.";
        this.imageDescription = "The Multiverse says to you, \"My Dear Lord, since you are just a lowly human mortal living in only 4-dimensions, most of these pictures I now show you are just very poor approximations of what these 5 dimensional races would look like in your primitive 4 dimensionality (Well, 3 not counting time, and 2 since you are most likely viewing this from a \"flat\" screen). Since I'm working against this significant handicap, I've added my own adjustments to help you relate to these pictures easier: I've re-shapened most of these Sages into a humanoid shape. Just remember, humanoid is not the true shape of most of these Sages.  Irregardless, you need to find an image that you would like to represent your presence in the Multiverse.\"";
        this.sage = new __WEBPACK_IMPORTED_MODULE_2__sage__["a" /* Sage */];
        this.spinToggle = false;
        this.spinToggle2 = false;
        // isLocked;
        this.maxRaceID = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].maxRaceID;
        this.minRaceID = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].minRaceID;
        this.currentRaceID = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].minRaceID;
        this.whichImage = 1;
        this.race.race_name = "Loading Race...";
        this.spinToggle2 = true;
        this.subscription = this.sageUserService.getRaceInfo(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].minRaceID).subscribe(function (incomingRace) {
            _this.race = incomingRace;
            _this.minRaceIntuition = parseInt(_this.race.base_intuition);
            _this.minRaceIngenuity = parseInt(_this.race.base_ingenuity);
            _this.minRaceInquisitiveness = parseInt(_this.race.base_inquisition);
            _this.minRaceIntelligence = parseInt(_this.race.base_intelligence);
            _this.minRaceInvigoration = parseInt(_this.race.base_invigoration);
            _this.minRaceInsanityControl = parseInt(_this.race.base_insanity_control);
            _this.maxBonusPoints = parseInt(_this.race.bonus_points_at_creation);
            _this.imageURL = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].baseImagePath + _this.race.image_1;
            _this.spinToggle2 = false;
            // this.isLocked = this.race.is_locked;
        });
        this.subscription2 = this.sageUserService.getTooltipInfo().subscribe(function (incomingTip) {
            _this.tooltip = incomingTip;
            _this.tipIntuition = _this.tooltip[0].description;
            console.log("TIP" + _this.tipIntuition);
            _this.tipInquisitiveness = _this.tooltip[1].description;
            _this.tipIntelligence = _this.tooltip[2].description;
            _this.tipIngenuity = _this.tooltip[3].description;
            _this.tipInsanityControl = _this.tooltip[4].description;
            _this.tipInvigoration = _this.tooltip[5].description;
            _this.tipPrimaryAttributes = _this.tooltip[6].description;
            _this.tipEnergy = _this.tooltip[7].description;
            _this.tipDimensionalWake = _this.tooltip[8].description;
            _this.tipBonusPointsAtCreation = _this.tooltip[9].description;
        });
    }
    RaceSelectorSubFormComponent.prototype.ngOnInit = function () {
    };
    RaceSelectorSubFormComponent.prototype.nextRace = function () {
        var currentRaceID = this.currentRaceID + 1;
        //1. If the counter exceeds the max ID there is reset it to minID.
        if (currentRaceID > this.maxRaceID) {
            this.currentRaceID = this.minRaceID;
        }
        else {
            this.currentRaceID = this.currentRaceID + 1;
        }
        this.switchRace();
    };
    RaceSelectorSubFormComponent.prototype.previousRace = function () {
        var currentRaceID = this.currentRaceID - 1;
        //console.log("Current RaceID: " + JSON.stringify(currentRaceID));
        //1. If the counter exceeds the min ID there is reset it to maxID.
        if (currentRaceID < this.minRaceID) {
            this.currentRaceID = this.maxRaceID;
        }
        else {
            this.currentRaceID = this.currentRaceID - 1;
        }
        this.switchRace();
    };
    RaceSelectorSubFormComponent.prototype.switchRace = function () {
        var _this = this;
        this.spinToggle2 = true;
        console.log("RaceID: " + JSON.stringify(this.currentRaceID)); //need to subscribe HERE to show this
        this.subscription = this.sageUserService.getRaceInfo(this.currentRaceID).subscribe(function (incomingRace) {
            _this.race = incomingRace;
            _this.minRaceIntuition = parseInt(_this.race.base_intuition);
            _this.minRaceIngenuity = parseInt(_this.race.base_ingenuity);
            _this.minRaceInquisitiveness = parseInt(_this.race.base_inquisition);
            _this.minRaceIntelligence = parseInt(_this.race.base_intelligence);
            _this.minRaceInvigoration = parseInt(_this.race.base_invigoration);
            _this.minRaceInsanityControl = parseInt(_this.race.base_insanity_control);
            _this.maxBonusPoints = parseInt(_this.race.bonus_points_at_creation);
            _this.imageURL = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].baseImagePath + _this.race.image_1;
            _this.whichImage = 1;
            _this.spinToggle2 = false;
            _this.checkEnable();
        });
    };
    RaceSelectorSubFormComponent.prototype.increaseStat = function (whichStat) {
        var bonusPoints = parseInt(this.race.bonus_points_at_creation);
        var intuition = parseInt(this.race.base_intuition);
        var ingenuity = parseInt(this.race.base_ingenuity);
        var inquisitiveness = parseInt(this.race.base_inquisition);
        var intelligence = parseInt(this.race.base_intelligence);
        var invigoration = parseInt(this.race.base_invigoration);
        var insanityControl = parseInt(this.race.base_insanity_control);
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
    };
    RaceSelectorSubFormComponent.prototype.decreaseStat = function (whichStat) {
        var bonusPoints = parseInt(this.race.bonus_points_at_creation);
        var intuition = parseInt(this.race.base_intuition);
        var ingenuity = parseInt(this.race.base_ingenuity);
        var inquisitiveness = parseInt(this.race.base_inquisition);
        var intelligence = parseInt(this.race.base_intelligence);
        var invigoration = parseInt(this.race.base_invigoration);
        var insanityControl = parseInt(this.race.base_insanity_control);
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
    };
    RaceSelectorSubFormComponent.prototype.nextImage = function () {
        this.whichImage++;
        if (this.whichImage > __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].maxImagesPerRace) {
            this.whichImage = 1;
        }
        if (this.whichImage == 1) {
            this.imageURL = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].baseImagePath + this.race.image_1;
        }
        if (this.whichImage == 2) {
            this.imageURL = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].baseImagePath + this.race.image_2;
        }
        if (this.whichImage == 3) {
            this.imageURL = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].baseImagePath + this.race.image_3;
        }
    };
    RaceSelectorSubFormComponent.prototype.previousImage = function () {
        this.whichImage--;
        if (this.whichImage < 1) {
            this.whichImage = 3;
        }
        if (this.whichImage == 1) {
            this.imageURL = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].baseImagePath + this.race.image_1;
        }
        if (this.whichImage == 2) {
            this.imageURL = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].baseImagePath + this.race.image_2;
        }
        if (this.whichImage == 3) {
            this.imageURL = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].baseImagePath + this.race.image_3;
        }
    };
    RaceSelectorSubFormComponent.prototype.confirm = function () {
        var _this = this;
        this.response = "Creating a New Sage...";
        this.spinToggle = true;
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
        this.subscription = this.sageCreationService.sendFinalSageInfo(this.sage).subscribe(function (incomingSage) {
            _this.sage = incomingSage;
            _this.response = "New Sage Profile Created! Redirecting....";
            _this.sageUserService.setLocalSageStorage(_this.sage);
            _this.back();
        });
        /*
         Stuff needed to submit
         6 primary stats
         Level 1
         Sage_Created 1
         Chosen_Image (the url)
         */
    };
    RaceSelectorSubFormComponent.prototype.checkEnable = function () {
        console.log('Observing: bonuspointsatcreation' + this.race.bonus_points_at_creation);
        if (parseInt(this.race.bonus_points_at_creation) < 1 && this.race.is_locked != '1') {
            this.isValid = true;
        }
        else {
            this.isValid = false;
        }
    };
    RaceSelectorSubFormComponent.prototype.back = function () {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]); //has to navigate and THEN trigger the broadcast singleton
    };
    return RaceSelectorSubFormComponent;
}());
RaceSelectorSubFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-race-selector-sub-form',
        template: __webpack_require__(457),
        styles: [__webpack_require__(390)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8__sage_user_service__["a" /* SageUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__sage_user_service__["a" /* SageUserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__sage_creation_service__["a" /* SageCreationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__sage_creation_service__["a" /* SageCreationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__race__["a" /* Race */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__race__["a" /* Race */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__tooltip__["a" /* Tooltip */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__tooltip__["a" /* Tooltip */]) === "function" && _e || Object])
], RaceSelectorSubFormComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=race-selector-sub-form.component.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sage_creation_service__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__race__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SageCreationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SageCreationComponent = (function () {
    //all the main form does is the error reporting..
    function SageCreationComponent(sageCreationService) {
        this.sageCreationService = sageCreationService;
        this.subscription = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__["Subscription"];
        this.title = 'Create Your Multiverse Sage!';
        this.subTitle = 'Choose Your Race';
    }
    SageCreationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.sageCreationService.getError().subscribe(function (incomingError) {
            _this.error = "Couldn't Load or Send Race Data.";
            _this.response = "Please Make Sure You Are Logged In.";
        });
    };
    return SageCreationComponent;
}());
SageCreationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-sage-creation',
        template: __webpack_require__(458),
        styles: [__webpack_require__(391)],
        providers: [__WEBPACK_IMPORTED_MODULE_5__race__["a" /* Race */], __WEBPACK_IMPORTED_MODULE_3__sage_creation_service__["a" /* SageCreationService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__sage_creation_service__["a" /* SageCreationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sage_creation_service__["a" /* SageCreationService */]) === "function" && _a || Object])
], SageCreationComponent);

var _a;
//# sourceMappingURL=sage-creation.component.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sage_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(17);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SageHomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SageHomeComponent = (function () {
    function SageHomeComponent(sageUserService, router) {
        this.sageUserService = sageUserService;
        this.router = router;
        this.sage = {
            id: null,
            sagename: null,
            password: null,
            realname: null,
            email: null,
            created_at: null,
            updated_at: null
        };
        this.isValid = false;
        this.subscription = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__["Subscription"];
        this.response = null;
        this.title = 'Loading...';
    }
    SageHomeComponent.prototype.ngOnInit = function () {
        if (parseInt(localStorage.getItem('Sage_Created')) == 0) {
            this.buttonToggle = true;
        }
        else {
            this.buttonToggle = false;
        }
        ;
        console.log(this.buttonToggle);
        console.log("Sage created: " + JSON.stringify(localStorage.getItem('Sage_Created')));
        this.title = 'Welcome Sage ' + localStorage.getItem('sagename') + ', to the Multiverse!'; //this still throws false console error for some reason
    };
    SageHomeComponent.prototype.test = function () {
        //
    };
    SageHomeComponent.prototype.navigateToSettings = function () {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') + '/settings']);
    };
    SageHomeComponent.prototype.navigateToUniverseGenerator = function () {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') + '/universe-generator']);
    };
    SageHomeComponent.prototype.navigateToSageCreation = function () {
        console.log("Current Auth Token: " + localStorage.getItem['access_token']);
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') + '/sage-creation']);
    };
    SageHomeComponent.prototype.navigateToSageProfile = function () {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') + '/sage-profile']);
    };
    SageHomeComponent.prototype.navigateToCardCollection = function () {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id') + '/card-collection']);
    };
    return SageHomeComponent;
}());
SageHomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-sage-home',
        template: __webpack_require__(459),
        styles: [__webpack_require__(392)],
    })
    /*In Angular it looks like data is transmitted through components completely async with subscriptions, so
    read http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject and do it this way.
    Annoying than a simple value pass, but far more powerful hopefully!*/
    ,
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__sage_user_service__["a" /* SageUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__sage_user_service__["a" /* SageUserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _b || Object])
], SageHomeComponent);

var _a, _b;
//# sourceMappingURL=sage-home.component.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tally; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Tally = (function () {
    function Tally() {
    }
    return Tally;
}());
Tally = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Tally);

//# sourceMappingURL=tally.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sage_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UniverseFetcherService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { APIFetcherFormComponent} from './apifetcher-form/apifetcher-form.component';



var UniverseFetcherService = (function () {
    function UniverseFetcherService(http, sageUserService) {
        this.http = http;
        this.sageUserService = sageUserService;
        this.NASA_KEY = 'fwMu6AQOR7jmwOtQkPwqMUKyXFssJLRbk90caHor';
        this.GMAIL_KEY = 'AIzaSyABHAdaAQrKCdZBg5y0i9UEp1RQfyk7Ef4';
        this.GMAIL_OAUTH_KEY = '769416451298-nika55bcqu3ecgdh11t5fulmslodlcsp.apps.googleusercontent.com';
        this.GMAIL_CLIENT_SECRET_KEY = 'U0Ds5vksMQm-7IlwDSFgDZMF';
        //private dataUrl = 'https://jsonplaceholder.typicode.com/posts';
        //private dataURL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=' + this.NASA_KEY;  //default URL
        //bad url requests can generate the "falsely Universe" card instead of an error message
        this.dataURL = 'https://www.googleapis.com/gmail/v1/users/maestroanth%40gmail.com/profile?Access_token=' + this.GMAIL_OAUTH_KEY;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({});
    }
    //'Access-Control-Allow-Origin': '*',
    //'Access-Control-Allow-Method': 'GET',
    //'Content-Type': 'application/json', 
    //'Accept': 'application/json',
    UniverseFetcherService.prototype.getOutsideData = function (url) {
        var _this = this;
        url = 'https://' + url;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({}); //delete all headers so it doesn't send preflight
        this.response = this.http.get(url, { headers: this.headers })
            .map(function (res) { return _this.response = res; }).retryWhen(function (attempts) { return attempts.zip(__WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].range(1, 4))
            .flatMap(function (_a) {
            var error = _a[0], i = _a[1];
            if (i > 3) {
                return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].throw(error.json().error || 'Server error');
            }
            console.log('delay retry by ' + i + ' second(s)');
            return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].timer(i * 3100);
        }); });
        this.response.subscribe(function (data) {
        }, function (err) { return _this.sageUserService.sendError(err); });
        //console.log("Local Race Variable: " + JSON.stringify(this.response));
        return this.response;
    };
    /***********************************************************************************************************************************
Get Keywords
***********************************************************************************************************************************/
    UniverseFetcherService.prototype.getKeywords = function () {
        var _this = this;
        //console.log(sagename + password + realname);
        //1.
        this.url = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].baseAPIUrl + 'api/keywords'; //remember leaving a trailing slash screws up the options route with an error 301 (redirect) message
        var token = localStorage.getItem('access_token');
        this.headers.set('Authorization', 'Bearer ' + token.replace('"', ''));
        //2.
        this.response = this.http.get(this.url, { headers: this.headers })
            .map(function (res) { return _this.response = res.json(); }).retryWhen(function (attempts) { return attempts.zip(__WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].range(1, 4))
            .flatMap(function (_a) {
            var error = _a[0], i = _a[1];
            if (i > 3) {
                return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].throw(error.json().error || 'Server error');
            }
            console.log('delay retry by ' + i + ' second(s)');
            return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].timer(i * 3100);
        }); });
        this.response.subscribe(function (data) {
        }, function (err) { return _this.sageUserService.sendError(err); });
        //console.log("Local Race Variable: " + JSON.stringify(this.response));
        return this.response;
    }; /**deleteAccount(formType)**/
    return UniverseFetcherService;
}());
UniverseFetcherService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__sage_user_service__["a" /* SageUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__sage_user_service__["a" /* SageUserService */]) === "function" && _b || Object])
], UniverseFetcherService);

var _a, _b;
//# sourceMappingURL=universe-fetcher.service.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__universe_fetcher_service__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__card_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__universe__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__universe_card__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subscription__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Subscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sage_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tally__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__stage_1_form_stage_1_form_component__ = __webpack_require__(158);
/* unused harmony export Get */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UniverseGeneratorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var Get = (function () {
    function Get() {
    }
    return Get;
}());

var UniverseGeneratorComponent = (function () {
    function UniverseGeneratorComponent(jsonPipe, universeFetcherService, router, cardService, universe, universeCard, sageUserService) {
        this.jsonPipe = jsonPipe;
        this.universeFetcherService = universeFetcherService;
        this.router = router;
        this.cardService = cardService;
        this.universe = universe;
        this.universeCard = universeCard;
        this.sageUserService = sageUserService;
        this.stage1Form = {
            showForm: false,
            tallyList: new Array(),
            topUniverses: new Array(),
            cost: 5,
            faultyUniverse: 0,
            availableEnergy: 0,
            birthURL: "",
            showCostFaulty: true,
        };
        this.get = {
            url: 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY',
            type: 'JSON'
        };
        this.spinToggle = false;
        this.mainForm = true;
        this.title = 'Fill out this form to begin creating a universe from any website!';
        this.subTitle = "Remember there are no card sets in SOMV: Universe Generator. Every universe card you create will be unique just for you!";
        this.buttonToggle = false;
        //tallyList = new Array<Tally>();
        this.universes = new Array();
        this.keywords = new Array();
        this.subscription = new __WEBPACK_IMPORTED_MODULE_7_rxjs_Subscription__["Subscription"];
        this.subscriptionForm = new __WEBPACK_IMPORTED_MODULE_7_rxjs_Subscription__["Subscription"];
        /*
        + 'Some sites may create incredibly rare universes that may have the laws of physics so finely-tuned that they even support intelligent life. Maybe even life that can exist without pain or suffering (take that GOD, ;P ) '
        + 'However, other universes could be just complete duds that get suck right back into their own moments of creation through having too strong of gravity or whatever.... '
        */
        this.tutorial = 'Here you can build your own unique universes by running any web request through the generator. '
            + 'Every web address creates a different universe from which you can then customize! (inspired by the Playstation game: Monster Rancher)';
        this.description = 'Are you the type of Sage that would like to create a morally perfect '
            + ' Universe where life lives infinitely in harmonic bliss? Or are you the type of Sage that believes life with perfect bliss would be far too boring and needs a '
            + ' "little evil" and "suffering" in order for it to be interesting?  Or maybe you are the type of Sage that says to hell with the laws of physics and desires to build a '
            + ' Universe where the laws are random and make no or limited sense! Or maybe you would like a Universe where stuff like "magic" or "divine intervention" ARE part of the '
            + ' laws of physics? '
            + ' The decisions are yours Sage, ' + localStorage.getItem('sagename') + ' of the Multiverse!!!!';
    }
    UniverseGeneratorComponent.prototype.ngOnInit = function () {
        var _this = this;
        //console.log(this.apiGetFetcherService.getData().subscribe(val => console.log(val)));
        this.stage1Form.availableEnergy = parseInt(localStorage.getItem('Energy'));
        console.log('Available Energy: ' + this.stage1Form.availableEnergy);
        this.subscription = this.sageUserService.getError().subscribe(function (incomingError) {
            _this.spinToggle = false;
            _this.buttonToggle = false;
            _this.error = "Couldn't Load Data.";
        }); //remember this does ALL error handling for this app
    };
    /************************************************
    * Starts Everything on Button Click
    ***************************************************/
    UniverseGeneratorComponent.prototype.showData = function () {
        var _this = this;
        if (this.inputURL) {
            if (4 < this.stage1Form.availableEnergy) {
                //this.subscription = 'Congratulations, a new Universe has been added to your Multiverse!' + this.universeFetcherService.getOutsideData(this.inputURL, this.inputType);
                this.response = 'Using some advanced "String Theory" (lol, pun intended) to break your website\'s data down into some Basic Building Blocks for a New Universe.....';
                console.log("**Note by Author (Sage Anth): ** -> By advanced \"String Theory\" I of course mean just some fancy regex parsing of strings...what do you think? A dumb little programmer like me would actually know REAL String Theory?! ;P ");
                this.mainForm = false;
                this.spinToggle = true;
                this.buttonToggle = true;
                this.subscription = this.universeFetcherService.getOutsideData(this.inputURL).subscribe(function (incomingData) {
                    //this.response = incomingData.text();
                    _this.stage1Form.birthURL = _this.inputURL;
                    _this.genUniverseByKeyword(incomingData.text());
                });
            }
            else {
                this.error = 'The Multiverse says to you, "Dear Sage, I apologize, but it looks like you do not have the Energy required to make a Universe!"';
            }
        }
        else {
            this.response = 'Please enter URL';
            this.spinToggle = false;
            this.buttonToggle = false;
            //show error
        }
        //console.log(this.someData);
        //let parsingData = JSON.stringify(this.someData);
        //JSON.parse(this.returnData);
    };
    /************************************************
    * Parses HTML string and compares to keyword DB
    ***************************************************/
    UniverseGeneratorComponent.prototype.genUniverseByKeyword = function (inputData) {
        var _this = this;
        this.stage1Form.tallyList = [];
        this.cardService.getAllUniverses().subscribe(function (incomingUniverses) {
            _this.universes = incomingUniverses;
            for (var i = 0; i < _this.universes.length; i++) {
                var tally = new __WEBPACK_IMPORTED_MODULE_9__tally__["a" /* Tally */];
                tally['FK'] = _this.universes[i]['id'];
                tally['tally'] = 0;
                _this.stage1Form.tallyList.push(tally);
                //console.log('Tally: ' + this.tallyList[i]['FK']);
            }
            _this.universeFetcherService.getKeywords().subscribe(function (incomingKeywords) {
                _this.keywords = incomingKeywords;
                var sanitizedString = inputData.replace(/\W/g, ' ');
                sanitizedString = sanitizedString.replace(/[0-9]/g, '');
                sanitizedString = sanitizedString.toLowerCase();
                //console.log('String: ' + sanitizedString);
                var words = sanitizedString.split(" ");
                for (var i = 0; i < words.length; i++) {
                    words[i] = words[i].trim();
                    //match it to a parse section of the string
                    for (var j = 0; j < _this.keywords.length; j++) {
                        _this.keywords[j]['keyword'] = _this.keywords[j]['keyword'].trim();
                        if (words[i] == _this.keywords[j]['keyword']) {
                            // console.log("Found Match!: " + words[i]);
                            //add tally
                            for (var k = 0; k < _this.stage1Form.tallyList.length; k++) {
                                //console.log(this.tallyList[k]['FK'] + 'keyword FK' + this.keywords[j]['FK']);
                                if (_this.stage1Form.tallyList[k]['FK'] == _this.keywords[j]['FK']) {
                                    _this.stage1Form.tallyList[k]['tally']++;
                                    //console.log("added tally");
                                    //console.log("Added tally to FK: " + this.tallyList[k]['FK'] + " Tally Count: " + this.tallyList[k]['tally'] + " For Matching Word: " + words[i]);
                                }
                            }
                        }
                    }
                    _this.response = '';
                    _this.buttonToggle = false;
                    _this.spinToggle = false;
                }
                _this.setTopUniverses();
                _this.stage1.tallyToPercent();
                _this.stage1Form.showForm = true;
            }); //sub 2
        }); //sub 1
    };
    /************************************************
    * To Test Output
    ***************************************************/
    UniverseGeneratorComponent.prototype.outputTallyCount = function () {
        this.response = '';
        for (var l = 0; l < this.stage1Form.tallyList.length; l++) {
            console.log("Tally FK: " + this.stage1Form.tallyList[l]['FK']);
            console.log("Tally Number: " + this.stage1Form.tallyList[l]['tally']);
            this.response = this.response + " Tally FK: " + this.stage1Form.tallyList[l]['FK'] + " Tally Number: " + this.stage1Form.tallyList[l]['tally'] + ' ::';
        }
    };
    /************************************************
    * Sets top amount
    ***************************************************/
    UniverseGeneratorComponent.prototype.setTopUniverses = function () {
        var topUniverses = new Array();
        var numberOfTopUniverses = 3;
        /*
        * Add Custom Multiplier to Tallies (so far the multiplier is all even, but later on I may want to weight the odds)
        */
        for (var m = 0; m < this.stage1Form.tallyList.length; m++) {
            for (var n = 0; n < this.universes.length; n++) {
                if (this.universes[n]['id'] == this.stage1Form.tallyList[m]['FK']) {
                    this.stage1Form.tallyList[m]['tally'] = this.stage1Form.tallyList[m]['tally'] * this.universes[n]['Multiplier'];
                }
            }
        }
        /*
        *Sort Tallies
        */
        for (var i = 0; i < this.stage1Form.tallyList.length; i++) {
            for (var j = i + 1; j < this.stage1Form.tallyList.length; j++) {
                if (this.stage1Form.tallyList[i]['tally'] < this.stage1Form.tallyList[j]['tally']) {
                    var temp = this.stage1Form.tallyList[i];
                    this.stage1Form.tallyList[i] = this.stage1Form.tallyList[j];
                    this.stage1Form.tallyList[j] = temp;
                }
            }
        }
        /*
        * Setting Objects from tally count to send to stage1Form. This bit of code assumes the top 3 are already known (in descending order) given the bubblesort above
        */
        for (var k = 0; k < numberOfTopUniverses; k++) {
            for (var l = 0; l < this.universes.length; l++) {
                if (this.universes[l]['id'] == this.stage1Form.tallyList[k]['FK']) {
                    this.stage1Form.topUniverses.push(this.universes[l]);
                }
            }
        }
        //this.outputTallyCount(); //TEST OUTPUT
    };
    /************************************************
    * To Test Card
    ***************************************************/
    UniverseGeneratorComponent.prototype.addTestCard = function () {
        var _this = this;
        var universeID = 1001; //This will ultimately be derived from the URL
        //1.
        this.cardService.getUniverseInfo(universeID).subscribe(function (incomingUniverse) {
            _this.universe = incomingUniverse;
            //console.log(JSON.stringify(this.universe));
            //2.
            _this.universeCard.FK_base_universe = _this.universe.id;
            _this.universeCard.name = _this.universe.name;
            _this.universeCard.description = _this.universe.description;
            var image = _this.universe.image_path;
            _this.universeCard.Force_Name_1 = _this.universe.Force_1;
            _this.universeCard.Force_Name_2 = _this.universe.Force_2;
            _this.universeCard.Force_Name_3 = _this.universe.Force_3;
            _this.universeCard.Strength_Force_1 = _this.universe.Force_Str_1;
            _this.universeCard.Strength_Force_2 = _this.universe.Force_Str_2;
            _this.universeCard.Strength_Force_3 = _this.universe.Force_Str_3;
            _this.universeCard.Concept_Name_1 = _this.universe.Concept_1;
            _this.universeCard.Concept_Name_2 = _this.universe.Concept_2;
            _this.universeCard.Concept_Name_3 = _this.universe.Concept_3;
            var newConcept1Strength = parseInt(_this.universe.Concept_Str_1) + 1;
            _this.universeCard.Strength_Concept_1 = newConcept1Strength.toString();
            _this.universeCard.Strength_Concept_2 = _this.universe.Concept_Str_2;
            _this.universeCard.Strength_Concept_3 = _this.universe.Concept_Str_3;
            _this.universeCard.FK_Move_1 = _this.universe.FK_Move_1_Default;
            _this.universeCard.FK_Move_2 = _this.universe.FK_Move_2_Default;
            _this.universeCard.FK_Move_3 = _this.universe.FK_Move_3_Default;
            _this.universeCard.FK_Move_4 = _this.universe.FK_Move_4_Default;
            _this.universeCard.FK_Move_Ultimate = _this.universe.FK_Move_Ultimate_Default;
            console.log('Birth URL: ' + _this.inputURL);
            _this.universeCard.Birth_URL = "https://testURL.com";
            _this.cardService.postNewCard(_this.universeCard, localStorage.getItem('sage_id'));
        });
    };
    UniverseGeneratorComponent.prototype.back = function () {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]); //has to navigate and THEN trigger the broadcast singleton
    };
    return UniverseGeneratorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_10__stage_1_form_stage_1_form_component__["a" /* Stage1FormComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_10__stage_1_form_stage_1_form_component__["a" /* Stage1FormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__stage_1_form_stage_1_form_component__["a" /* Stage1FormComponent */]) === "function" && _a || Object)
], UniverseGeneratorComponent.prototype, "stage1", void 0);
UniverseGeneratorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-universe-generator',
        template: __webpack_require__(465),
        styles: [__webpack_require__(398)],
        providers: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["JsonPipe"], __WEBPACK_IMPORTED_MODULE_2__universe_fetcher_service__["a" /* UniverseFetcherService */]]
    })
    /*Abstract Logic Mapping For Generator Design
    
        Set-up: Have an optional access token parameter
    
        Three Stages:
    
        Energy will be = to $$$ and subscribed users get more daily energy or whatever to use.
        Extra Universes can be deleted for a partial energy refund to help avoid bitching.
    
        Users can enter in any url request
    
        Stage 1:
        A 'pre'-diagnosis of the url will comeback with an energy cost. Most Universes will cost about some arbitrary amount
        of energy (say 10).
    
        If a 'rare' url is entered then the comeback with an energy cost will be higher, but it is still gamble that a rare
        Universe isn't a guarantee.
    
        For rare url's I can either hand pick a few, or have some parsing logic behind that determines the rarity. Currently
        I'm thinking the former to keep in a DB table of some sort to at least keep track of the super rares.
    
        The point is, I want the 'rare' url's to rotate from time to time on a daily to monthly rotation (maybe even to the hour).
        I can even automate this. This stuff I may keep secret.
    
        Stage 2:
        User can adjust the odds by spending more Energy.
    
        Stage 3:
        I do want parsing logic mainly for determining the final stats after the 'base' universe is selected.
    
        And after that give the user some flexibility in further adjusting the stats or moves at the cost of energy. After each stat
        upgrade
        there will also be a separate probability of 'screwing up' the fine tuning which will result in a "Faulty Universe" and they
        lose the Universe.  This probability gets higher as the more upgraded the Universe becomes.
        *I can have the sage's Intuition influence the probabilty*
    
        The user can pay energy to 'reverse time' and re-roll the "Faulty Universe".
        They can do this up to 5 times. I may decide to have the 5th time be auto-success or auto-failure.
    
        If Universes were really high and resulted in faulty universes, I'll probably make them redeemable for higher energy, but never
        as much as they originally spent. Or I can give 'mark' the faulty universe for a 2nd chance to rebuild it with all the upgrades
        at a cheaper energy cost or something.
    
        A good rare universe should cost around $5.  A good common around $1. I can make also super rare ones possible where the market can decide through online trades.
    
        I'd like to make super rare universe cards that can be worth $100's too that costs $1000's to make or hours of playtime...
    
        How To Build:
        Method 1 (Keyword strategy):
        1. Create a keyword table in the DB with FK's to universes.
    
        2. Write some string parsing logic that scans the URL string and tallies up keywords.
    
    
    
        3. From those tallies, assigns probabilities to say the top 6 or 7 Universes. Show only the top few as pre-diagnosis.
        *I can have how many shown based off sage's intelligence*
    
        4. For Stage 3
    
    
        Method 2 (Hand-picking URLS):
        1.  I'll just start with the URL https://penzu.com/ (a diary website).  What I can do is make it a base greater chance to result
        in "An emotional Universe" combined with method 1 to add to that base vastly upping the odds for it to show up.
    
        Current Issues as of 11/24/2017
        1. The api calls aren't hugely reliable, depending on order of responses, sometimes it tallies up the data, sometimes it doesn't.
        2. FIXED the preflight calls after first use but resetting the headers!!!!
    */
    ,
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["JsonPipe"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common__["JsonPipe"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__universe_fetcher_service__["a" /* UniverseFetcherService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__universe_fetcher_service__["a" /* UniverseFetcherService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__card_service__["a" /* CardService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__card_service__["a" /* CardService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__universe__["a" /* Universe */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__universe__["a" /* Universe */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__universe_card__["a" /* UniverseCard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__universe_card__["a" /* UniverseCard */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_8__sage_user_service__["a" /* SageUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__sage_user_service__["a" /* SageUserService */]) === "function" && _h || Object])
], UniverseGeneratorComponent);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=universe-generator.component.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sage_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__race__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sage__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tooltip__ = __webpack_require__(98);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewSageProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ViewSageProfileComponent = (function () {
    function ViewSageProfileComponent(router, sageUserService) {
        this.router = router;
        this.sageUserService = sageUserService;
        this.tooltip = new __WEBPACK_IMPORTED_MODULE_9__tooltip__["a" /* Tooltip */];
        this.sage = new __WEBPACK_IMPORTED_MODULE_8__sage__["a" /* Sage */];
        this.race = new __WEBPACK_IMPORTED_MODULE_7__race__["a" /* Race */];
        this.subscription = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__["Subscription"];
        this.subscription2 = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__["Subscription"];
        this.subscription3 = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__["Subscription"];
        this.subTitle = 'Primary Attributes';
        this.response = '';
        this.error = '';
        this.title = "Loading Profile....";
        this.spinToggle2 = true;
    }
    ViewSageProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.sageUserService.getError().subscribe(function (incomingError) {
            _this.error = "Couldn't Load Profile Data." + incomingError;
            _this.response = "Please Make Sure You Are Logged In.";
        }); //remember this does ALL error handling for this form
        console.log("FK_Race " + localStorage.getItem('FK_Race'));
        this.subscription2 = this.sageUserService.getRaceInfo(localStorage.getItem('FK_Race')).subscribe(function (incomingRace) {
            _this.race = incomingRace;
            _this.title = 'Multiverse Sage Overview';
            _this.spinToggle2 = false;
            _this.sage = _this.sageUserService.getLocalSageStorage();
            console.log("Have Sage: " + JSON.stringify(_this.sage));
            _this.race = _this.sageUserService.getLocalRaceStorage();
            //console.log("Have Race: " + JSON.stringify(this.raceD));
            _this.imageURL = __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].baseImagePath + 'races/' + _this.race.race_name.replace(' ', '_') + '_' + _this.sage.Chosen_Image + __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].profileImageExtension; //reconstructing image path, other way can be to if statement the race_image variable too if this breaks later on
        });
        this.subscription3 = this.sageUserService.getTooltipInfo().subscribe(function (incomingTip) {
            _this.tooltip = incomingTip;
            _this.tipIntuition = _this.tooltip[0].description;
            console.log("TIP" + _this.tipIntuition);
            _this.tipInquisitiveness = _this.tooltip[1].description;
            _this.tipIntelligence = _this.tooltip[2].description;
            _this.tipIngenuity = _this.tooltip[3].description;
            _this.tipInsanityControl = _this.tooltip[4].description;
            _this.tipInvigoration = _this.tooltip[5].description;
            _this.tipPrimaryAttributes = _this.tooltip[6].description;
            _this.tipEnergy = _this.tooltip[7].description;
            _this.tipDimensionalWake = _this.tooltip[8].description;
            _this.tipBonusPointsAtCreation = _this.tooltip[9].description;
        });
    };
    ViewSageProfileComponent.prototype.back = function () {
        this.router.navigate(['sagehome/' + localStorage.getItem('sage_id')]); //has to navigate and THEN trigger the broadcast singleton
    };
    return ViewSageProfileComponent;
}());
ViewSageProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-sage-profile',
        template: __webpack_require__(466),
        styles: [__webpack_require__(399)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__sage_user_service__["a" /* SageUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__sage_user_service__["a" /* SageUserService */]) === "function" && _b || Object])
], ViewSageProfileComponent);

var _a, _b;
//# sourceMappingURL=view-sage-profile.component.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomeFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WelcomeFormComponent = (function () {
    function WelcomeFormComponent() {
        this.title = 'Greetings Newcomer! Are you prepared to learn the ways of the Multiverse?';
    }
    WelcomeFormComponent.prototype.ngOnInit = function () {
    };
    return WelcomeFormComponent;
}());
WelcomeFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-welcome-form',
        template: __webpack_require__(467),
        styles: [__webpack_require__(400)]
    }),
    __metadata("design:paramtypes", [])
], WelcomeFormComponent);

//# sourceMappingURL=welcome-form.component.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sage_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__universe__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__universe_card__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CardService = (function () {
    function CardService(http, sageUserService, universe, universeCard) {
        this.http = http;
        this.sageUserService = sageUserService;
        this.universe = universe;
        this.universeCard = universeCard;
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Headers */]({
            'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json',
        });
        this.universeCardCollection = [__WEBPACK_IMPORTED_MODULE_6__universe_card__["a" /* UniverseCard */]];
    }
    CardService.prototype.getMovesTable = function () {
        this.url = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].baseAPIUrl + 'api/moves';
        this.runGetRequest();
        return this.response;
    };
    CardService.prototype.getCardCollection = function (sageID) {
        this.url = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].baseAPIUrl + 'api/collection/' + sageID;
        this.runGetRequest();
        return this.response;
    };
    CardService.prototype.getUniverseInfo = function (universeID) {
        this.url = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].baseAPIUrl + 'api/universe-category/' + universeID;
        this.runGetRequest();
        return this.response;
    };
    CardService.prototype.getAllUniverses = function () {
        this.url = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].baseAPIUrl + 'api/universes';
        this.runGetRequest();
        return this.response;
    };
    CardService.prototype.postNewCard = function (universeCard, userID) {
        var _this = this;
        //1. Get Universe Data
        //console.log("Current Auth Token: " + localStorage.getItem('access_token'));
        this.token = localStorage.getItem('access_token');
        this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));
        this.url = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].baseAPIUrl + 'api/generate-card/' + userID;
        console.log('card to be inserted: ' + JSON.stringify(universeCard));
        this.response = this.http.post(this.url, JSON.stringify(universeCard), { headers: this.headers })
            .map(function (res) { return _this.response = res.json(); }).retryWhen(function (attempts) { return attempts.zip(__WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].range(1, 4))
            .flatMap(function (_a) {
            var error = _a[0], i = _a[1];
            if (i > 3) {
                return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].throw(error.json().error || 'Server error');
            }
            console.log('delay retry by ' + i + ' second(s)');
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].timer(i * 100);
        }); });
        this.response.subscribe(function (data) {
            _this.universeCard = data;
            console.log(JSON.stringify(_this.universeCard));
            //this.setLocalRaceStorage(this.universe);
        }, function (err) { return _this.sageUserService.sendError(err); });
        //console.log("Local Race Variable: " + JSON.stringify(this.response));
        return this.response;
    };
    CardService.prototype.destroyCards = function (universeCards, userID) {
        var _this = this;
        //1. Get Universe Data
        //console.log("Current Auth Token: " + localStorage.getItem('access_token'));
        this.token = localStorage.getItem('access_token');
        this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));
        this.url = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].baseAPIUrl + 'api/destroy-cards/' + userID;
        console.log('cards to be destroyed: ' + JSON.stringify(universeCards));
        this.response = this.http.post(this.url, JSON.stringify(universeCards), { headers: this.headers })
            .map(function (res) { return _this.response = res.json(); }).retryWhen(function (attempts) { return attempts.zip(__WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].range(1, 4))
            .flatMap(function (_a) {
            var error = _a[0], i = _a[1];
            if (i > 3) {
                return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].throw(error.json().error || 'Server error');
            }
            console.log('delay retry by ' + i + ' second(s)');
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].timer(i * 100);
        }); });
        //console.log("Local Race Variable: " + JSON.stringify(this.response));
        return this.response;
    };
    CardService.prototype.updateUniverseCardNameDescription = function (universeCard, cardID) {
        var _this = this;
        this.url = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].baseAPIUrl + 'api/universes';
        this.token = localStorage.getItem('access_token');
        this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));
        this.url = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].baseAPIUrl + 'api/update-card/' + cardID;
        console.log('card to be updated: ' + JSON.stringify(universeCard));
        this.response = this.http.post(this.url, JSON.stringify(universeCard), { headers: this.headers })
            .map(function (res) { return _this.response = res.json(); }).retryWhen(function (attempts) { return attempts.zip(__WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].range(1, 4))
            .flatMap(function (_a) {
            var error = _a[0], i = _a[1];
            if (i > 3) {
                return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].throw(error.json().error || 'Server error');
            }
            console.log('delay retry by ' + i + ' second(s)');
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].timer(i * 100);
        }); });
        this.response.subscribe(function (data) {
            _this.universeCard = data;
            console.log(JSON.stringify(_this.universeCard));
            //this.setLocalRaceStorage(this.universe);
        }, function (err) { return _this.sageUserService.sendError(err); });
        //console.log("Local Race Variable: " + JSON.stringify(this.response));
        return this.response;
    };
    CardService.prototype.runGetRequest = function () {
        var _this = this;
        this.token = localStorage.getItem('access_token');
        this.headers.set('Authorization', 'Bearer ' + this.token.replace('"', ''));
        this.response = this.http.get(this.url, { headers: this.headers })
            .map(function (res) { return _this.response = res.json(); }).retryWhen(function (attempts) { return attempts.zip(__WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].range(1, 4))
            .flatMap(function (_a) {
            var error = _a[0], i = _a[1];
            if (i > 3) {
                return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].throw(error.json().error || 'Server error');
            }
            console.log('delay retry by ' + i + ' second(s)');
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].timer(i * 3100);
        }); });
        this.response.subscribe(function (data) {
        }, function (err) { return _this.sageUserService.sendError(err); });
        //console.log("Local Race Variable: " + JSON.stringify(this.response));
    };
    return CardService;
}());
CardService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__sage_user_service__["a" /* SageUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__sage_user_service__["a" /* SageUserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__universe__["a" /* Universe */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__universe__["a" /* Universe */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__universe_card__["a" /* UniverseCard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__universe_card__["a" /* UniverseCard */]) === "function" && _d || Object])
], CardService);

var _a, _b, _c, _d;
//# sourceMappingURL=card.service.js.map

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ":host /deep/ .index-column,\r\n:host /deep/ .index-column-header {\r\n  text-align: right;\r\n}\r\n\r\n:host /deep/ .data-table .data-table-row.selected {\r\n  background-color: #E4EDF9 !important;\r\n}\r\n\r\n\r\ndata-column {\r\n  background-color: red;\r\n}\r\n\r\nbtn.pagination {\r\n  cursor: pointer;\r\n}\r\n\r\n#bootstrap-overrides .disabled btn:disabled {\r\n  cursor: not-allowed !important;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Universe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Universe = (function () {
    function Universe() {
    }
    return Universe;
}());
Universe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Universe);

//# sourceMappingURL=universe.js.map

/***/ }),

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h5.noselect {\r\n  -webkit-user-select: none; /* Safari, iOS, and Android */\r\n  -moz-user-select: none; /* Firefox */\r\n  -ms-user-select: none; /* Internet Explorer/Edge */\r\n  user-select: none; /* Non-prefixed version, currently\r\n                                  supported by Chrome and Opera */\r\n}\r\n\r\ni:hover {\r\n  color: green;\r\n}\r\n\r\n.picture {\r\n  height: 20em;\r\n  max-width: 100%;\r\n  /*height: 20em; or 320px*/\r\n  border: 5px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "body {\r\n  /* just for this demo. */\r\n  padding: 30px;\r\n}\r\n\r\n.btn {\r\n  /* just for this demo. */\r\n  margin-top: 5px;\r\n}\r\n\r\n.btn-arrow-right,\r\n.btn-arrow-left {\r\n  position: relative;\r\n  padding-left: 18px;\r\n  padding-right: 18px;\r\n}\r\n\r\n.btn-arrow-right {\r\n  padding-left: 36px;\r\n}\r\n\r\n.btn-arrow-left {\r\n  padding-right: 36px;\r\n}\r\n\r\n  .btn-arrow-right:before,\r\n  .btn-arrow-right:after,\r\n  .btn-arrow-left:before,\r\n  .btn-arrow-left:after {\r\n    /* make two squares (before and after), looking similar to the button */\r\n    content: \"\";\r\n    position: absolute;\r\n    top: 5px;\r\n    /* move it down because of rounded corners */\r\n    width: 22px;\r\n    /* same as height */\r\n    height: 22px;\r\n    /* button_outer_height / sqrt(2) */\r\n    background: inherit;\r\n    /* use parent background */\r\n    border: inherit;\r\n    /* use parent border */\r\n    border-left-color: transparent;\r\n    /* hide left border */\r\n    border-bottom-color: transparent;\r\n    /* hide bottom border */\r\n    border-radius: 0px 4px 0px 0px;\r\n    /* round arrow corner, the shorthand property doesn't accept \"inherit\" so it is set to 4px */\r\n    -webkit-border-radius: 0px 4px 0px 0px;\r\n    -moz-border-radius: 0px 4px 0px 0px;\r\n  }\r\n\r\n.btn-arrow-right:before,\r\n.btn-arrow-right:after {\r\n  transform: rotate(45deg);\r\n  /* rotate right arrow squares 45 deg to point right */\r\n  -webkit-transform: rotate(45deg);\r\n  -moz-transform: rotate(45deg);\r\n  -o-transform: rotate(45deg);\r\n  -ms-transform: rotate(45deg);\r\n}\r\n\r\n.btn-arrow-left:before,\r\n.btn-arrow-left:after {\r\n  transform: rotate(225deg);\r\n  /* rotate left arrow squares 225 deg to point left */\r\n  -webkit-transform: rotate(225deg);\r\n  -moz-transform: rotate(225deg);\r\n  -o-transform: rotate(225deg);\r\n  -ms-transform: rotate(225deg);\r\n}\r\n\r\n.btn-arrow-right:before,\r\n.btn-arrow-left:before {\r\n  /* align the \"before\" square to the left */\r\n  left: -11px;\r\n}\r\n\r\n.btn-arrow-right:after,\r\n.btn-arrow-left:after {\r\n  /* align the \"after\" square to the right */\r\n  right: -11px;\r\n}\r\n\r\n.btn-arrow-right:after,\r\n.btn-arrow-left:before {\r\n  /* bring arrow pointers to front */\r\n  z-index: 1;\r\n}\r\n\r\n.btn-arrow-right:before,\r\n.btn-arrow-left:after {\r\n  /* hide arrow tails background */\r\n  background-color: white;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 398:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 400:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UniverseCard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var UniverseCard = (function () {
    function UniverseCard() {
    }
    return UniverseCard;
}());
UniverseCard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], UniverseCard);

//# sourceMappingURL=universe-card.js.map

/***/ }),

/***/ 449:
/***/ (function(module, exports) {

module.exports = "<br />\r\n<div style=\"text-align: center;\" class=\"container\" *ngIf=\"subForm.showForm\">\r\n  <h4 >{{subForm.caption}}</h4>\r\n    <form [formGroup]=\"myForm\" novalidate (ngSubmit)=\"save(myForm)\">\r\n      \r\n      <div class=\"form-group\">\r\n        <!--Google how to add form controls when ready\r\n        <input class=\"form-control\" type=\"text\" [title]=\"control.toolTip\"\r\n             [attr.maxlength]=\"control.width\" [name]=\"whateverField\"\r\n             [value]=\"control.defaultValue\" [formControlName]=\"control.name\"/>\r\n            -->\r\n        <input [(ngModel)]=\"input\" type=\"text\" formControlName=\"whateverField\">\r\n        {{input}}\r\n        <small *ngIf=\"!myForm.controls.whateverField.valid\" class=\"text-danger\">\r\n          Name is required (minimum 5 characters).\r\n        </small>\r\n      </div>\r\n      <p></p><p></p><p></p>\r\n    <button type=\"button\" (click)=\"update()\" [disabled]=\"!myForm.valid\">Submit</button>\r\n      <br /><br />\r\n      <h4 style=\"color: forestgreen\">{{response}}</h4>\r\n      <br />\r\n      <i class=\"fa fa-spinner fa-spin fa-3x\" aria-hidden=\"true\" animation=\"spin\" size=\"4x\" *ngIf=\"spinToggle\"></i>\r\n      <br />\r\n  </form>\r\n</div>"

/***/ }),

/***/ 450:
/***/ (function(module, exports) {

module.exports = "<h2 style=\"text-align: center;\">{{title}}</h2><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>\r\n<h3 style=\"text-align: center;\">{{subTitle}}</h3>\r\n<br />\r\n<div style=\"text-align: center;\">\r\n  <h3>Dear Multiverse, I would like to:</h3><br />\r\n  <button type=\"button\" (click)=\"updateSageName()\">Change My Sage Name</button>\r\n  <button type=\"button\" (click)=\"updatePassword()\">Change My Password</button>\r\n  <button type=\"button\" (click)=\"updateRealName()\">Change My Real Name</button>\r\n  <button type=\"button\" (click)=\"updateEmail()\">Change My Email Address</button>\r\n\r\n  <p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>\r\n\r\n  <button type=\"button\" (click)=\"delete()\">Delete Account</button>\r\n  <button type=\"button\" (click)=\"back()\">Home Page</button>\r\n  <p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>\r\n  <button type=\"button\" (click)=\"test()\">Test Stuff</button>\r\n  <p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>\r\n  <p style=\"color: red\">{{sageNameWarning}}</p>\r\n  <app-account-change-form [subForm]=\"subForm\"></app-account-change-form><!--Remember to bind @input shit here too for child components-->\r\n</div>"

/***/ }),

/***/ 451:
/***/ (function(module, exports) {

module.exports = "<br /><br />\r\n\r\n<h1 style=\"text-align: center;\">\r\n  {{title}}\r\n</h1>\r\n<router-outlet></router-outlet>\r\n<!--<app-welcome-form></app-welcome-form>\r\n<app-apifetcher-form></app-apifetcher-form>-->"

/***/ }),

/***/ 452:
/***/ (function(module, exports) {

module.exports = "\r\n<div style=\"text-align: center;\">\r\n\r\n  <br />\r\n  <h2>\r\n    {{title}}\r\n  </h2>\r\n  <br />\r\n  <h3 style=\"color:green\">Energy: {{energy}}</h3>\r\n\r\n  <div style=\"margin: auto; max-width: 1000px; margin-top:50px\">\r\n    <data-table id=\"cards-grid\"\r\n                headerTitle=\"Your Universes\"\r\n                [items]=\"cards\"\r\n                [itemCount]=\"cardCount\"\r\n                [limit]=\"5\"\r\n                [sortBy]=\"'name'\"\r\n                [sortAsc]=\"false\"\r\n                [selectColumn]=\"true\"\r\n                [multiSelect]=\"true\"\r\n                [substituteRows]=\"true\"\r\n                [expandableRows]=\"true\"\r\n                [translations]=\"translations\"\r\n                [indexColumnHeader]=\"'#'\"\r\n                [selectOnRowClick]=\"true\"\r\n                (reload)=\"reloadCards($event)\">\r\n\r\n      <template #dataTableExpand let-item=\"item\">\r\n        <div [textContent]=\"item.description\" style=\"padding: 5px; color: gray\"></div>\r\n\r\n      </template>\r\n      <data-table-column \r\n                         [property]=\"'name'\"\r\n                         [header]=\"'Name'\"\r\n                         [sortable]=\"true\">\r\n      </data-table-column>\r\n      <data-table-column [property]=\"'FK_Move_1'\"\r\n                         [header]=\"'Ability 1'\"\r\n                         [sortable]=\"true\">\r\n      </data-table-column>\r\n      <data-table-column [property]=\"'FK_Move_2'\"\r\n                         [header]=\"'Ability 2'\"\r\n                         [sortable]=\"true\">\r\n\r\n      </data-table-column>\r\n      <data-table-column [property]=\"'FK_Move_3'\"\r\n                         [header]=\"'Ability 3'\"\r\n                         [sortable]=\"true\">\r\n      </data-table-column>\r\n      <data-table-column [property]=\"'FK_Move_4'\"\r\n                         [header]=\"'Ability 4'\"\r\n                         [sortable]=\"true\">\r\n      </data-table-column>\r\n      <data-table-column [property]=\"'FK_Move_Ultimate'\"\r\n                         [header]=\"'Ultimate'\"\r\n                         [cellColors]=\"cellColor\"\r\n                         [sortable]=\"true\">\r\n      </data-table-column>\r\n\r\n\r\n    </data-table>\r\n    <button type=\"button\" (click)=\"saveAll()\">Save Selected Universes</button>\r\n    <button type=\"button\" (click)=\"deleteAll()\" [disabled]=\"buttonToggle\">Destroy Selected Universes</button><br /><br />\r\n    <button type=\"button\" (click)=\"navigateToSettings()\" routerLinkActive=\"active\" [disabled]=\"!isValid\">Explore one of YOUR Universes (Adventure Mode)</button>\r\n\r\n\r\n    <!-- Suppose to show all that is selected, but not working, and not really necessary\r\n    <div style=\"margin-top: 10px\">\r\n      <b>Selected:</b>\r\n      <span *ngIf=\"cardsTable.selectedRow == null\"><i>No item selected</i></span>\r\n      <span [textContent]=\"cardsTable.selectedRow && cardsTable.selectedRow.item.title\"></span>\r\n    </div>\r\n        -->\r\n    <br /><br />\r\n    <h4 style=\"color: green\">{{response}}</h4>\r\n    <h4 style=\"color: green\">{{error}}</h4>\r\n    <div style=\"margin-top: 30px\">\r\n      <i class=\"fa fa-spinner fa-spin fa-3x\" aria-hidden=\"true\" animation=\"spin\" size=\"4x\" *ngIf=\"spinToggle\"></i>\r\n    </div>\r\n\r\n  </div><br /><br />\r\n\r\n  <button type=\"button\" (click)=\"back()\">Home Page</button><br /><br /><br /><br /><br /><br />\r\n\r\n</div>"

/***/ }),

/***/ 453:
/***/ (function(module, exports) {

module.exports = "<h2 style=\"text-align: center;\">{{title}}</h2><p></p>\r\n<br />\r\n<h3 style=\"text-align: center;\">{{subTitle}}</h3>\r\n<br />\r\n<h4 style=\"text-align: center;\">{{subTitle2}}</h4>\r\n<br />\r\n<div style=\"text-align: center;\">\r\n  <label>Re-Enter Your Sage Name to Delete:</label><br /><br />\r\n  <input [(ngModel)]=\"sagename\" (keyup)=\"0\" placeholder=\"Sage Name\"><br />\r\n  <p>{{sagename}}</p><br />\r\n\r\n  <label>Re-Enter your Password:</label><br /><br />\r\n  <input [(ngModel)]=\"password\" (keyup)=\"0\" placeholder=\"Password\"><br />\r\n  <p>{{password}}</p><br />\r\n\r\n  <label>Re-Enter your Real Name to Delete:</label><br /><br />\r\n  <input [(ngModel)]=\"realname\" (keyup)=\"0\" placeholder=\"Real Name\"><br />\r\n  <p>{{realname}}</p><br />\r\n\r\n  <button type=\"button\" (click)=\"confirmDelete()\">I'm Sure....Delete My Sage Account</button>\r\n  <p></p><p></p>\r\n  <button type=\"button\" (click)=\"back()\">Home Page</button>\r\n  <br /><br />\r\n  <h4 style=\"color: forestgreen;\">{{response}}</h4><br />\r\n  <i class=\"fa fa-spinner fa-spin fa-3x\" aria-hidden=\"true\" animation=\"spin\" size=\"4x\" *ngIf=\"spinToggle2\"></i><br />\r\n  <p style=\"color: red;\">{{error}}</p><br />\r\n\r\n  <br /><br />\r\n</div>"

/***/ }),

/***/ 454:
/***/ (function(module, exports) {

module.exports = "<h2 style=\"text-align: center;\">\r\n  {{title}}\r\n</h2>\r\n<br />\r\n<div style=\"text-align: center;\">\r\n  <label>Login with your Sage Name (Remember....this is just like a \"username\")</label><br /><br />\r\n  <input [(ngModel)]=\"sagename\" (keyup)=\"0\" placeholder=\"Sage Name\"><br />\r\n  <p>{{sagename}}</p><br />\r\n\r\n  <label>Enter your Password</label><br /><br />\r\n  <input [(ngModel)]=\"password\" (keyup)=\"0\" placeholder=\"Password\"><br />\r\n  <p>{{password}}</p><br />\r\n\r\n  <button type=\"button\" (click)=\"loginToAccount()\">Login To Sage Account</button>\r\n  <button type=\"button\" routerLink=\"/welcome\" routerLinkActive=\"active\">Back</button>\r\n  <button type=\"button\" (click)=\"test()\">Test Stuff</button>\r\n  <br /><br /><br /><br /><h4>{{response}} </h4><br /><br />\r\n  <i class=\"fa fa-spinner fa-spin fa-3x\" aria-hidden=\"true\" animation=\"spin\" size=\"4x\" *ngIf=\"spinToggle\"></i>\r\n  <br />\r\n  <p style=\"color: red\">{{error}}</p>\r\n</div>"

/***/ }),

/***/ 455:
/***/ (function(module, exports) {

module.exports = "<h2 style=\"text-align: center;\">\r\n  {{title}}\r\n</h2>\r\n<br />\r\n<div style=\"text-align: center;\">\r\n  <input type=\"hidden\" name=\"_token\" value=\"M0ev1b4dWs6hSGEHXBWTTJYwmdfLrWWi0nfzdGuR\">\r\n  <label>Choose your Sage Name (This is just like a \"username\")</label><br /><br />\r\n  <input [(ngModel)]=\"sageRequest.sagename\" (keyup)=\"0\" placeholder=\"Sage Name\"><br />\r\n  <p>{{sageRequest.sagename}}</p>\r\n\r\n  <label>Choose your Password. (I recommend not using the same password here that you use at your bank! I don't need that kind of temptation ;))</label><br /><br />\r\n  <input [(ngModel)]=\"sageRequest.password\" (keyup)=\"0\" type=\"password\" placeholder=\"Password\"><br />\r\n  <p>{{sageRequest.password}}</p><br />\r\n\r\n  <!--\r\n  <label>Re-enter your password.</label><br /><br />\r\n  <input [(ngModel)]=\"sageAccount.password_confirm\" (keyup)=\"0\" type=\"password\" name=\"password_confirmation\" placeholder=\"Password\"><br />\r\n  <p>{{sageRequest.password_confirm}}</p><br />\r\n      -->\r\n  <label>Enter your Real First and Last Name (This is just like the first and last names on your driver's license ;P )</label><br /><br />\r\n  <input [(ngModel)]=\"sageRequest.realname\" (keyup)=\"0\" placeholder=\"First and Last Name\"><br />\r\n  <p>{{sageRequest.realname}}</p><br />\r\n\r\n  <label>Enter your email address (I have no need to contact you unless you contact me first!)</label><br /><br />\r\n  <input [(ngModel)]=\"sageRequest.email\" (keyup)=\"0\" placeholder=\"Email Address\"><br />\r\n  <p>{{sageRequest.email}}</p><br />\r\n\r\n  <button type=\"button\" (click)=\"createNewAccount()\">Create Sage Account</button>\r\n  <button type=\"button\" routerLink=\"/welcome\" routerLinkActive=\"active\">Back</button>\r\n  <br /><br />\r\n  <h4 style=\"color: forestgreen\">{{response}}</h4>\r\n  <br />\r\n  <i class=\"fa fa-spinner fa-spin fa-3x\" aria-hidden=\"true\" animation=\"spin\" size=\"4x\" *ngIf=\"spinToggle\"></i>\r\n  <br />\r\n  <p style=\"color: red\">{{sageNameError}}</p>\r\n  <br />\r\n  <p style=\"color: red\">{{tokenError}}</p>\r\n  <br />\r\n  <p style=\"color: red\">{{error}}</p>\r\n</div>"

/***/ }),

/***/ 456:
/***/ (function(module, exports) {

module.exports = "<div style=\"text-align: center;\">\r\n  <p style=\"text-align: center;\">\r\n    Navigating the Multiverse can sure be tough at times!\r\n    (Page not Found: Wrong URL)\r\n  </p><br />\r\n  <button type=\"button\" routerLink=\"/welcome\" routerLinkActive=\"active\">Back</button>\r\n</div>"

/***/ }),

/***/ 457:
/***/ (function(module, exports) {

module.exports = "\r\n<i id=\"raceUp\" class=\"fa fa-chevron-circle-left fa-4x\" aria-hidden=\"true\" style=\"cursor: pointer;\" onmousedown=\"mouseDown(this.id); \"onmouseup=\"mouseUp(this.id);\" (click)=\"previousRace()\"></i>\r\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n<i id=\"raceDown\" class=\"fa fa-chevron-circle-right fa-4x\" aria-hidden=\"true\" style=\"cursor: pointer;\" onmousedown=\"mouseDown(this.id); \"onmouseup=\"mouseUp(this.id);\" (click)=\"nextRace()\"></i>\r\n\r\n<br /><br /><br />\r\n<h1 style=\"text-align: center;\">\r\n  {{race.race_name}}\r\n</h1>\r\n<br />\r\n<i class=\"fa fa-spinner fa-spin fa-3x\" aria-hidden=\"true\" animation=\"spin\" size=\"4x\" *ngIf=\"spinToggle2\"></i>\r\n<br /><br />\r\n<h5 tooltip={{tipDimensionalWake}} placement=\"bottom\" style=\"text-align: center; cursor: default;\">\r\n  Dimensionality: {{race.dimensional_wake}} creatures\r\n</h5>\r\n<br />\r\n<p style=\"color: blue;\">{{race.description}}</p>\r\n\r\n<br />\r\n<div class=\"row\">\r\n  <div class=\"col-md-6\" >\r\n    <h3 tooltip={{tipPrimaryAttributes}} placement=\"top\" style=\"text-align: center; cursor:default;\">\r\n      {{subTitle}}\r\n    </h3>\r\n    <p>\r\n      {{attributeDescription}}\r\n    </p>\r\n\r\n    <br />\r\n\r\n      <div class=\"btn-group-vertical text-right\" role=\"group\" style=\"margin-left: -18%;\">\r\n        <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n          <h5 class=\"noselect\" tooltip={{tipIntuition}} placement=\"left\" style=\"display:inline-block; cursor:default;\">\r\n            <!--I am playing with custom tooltip placement/styles-->\r\n            Intuition: {{race.base_intuition}}&nbsp;&nbsp;\r\n          </h5>\r\n          <h5 style=\"display: inline-block; text-align:right;\">\r\n            <i id=\"intuitionUp\" class=\"fa fa-caret-square-o-up fa-stack\" style=\"cursor: pointer; margin-top: -20px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"increaseStat('intuitionUp')\"></i>\r\n\r\n\r\n            <i id=\"intuitionDown\" class=\"fa fa-caret-square-o-down fa-stack\" style=\"cursor: pointer; margin-top: 20px; margin-left: -5.5px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id);\" onmouseup=\"mouseUp(this.id);\" (click)=\"decreaseStat('intuitionDown')\"></i>\r\n\r\n          </h5>\r\n        </div>\r\n\r\n        <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n          <h5 class=\"noselect\" tooltip={{tipIngenuity}} placement=\"left\" style=\"display: initial; cursor:default;\">\r\n            Ingenuity: {{race.base_ingenuity}}&nbsp;&nbsp;\r\n          </h5>\r\n          <h5 style=\"display: inline-block; text-align:right;\">\r\n            <i id=\"ingenuityUp\" class=\"fa fa-caret-square-o-up fa-stack\" style=\"cursor: pointer; margin-top: -20px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"increaseStat('ingenuityUp')\"></i>\r\n\r\n\r\n            <i id=\"ingenuityDown\" class=\"fa fa-caret-square-o-down fa-stack\" style=\"cursor: pointer; margin-top: 20px; margin-left: -5.5px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id);\" onmouseup=\"mouseUp(this.id);\" (click)=\"decreaseStat('ingenuityDown')\"></i>\r\n\r\n          </h5>\r\n        </div>\r\n\r\n        <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n\r\n          <h5 class=\"noselect\" tooltip={{tipInquisitiveness}} placement=\"left\" style=\"display: inline; cursor:default;\">\r\n            Inquisitiveness: {{race.base_inquisition}}&nbsp;&nbsp;\r\n          </h5>\r\n          <h5 style=\"display: inline-block; text-align:right;\">\r\n            <i id=\"inquisitivenessUp\" class=\"fa fa-caret-square-o-up fa-stack\" style=\"cursor: pointer; margin-top: -20px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"increaseStat('inquisitivenessUp')\"></i>\r\n\r\n\r\n            <i id=\"inquisitivenessDown\" class=\"fa fa-caret-square-o-down fa-stack\" style=\"cursor: pointer; margin-top: 20px; margin-left: -5.5px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id);\" onmouseup=\"mouseUp(this.id);\" (click)=\"decreaseStat('inquisitivenessDown')\"></i>\r\n\r\n          </h5>\r\n\r\n        </div>\r\n        <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n\r\n          <h5 class=\"noselect\" tooltip={{tipIntelligence}} placement=\"left\" style=\"display: inline; cursor:default;\">\r\n            Intelligence: {{race.base_intelligence}}&nbsp;&nbsp;\r\n          </h5>\r\n          <h5 style=\"display: inline-block; text-align:right;\">\r\n            <i id=\"intelligenceUp\" class=\"fa fa-caret-square-o-up fa-stack\" style=\"cursor: pointer; margin-top: -20px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"increaseStat('intelligenceUp')\"></i>\r\n\r\n\r\n            <i id=\"intelligenceDown\" class=\"fa fa-caret-square-o-down fa-stack\" style=\"cursor: pointer; margin-top: 20px; margin-left: -5.5px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id);\" onmouseup=\"mouseUp(this.id);\" (click)=\"decreaseStat('intelligenceDown')\"></i>\r\n\r\n          </h5>\r\n        </div>\r\n        <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n\r\n          <h5 class=\"noselect\" tooltip={{tipInvigoration}} placement=\"left\" style=\"display: inline; cursor:default;\">\r\n            Invigoration: {{race.base_invigoration}}&nbsp;&nbsp;\r\n          </h5>\r\n          <h5 style=\"display: inline-block; text-align:right;\">\r\n            <i id=\"invigorationUp\" class=\"fa fa-caret-square-o-up fa-stack\" style=\"cursor: pointer; margin-top: -20px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"increaseStat('invigorationUp')\"></i>\r\n\r\n\r\n            <i id=\"invigorationDown\" class=\"fa fa-caret-square-o-down fa-stack\" style=\"cursor: pointer; margin-top: 20px; margin-left: -5.5px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id);\" onmouseup=\"mouseUp(this.id);\" (click)=\"decreaseStat('invigorationDown')\"></i>\r\n\r\n          </h5>\r\n        </div>\r\n        <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n\r\n          <h5 class=\"noselect\" tooltip={{tipInsanityControl}} placement=\"left\" style=\"display: inline; cursor:default;\">\r\n            Insanity Control: {{race.base_insanity_control}}&nbsp;&nbsp;\r\n          </h5>\r\n          <h5 style=\"display: inline-block; text-align:right;\">\r\n            <i id=\"insanityControlUp\" class=\"fa fa-caret-square-o-up fa-stack\" style=\"cursor: pointer; margin-top: -20px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"increaseStat('insanityControlUp')\"></i>\r\n\r\n\r\n            <i id=\"insanityControlDown\" class=\"fa fa-caret-square-o-down fa-stack\" style=\"cursor: pointer; margin-top: 20px; margin-left: -5.5px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id);\" onmouseup=\"mouseUp(this.id);\" (click)=\"decreaseStat('insanityControlDown')\"></i>\r\n\r\n\r\n          </h5>\r\n        </div>\r\n        <br /><br />\r\n\r\n    </div>\r\n      <h5 class=\"noselect\" tooltip={{tipBonusPointsAtCreation}} placement=\"top\"style=\"padding-right: 10%; cursor:default;\">Attribute Points Left To Assign: {{race.bonus_points_at_creation}}</h5>\r\n\r\n\r\n    </div>\r\n  <div class=\"col-md-6\">\r\n    <h3 style=\"text-align: center;\">\r\n      {{subTitle2}}\r\n    </h3>\r\n   \r\n\r\n    <p>\r\n      {{imageDescription}}\r\n    </p>\r\n<i id=\"picUp\" class=\"fa fa-chevron-circle-left fa-3x\" aria-hidden=\"true\" style=\"cursor: pointer;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"previousImage()\"></i>\r\n    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n<i id=\"picDown\" class=\"fa fa-chevron-circle-right fa-3x\" aria-hidden=\"true\" style=\"cursor: pointer;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"nextImage()\"></i>\r\n<br /><br />\r\n    <div >\r\n      <img class=\"picture\" src={{imageURL}} alt=\"Sorry, problem loading image....\">\r\n    </div>\r\n    <!--\r\n    <button type=\"button\" class=\"glyphicon glyphicon-circle-arrow-up\">Increase</button>\r\n    <button type=\"button\" class=\"glyphicon glyphicon-circle-arrow-down\">Decrease</button>\r\n    -->\r\n    <br /><br />\r\n    <br />\r\n    <h3 style=\"text-align: center;\">\r\n      Birth Universe: From The {{race.birth_universe}}\r\n    </h3>\r\n  </div>\r\n\r\n\r\n\r\n\r\n</div>\r\n<div style=\"padding-top:60px;\">\r\n  <h5 style=\"color: green;\">Racial Bonus: </h5>\r\n  <p style=\"color: green;\">{{race.racial_bonuses}}</p>\r\n  <br />\r\n  <p style=\"color: red;\" *ngIf=\"race.is_locked==1\">Sorry, you cannot play as this race at this time.</p>\r\n\r\n  <button type=\"button\" (click)=\"confirm()\" [disabled]=\"!isValid\" >Confirm</button> \r\n  <button type=\"button\" (click)=\"back()\">Home Page</button>\r\n  <br /><br />\r\n  \r\n  <h4 style=\"color: forestgreen\">{{response}}</h4><br /><br />\r\n  <i class=\"fa fa-spinner fa-spin fa-3x\" aria-hidden=\"true\" animation=\"spin\" size=\"4x\" *ngIf=\"spinToggle\"></i>\r\n  <br /><br /><br />\r\n</div>\r\n<!--\r\n  \r\n\r\n    id: string;\r\n    birth_universe: string;\r\n    race_name: string;\r\n    base_intuition: string;\r\n    base_ingenuity: string;\r\n    base_intelligence: string;\r\n    base_inquisition: string\r\n    base_invigoration: string;\r\n    base_insanity_control: string;\r\n    bonus_points_at_creation: string;\r\n    racial_bonuses: string\r\n\r\n    description: string;\r\n    personality: string;\r\n    dimensional_wake: string;\r\n    is_locked: string\r\n\r\n    is_metaphysical: string;\r\n    image_1: string;\r\n    image_2: string;\r\n    image_3: string-->"

/***/ }),

/***/ 458:
/***/ (function(module, exports) {

module.exports = "<h2 style=\"text-align: center;\">\r\n  {{title}}\r\n</h2>\r\n\r\n<br />\r\n\r\n<br />\r\n<h2 style=\"text-align: center;\">\r\n  {{subTitle}}\r\n</h2>\r\n<br />\r\n<div style=\"text-align: center;\">\r\n  <app-race-selector-sub-form></app-race-selector-sub-form>\r\n\r\n\r\n  <h4 style=\"color: forestgreen\">{{response}}</h4>\r\n  <br />\r\n\r\n  <p style=\"color: red\">{{error}}</p>\r\n</div>"

/***/ }),

/***/ 459:
/***/ (function(module, exports) {

module.exports = "<h2 style=\"text-align: center;\">\r\n  {{title}}\r\n</h2>\r\n<br /><br /><br />\r\n<div style=\"text-align: center;\">\r\n  <button type=\"button\" (click)=\"navigateToUniverseGenerator()\" routerLinkActive=\"active\" [disabled]=\"buttonToggle\">Generate New Universes</button>\r\n  <button type=\"button\" (click)=\"navigateToSageCreation()\" routerLinkActive=\"active\" *ngIf=\"buttonToggle\">Create Your Sage!</button>\r\n  <button type=\"button\" (click)=\"navigateToSageProfile()\" routerLinkActive=\"active\" *ngIf=\"!buttonToggle\">View Sage Profile</button>\r\n  <button type=\"button\" (click)=\"navigateToCardCollection()\" routerLinkActive=\"active\" [disabled]=\"buttonToggle\">Manage Multiverse Collection</button>\r\n  <p></p>\r\n  <button type=\"button\" (click)=\"navigateToSettings()\" routerLinkActive=\"active\" [disabled]=\"!isValid\">Trade Universes With Other Sages</button>\r\n  <button type=\"button\" (click)=\"navigateToSettings()\" routerLinkActive=\"active\" [disabled]=\"!isValid\">Sage Duel (PVP Mode)</button>\r\n  <p></p>\r\n  <button type=\"button\" (click)=\"navigateToSettings()\" routerLinkActive=\"active\" [disabled]=\"!isValid\">Buy Energy (Support Developer)</button>\r\n  <p></p>\r\n  <h4 style=\"color: forestgreen\">{{response}}</h4>\r\n  <p></p>\r\n  <button type=\"button\" routerLink=\"/welcome\" routerLinkActive=\"active\">Logout</button>\r\n  <button type=\"button\" (click)=\"navigateToSettings()\" routerLinkActive=\"active\">Account Settings</button>\r\n  <button type=\"button\" (click)=\"test()\">Test Stuff</button>\r\n\r\n  <br /><br /><br />\r\n  <h5 style=\"font-style: italic; color: blue;margin: 40px;\">*Disclaimer: This app is functioning without any styling for the sake of having something to show. I intend to have\r\n  a more stylized rough-draft of this app up soon!!! Thank you for viewing my work in progress. - Anthony Walter (Programmer/Creator)</h5>\r\n</div>"

/***/ }),

/***/ 460:
/***/ (function(module, exports) {

module.exports = "<div style=\"text-align: center;\" class=\"container\" *ngIf=\"stage1Form.showForm\"><br /><br />\r\n  <h3 style=\"color:green\">Available Energy: </h3>\r\n  <h4 style=\"color:green\">{{stage1Form.availableEnergy}}</h4>\r\n  <h5 style=\"text-decoration: underline;\">Stage 1: The Inflationary Period</h5><br />\r\n  <p style=\"font-weight: bold; color: blue;\">\r\n    This Baby Universe has just started to grow from your website, but it's still young enough that you can\r\n    use your Sage Energy to further tweak the odds of getting <i>ONE</i> desired Universe and guide its direction!!\r\n  </p><br />\r\n\r\n  <div class=\"row\" style=\"margin-top: 20px; color: green; font-weight: bold;\">\r\n    <div class=\"col-md-4\" style=\"margin-top: 50px;\">Universe 2: {{universe2Name}}</div>\r\n    <div class=\"col-md-4\">Universe 1: {{universe1Name}}</div>\r\n    <div class=\"col-md-4\" style=\"margin-top: 50px;\">Universe 3: {{universe3Name}}</div>\r\n  </div>\r\n  <div class=\"row\" style=\"margin-top: 20px; color: green; font-weight: bold;\">\r\n    <div class=\"col-md-4\" style=\"margin-top: 20px;\">Chance Of Occuring: {{universe2Percent}}</div>\r\n    <div class=\"col-md-4\" style=\"margin-top: -30px;\">Chance Of Occuring: {{universe1Percent}}</div>\r\n    <div class=\"col-md-4\" style=\"margin-top: 20px;\">Chance Of Occuring: {{universe3Percent}}</div>\r\n  </div>\r\n  <div class=\"row\" style=\"margin-top: 20px; color: green; font-weight: bold;\">\r\n    <div class=\"col-md-4\" style=\"margin-top: 20px; color: green; font-weight: bold;\"><button type=\"button\" (click)=\"increase(2)\" [disabled]=\"rollToggle\">Tweak Higher</button></div>\r\n    <div class=\"col-md-4\" style=\"margin-top: -30px;\"><button type=\"button\" (click)=\"increase(1)\" [disabled]=\"rollToggle\">Tweak Higher</button></div>\r\n    <div class=\"col-md-4\" style=\"margin-top: 20px; color: green; font-weight: bold;\"><button type=\"button\" (click)=\"increase(3)\" [disabled]=\"rollToggle\">Tweak Higher</button></div>\r\n  </div>\r\n  <br /><br />\r\n  <div style=\"margin-top: 20px; color: green; font-weight: bold;\">\r\n    <button style=\"margin-top: 20px;\" type=\"button\" (click)=\"reset()\" [disabled]=\"rollToggle\">Reset</button><br /><br />\r\n  </div>\r\n\r\n  <div style=\"margin-top: 20px; color: green;\">\r\n    <p>The Multiverse says to you, \"Just to be clear my lord, the following are the approx. ranges you will roll for to get\r\n    a certain Universe.  If you are satisfied with these statistics, then please go ahead and hit the 'Roll My Universe!!' button down below.\"</p>\r\n    <ul style=\"list-style: none; font-weight: bold;\">\r\n      <li>You get Universe 1 if you roll between 0% and {{universe1Percent}}%.</li>\r\n      <li>You get Universe 2 if you roll between {{universe1Percent}}% and {{num}}%</li>\r\n      <li>You get Universe 3 if you roll between {{num}}% and 100%</li>\r\n    </ul>\r\n\r\n  </div>\r\n  <div style=\"margin-top: 20px; color: green; font-weight: bold;\">\r\n    <button style=\"margin-top: 20px;\" type=\"button\" (click)=\"roll()\" [disabled]=\"rollToggle\">Roll My Universe!!</button><br /><br />\r\n  </div>\r\n  <div style=\"margin-top: 20px; color: green; font-weight: bold;\">\r\n    <h5>Tweaks Left: {{maxTweaks}}</h5>\r\n  </div><br />\r\n  <p style=\"color: blue; font-weight: bold;\">{{tweakMessage}} </p>\r\n  <p style=\"color: green; font-weight: bold;\">{{tweakMessage2}} </p>\r\n  <p style=\"color: orangered;font-weight: bold;\">{{tweakMessage3}} </p>\r\n\r\n  <br />\r\n  <button type=\"button\" (click)=\"submit()\" [disabled]=\"submitToggle\">Proceed to Stage 2....</button><br /><br /><br />\r\n  <div style=\"text-align: center;\" class=\"container\">\r\n    <h5 style=\"text-decoration:wavy ; color: red;\">Energy Cost: {{this.stage2Form.cost}} </h5><br />\r\n    <h5 style=\"text-decoration:wavy ; color: red;\">Faulty Universe %: {{this.stage2Form.faultyUniverse}} </h5><br /><br />\r\n    <br />\r\n  </div>\r\n</div>\r\n<app-stage-2-form [stage2Form]=\"stage2Form\"></app-stage-2-form><!--Remember to bind @input shit here too for child components/this is the part that does the actual @input binding-->\r\n\r\n\r\n\r\n"

/***/ }),

/***/ 461:
/***/ (function(module, exports) {

module.exports = "<div style=\"text-align: center;\" class=\"container\" *ngIf=\"stage2Form.showForm\"><br /><br />\r\n  <h3 style=\"color:green\">Available Energy: </h3>\r\n  <h4 style=\"color:green\">{{stage2Form.availableEnergy}}</h4>\r\n  <h5 style=\"text-decoration: underline;\">Stage 2: The Fine-Tuning Period</h5><br />\r\n  <p style=\"font-weight: bold; color: blue;\">\r\n    The Multiverse says to you, \"Congratulations Sage! I don't know how you did it, but you have started making your first Universe!\r\n    Now it is up to you to fine-tune it's parameters to your liking.  There is no right or wrong answer since you are the God and Creator of this Universe!\"\r\n  </p><br />\r\n\r\n  <p style=\"font-weight: bold; color: green; margin-bottom: 20px;\">\r\n    You can now adjust the physical parameters of your Universe (which will later influence your abilities from this Universe Card). You may fine-tune the attributes relative to your Sage Level; however\r\n    the more you fine-tune, the higher the energy cost will be along with an increased likelihood of this Universe blowing up in your face! (Resulting in a \"Faulty Universe\")\r\n  </p><br />\r\n  <h5 style=\"text-decoration: underline; color: orangered;\">{{stage2Form.rolledUniverse.name}}</h5><br /><br />\r\n  <div class=\"btn-group-vertical text-right\" role=\"group\" style=\"margin-left: -18%; margin-top: 20px; \">\r\n    <h5 style=\"text-decoration: underline; color: coral; margin-bottom: 30px; text-align: center;\">The Forces</h5>\r\n    <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n      <h5 class=\"noselect\" tooltip={{blah}} placement=\"left\" style=\"display:inline-block; cursor:default;\">\r\n        <!--I am playing with custom tooltip placement/styles-->\r\n        {{stage2Form.rolledUniverse.Force_1}}: {{stage2Form.rolledUniverse.Force_Str_1}}&nbsp;&nbsp;\r\n      </h5>\r\n      <h5 style=\"display: inline-block; text-align:right;\">\r\n        <i id=\"Force_Str_1-Up\" class=\"fa fa-caret-square-o-up fa-stack\" style=\"cursor: pointer; margin-top: -20px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"increaseStat('Force_Str_1-Up')\"></i>\r\n\r\n\r\n        <i id=\"Force_Str_1-Down\" class=\"fa fa-caret-square-o-down fa-stack\" style=\"cursor: pointer; margin-top: 20px; margin-left: -5.5px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id);\" onmouseup=\"mouseUp(this.id);\" (click)=\"decreaseStat('Force_Str_1-Down')\"></i>\r\n\r\n      </h5>\r\n    </div>\r\n\r\n    <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n      <h5 class=\"noselect\" tooltip={{blah}} placement=\"left\" style=\"display: initial; cursor:default;\">\r\n        {{stage2Form.rolledUniverse.Force_2}}: {{stage2Form.rolledUniverse.Force_Str_2}}&nbsp;&nbsp;\r\n      </h5>\r\n      <h5 style=\"display: inline-block; text-align:right;\">\r\n        <i id=\"Force_Str_2-Up\" class=\"fa fa-caret-square-o-up fa-stack\" style=\"cursor: pointer; margin-top: -20px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"increaseStat('Force_Str_2-Up')\"></i>\r\n\r\n\r\n        <i id=\"Force_Str_2-Down\" class=\"fa fa-caret-square-o-down fa-stack\" style=\"cursor: pointer; margin-top: 20px; margin-left: -5.5px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id);\" onmouseup=\"mouseUp(this.id);\" (click)=\"decreaseStat('Force_Str_2-Down')\"></i>\r\n\r\n      </h5>\r\n    </div>\r\n\r\n    <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n\r\n      <h5 class=\"noselect\" tooltip={{blah}} placement=\"left\" style=\"display: inline; cursor:default;\">\r\n        {{stage2Form.rolledUniverse.Force_3}}: {{stage2Form.rolledUniverse.Force_Str_3}}&nbsp;&nbsp;\r\n      </h5>\r\n      <h5 style=\"display: inline-block; text-align:right;\">\r\n        <i id=\"Force_Str_3-Up\" class=\"fa fa-caret-square-o-up fa-stack\" style=\"cursor: pointer; margin-top: -20px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"increaseStat('Force_Str_3-Up')\"></i>\r\n\r\n\r\n        <i id=\"Force_Str_3-Down\" class=\"fa fa-caret-square-o-down fa-stack\" style=\"cursor: pointer; margin-top: 20px; margin-left: -5.5px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id);\" onmouseup=\"mouseUp(this.id);\" (click)=\"decreaseStat('Force_Str_3-Down')\"></i>\r\n\r\n      </h5>\r\n\r\n    </div>\r\n    <h5 style=\"text-decoration: underline; color: coral; margin-bottom: 30px; text-align: center; margin-top: 30px;\">The Conceptual</h5>\r\n    <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n\r\n      <h5 class=\"noselect\" tooltip={{blah}} placement=\"left\" style=\"display: inline; cursor:default;\">\r\n        {{stage2Form.rolledUniverse.Concept_1}}: {{stage2Form.rolledUniverse.Concept_Str_1}}&nbsp;&nbsp;\r\n      </h5>\r\n      <h5 style=\"display: inline-block; text-align:right;\">\r\n        <i id=\"Concept_Str_1-Up\" class=\"fa fa-caret-square-o-up fa-stack\" style=\"cursor: pointer; margin-top: -20px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"increaseStat('Concept_Str_1-Up')\"></i>\r\n\r\n\r\n        <i id=\"Concept_Str_1-Down\" class=\"fa fa-caret-square-o-down fa-stack\" style=\"cursor: pointer; margin-top: 20px; margin-left: -5.5px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id);\" onmouseup=\"mouseUp(this.id);\" (click)=\"decreaseStat('Concept_Str_1-Down')\"></i>\r\n\r\n      </h5>\r\n    </div>\r\n    <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n\r\n      <h5 class=\"noselect\" tooltip={{blah}} placement=\"left\" style=\"display: inline; cursor:default;\">\r\n        {{stage2Form.rolledUniverse.Concept_2}}: {{stage2Form.rolledUniverse.Concept_Str_2}}&nbsp;&nbsp;\r\n      </h5>\r\n      <h5 style=\"display: inline-block; text-align:right;\">\r\n        <i id=\"Concept_Str_2-Up\" class=\"fa fa-caret-square-o-up fa-stack\" style=\"cursor: pointer; margin-top: -20px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"increaseStat('Concept_Str_2-Up')\"></i>\r\n\r\n\r\n        <i id=\"Concept_Str_2-Down\" class=\"fa fa-caret-square-o-down fa-stack\" style=\"cursor: pointer; margin-top: 20px; margin-left: -5.5px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id);\" onmouseup=\"mouseUp(this.id);\" (click)=\"decreaseStat('Concept_Str_2-Down')\"></i>\r\n\r\n      </h5>\r\n    </div>\r\n    <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n\r\n      <h5 class=\"noselect\" tooltip={{blah}} placement=\"left\" style=\"display: inline; cursor:default;\">\r\n        {{stage2Form.rolledUniverse.Concept_3}}: {{stage2Form.rolledUniverse.Concept_Str_3}}&nbsp;&nbsp;\r\n      </h5>\r\n      <h5 style=\"display: inline-block; text-align:right;\">\r\n        <i id=\"Concept_Str_3-Up\" class=\"fa fa-caret-square-o-up fa-stack\" style=\"cursor: pointer; margin-top: -20px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id); \" onmouseup=\"mouseUp(this.id);\" (click)=\"increaseStat('Concept_Str_3-Up')\"></i>\r\n\r\n\r\n        <i id=\"Concept_Str_3-Down\" class=\"fa fa-caret-square-o-down fa-stack\" style=\"cursor: pointer; margin-top: 20px; margin-left: -5.5px; width: 0em; height: 0em; line-height: 0em;\" onmousedown=\"mouseDown(this.id);\" onmouseup=\"mouseUp(this.id);\" (click)=\"decreaseStat('Concept_Str_3-Down')\"></i>\r\n\r\n\r\n      </h5>\r\n\r\n    </div>\r\n  </div>\r\n  <div>\r\n    <button style=\"margin-top: 20px; text-align: center;\" type=\"button\" (click)=\"reset()\" [disabled]=\"resetToggle\">Reset</button><br />\r\n    <button style=\"margin-top: 20px; text-align: center;\" type=\"button\" (click)=\"reroll()\" [disabled]=\"resetToggle\">Re-Roll Stats</button><br />\r\n    <h5 class=\"noselect\" tooltip={{blah}} placement=\"top\" style=\"cursor:default; text-align: center; margin-top: 20px;\">&nbsp;&nbsp;&nbsp;Points Left You Can Adjust (Based On Sage Level): {{pointsLeftYouCanAdjust}}</h5><br />\r\n    <h5 class=\"noselect\" tooltip={{blah}} placement=\"top\" style=\"cursor:default; text-align: center;\">&nbsp;Points In Pool: {{pointsInPool}}</h5>\r\n\r\n    <p style=\"color: green; font-style: italic; text-align: center;\">(Directions: First Remove The Points to the Pool by deducting from your current Universe's attributes. Once they are in the point pool, \r\n    you can then reassign them as you see wish.  If you want to start over again, just hit the \"reset\" button. You may also spend some energy and take a huge hit to a chance of a faulty Universe to re-roll the random parts of this Universe's stats.)</p>      <br />\r\n\r\n    <button type=\"button\" (click)=\"submit()\" [disabled]=\"submitToggle\">Proceed to Stage 3....</button><br /><br /><br />\r\n    <p style=\"text-decoration:wavy ; color: red;\">{{scoldMessage}} </p>\r\n    <div style=\"text-align: center;\" class=\"container\">\r\n      <h5 style=\"text-decoration:wavy ; color: red;\">Energy Cost: {{stage2Form.cost}} </h5><br />\r\n      <h5 style=\"text-decoration:wavy ; color: red;\">Faulty Universe %: {{stage2Form.faultyUniverse}} </h5><br /><br />\r\n      <br />\r\n    </div>\r\n  </div>\r\n</div>\r\n<div style=\"margin-top: 30px; text-align: center;\">\r\n  <i class=\"fa fa-spinner fa-spin fa-3x\" aria-hidden=\"true\" animation=\"spin\" size=\"4x\" *ngIf=\"stage3Form.spinToggle\"></i>\r\n</div><br />\r\n<app-stage-3-form [stage3Form]=\"stage3Form\"></app-stage-3-form><!--Remember to bind @input shit here too for child components/this is the part that does the actual @input binding-->\r\n"

/***/ }),

/***/ 462:
/***/ (function(module, exports) {

module.exports = "<div style=\"text-align: center;\" class=\"container\" *ngIf=\"stage3Form.showForm\">\r\n  <br /><br />\r\n  <h3 style=\"color:green\">Available Energy: </h3>\r\n  <h4 style=\"color:green\">{{stage3Form.availableEnergy}}</h4>\r\n  <h5 style=\"text-decoration: underline;\">Stage 3: The Physical Laws You Control</h5><br />\r\n  <p style=\"font-weight: bold; color: blue;\">\r\n    The Multiverse says to you, \"Congratulations Sage! I have no idea how you were able to balance this Universe so well, but it is turning out to be something spectacular! \r\n    Now you get to choose your laws of nature for this Universe!\"\r\n  </p><br />\r\n  <p style=\"font-weight: bold; color: green; margin-bottom: 20px;\">\r\n    Every Universe provides you with a set of physical laws you may use as abilities (or your moves) in battle. Each Universe has a set of 1-4 moves where one at least\r\n    one move acts as a base energy generator\r\n  </p><br />\r\n  <div class=\"col-md-12\">\r\n    <h5 style=\"text-decoration: underline; color: orangered; margin-bottom: 20px;\">{{stage3Form.rolledUniverse.name}}</h5><br /><br />\r\n    <h5>-------------------------------------------------------------------------------------------------------------</h5>\r\n    <div style=\"font-weight: bold; color: green; margin: 50px;\">\r\n      <h5 style=\"text-decoration: underline;\">Move 1 (Default)  </h5><br /><br />\r\n      <p style=\"color:blue;\">\r\n        {{Move1Name}}<br /><br />\r\n        Times Buffed: {{buff1Tally}}\r\n      </p>\r\n      <button style=\"margin-top: 20px; margin-bottom: 20px; text-align: center;\" type=\"button\" (click)=\"buff(1)\" [disabled]=\"!buff1Toggle\">Buff This Move</button><br />\r\n      <p style=\"color:red;\">Energy Cost: {{buff1EnergyCost}}</p>\r\n      <p style=\"color:red;\">Faulty Universe Increase: {{buff1FaultyIncrease}}%</p>\r\n    </div>\r\n    <div><p style=\"color:red; text-align: center;\"> {{scoldMessage1}}</p></div>\r\n    <h5>-------------------------------------------------------------------------------------------------------------</h5>\r\n    <div style=\"font-weight: bold; color: green; margin: 50px;\">\r\n      <h5 style=\"text-decoration: underline;\">Move 2:</h5><br /><br />\r\n      <form action=\"\">\r\n        <label tooltip=\"show the stats of each move here\" style=\"cursor: pointer;\"> <input type=\"radio\" [disabled]=\"!move2Radio\" name=\"move2\" [value]=\"radioMove2Choice1\" (change)=\"onSelectionChange2(radioMove2Choice1)\" checked> {{this.RandMoveName1[2]}}</label><br>\r\n        <label tooltip=\"show the stats of each move here\" style=\"cursor: pointer;\"> <input type=\"radio\" [disabled]=\"!move2Radio\" name=\"move2\" [value]=\"radioMove2Choice2\" (change)=\"onSelectionChange2(radioMove2Choice2)\"> {{this.RandMoveName2[2]}}</label><br>\r\n        <label tooltip=\"show the stats of each move here\" style=\"cursor: pointer;\"> <input type=\"radio\" [disabled]=\"!move2Radio\" name=\"move2\" [value]=\"radioMove2Choice3\" (change)=\"onSelectionChange2(radioMove2Choice3)\"> {{this.RandMoveName3[2]}}</label><br>\r\n      </form>\r\n\r\n      <div class=\"row\" style=\"color:red; font-weight: bold; margin: 30px;\">\r\n        <div class=\"col-md-4\">\r\n          {{test}}\r\n          <button style=\"margin-top: 20px; margin-bottom: 20px; text-align: center;\" type=\"button\" (click)=\"buff(2)\" [disabled]=\"!buff2Toggle\">Buff This Move</button><br />\r\n          <p style=\"color:red;\">Energy Cost: {{buff2EnergyCost}}</p>\r\n          <p style=\"color:red;\">Faulty Universe Increase: {{buff2FaultyIncrease}}%</p>\r\n        </div>\r\n\r\n        <div class=\"col-md-4\">\r\n          <p style=\"color:blue;\">\r\n            {{ this.selectedEntry2 | json }}<br /><br />\r\n            Times Buffed: {{buff2Tally}}\r\n          </p>\r\n          <button style=\"margin-top: 20px; margin-bottom: 20px; text-align: center;\" type=\"button\" (click)=\"purchase2()\" [disabled]=\"!purchase2Toggle\">Purchase This Move</button><br />\r\n         \r\n          <p style=\"color:red;\">Energy Cost: {{purchase2EnergyCost}}</p>\r\n          <p style=\"color:red;\">Faulty Universe Increase: {{purchase2FaultyIncrease}}%</p>\r\n        </div>\r\n\r\n        <div class=\"col-md-4\">\r\n          <button style=\"margin-top: 20px; margin-bottom: 20px; text-align: center;\" type=\"button\" (click)=\"reroll(2)\" [disabled]=\"!reroll2Toggle\">Re-Roll Move</button><br />\r\n          <p style=\"color:red;\">Energy Cost: {{reroll2EnergyCost}}</p>\r\n          <p style=\"color:red;\">Faulty Universe Increase: {{reroll2FaultyIncrease}}%</p>\r\n        </div>\r\n        <div><p style=\"color:red; text-align: center;\"> {{scoldMessage2}}</p></div>\r\n      </div>\r\n    </div>\r\n    <h5>-------------------------------------------------------------------------------------------------------------</h5>\r\n    <div style=\"font-weight: bold; color: green; margin: 50px;\">\r\n      <h5 style=\"text-decoration: underline;\">Move 3:</h5><br /><br />\r\n      <form>\r\n        <label tooltip=\"show the stats of each move here\" style=\"cursor: pointer;\"> <input type=\"radio\" [disabled]=\"!move3Radio\" name=\"move3\" [value]=\"radioMove3Choice1\" (change)=\"onSelectionChange3(radioMove3Choice1)\" checked> {{this.RandMoveName1[3]}}</label><br>\r\n        <label tooltip=\"show the stats of each move here\" style=\"cursor: pointer;\"> <input type=\"radio\" [disabled]=\"!move3Radio\" name=\"move3\" [value]=\"radioMove3Choice2\" (change)=\"onSelectionChange3(radioMove3Choice2)\"> {{this.RandMoveName2[3]}}</label><br>\r\n        <label tooltip=\"show the stats of each move here\" style=\"cursor: pointer;\"> <input type=\"radio\" [disabled]=\"!move3Radio\" name=\"move3\" [value]=\"radioMove3Choice3\" (change)=\"onSelectionChange3(radioMove3Choice3)\"> {{this.RandMoveName3[3]}}</label><br>\r\n      </form>\r\n\r\n      <div class=\"row\" style=\"color:red; font-weight: bold; margin: 30px;\">\r\n        <div class=\"col-md-4\">\r\n          <button style=\"margin-top: 20px; margin-bottom: 20px; text-align: center;\" type=\"button\" (click)=\"buff(3)\" [disabled]=\"!buff3Toggle\">Buff This Move</button><br />\r\n          <p style=\"color:red;\">Energy Cost: {{buff3EnergyCost}}</p>\r\n          <p style=\"color:red;\">Faulty Universe Increase: {{buff3FaultyIncrease}}%</p>\r\n        </div>\r\n        \r\n        <div class=\"col-md-4\">\r\n          <p style=\"color:blue;\">\r\n            {{ this.selectedEntry3 | json }}<br /><br />\r\n            Times Buffed: {{buff3Tally}}\r\n          </p>\r\n          <button style=\"margin-top: 20px; margin-bottom: 20px; text-align: center;\" type=\"button\" (click)=\"purchase3()\" [disabled]=\"!purchase3Toggle\">Purchase This Move</button><br />\r\n          <p style=\"color:red;\">Energy Cost: {{purchase3EnergyCost}}</p>\r\n          <p style=\"color:red;\">Faulty Universe Increase: {{purchase3FaultyIncrease}}%</p>\r\n        </div>\r\n\r\n        <div class=\"col-md-4\">\r\n          <button style=\"margin-top: 20px; margin-bottom: 20px; text-align: center;\" type=\"button\" (click)=\"reroll(3)\" [disabled]=\"!reroll3Toggle\">Re-Roll Move</button><br />\r\n          <p style=\"color:red;\">Energy Cost: {{reroll3EnergyCost}}</p>\r\n          <p style=\"color:red;\">Faulty Universe Increase: {{reroll3FaultyIncrease}}%</p>\r\n        </div>\r\n        <div><p style=\"color:red; text-align: center;\"> {{scoldMessage3}}</p></div>\r\n      </div>\r\n    </div>\r\n    <h5>-------------------------------------------------------------------------------------------------------------</h5>\r\n    <div style=\"font-weight: bold; color: green; margin: 50px;\">\r\n      <h5 style=\"text-decoration: underline;\">Move 4:</h5><br /><br />\r\n      <form>\r\n        <label tooltip=\"show the stats of each move here\" style=\"cursor: pointer;\"> <input [disabled]=\"!move4Radio\" type=\"radio\" name=\"move4\" [value]=\"radioMove4Choice1\" (change)=\"onSelectionChange4(radioMove4Choice1)\" checked> {{this.RandMoveName1[4]}}</label><br>\r\n        <label tooltip=\"show the stats of each move here\" style=\"cursor: pointer;\"> <input [disabled]=\"!move4Radio\" type=\"radio\" name=\"move4\" [value]=\"radioMove4Choice2\" (change)=\"onSelectionChange4(radioMove4Choice2)\" c> {{this.RandMoveName2[4]}}</label><br>\r\n        <label tooltip=\"show the stats of each move here\" style=\"cursor: pointer;\"> <input [disabled]=\"!move4Radio\" type=\"radio\" name=\"move4\" [value]=\"radioMove4Choice3\" (change)=\"onSelectionChange4(radioMove4Choice3)\" c> {{this.RandMoveName3[4]}}</label><br>\r\n      </form>\r\n\r\n      <div class=\"row\" style=\"color:red; font-weight: bold; margin: 30px;\">\r\n        <div class=\"col-md-4\">\r\n          <button style=\"margin-top: 20px; margin-bottom: 20px; text-align: center;\" type=\"button\" (click)=\"buff(4)\" [disabled]=\"!buff4Toggle\">Buff This Move</button><br />\r\n          <p style=\"color:red;\">Energy Cost: {{buff4EnergyCost}}</p>\r\n          <p style=\"color:red;\">Faulty Universe Increase: {{buff4FaultyIncrease}}%</p>\r\n        </div>\r\n       \r\n        <div class=\"col-md-4\">\r\n          <p style=\"color:blue;\">\r\n            {{ this.selectedEntry4 | json }}<br /><br />\r\n            Times Buffed: {{buff4Tally}}\r\n          </p>\r\n          <button style=\"margin-top: 20px; margin-bottom: 20px; text-align: center;\" type=\"button\" (click)=\"purchase4()\" [disabled]=\"!purchase4Toggle\">Purchase This Move</button><br />\r\n          <p style=\"color:red;\">Energy Cost: {{purchase4EnergyCost}}</p>\r\n          <p style=\"color:red;\">Faulty Universe Increase: {{purchase4FaultyIncrease}}%</p>\r\n        </div>\r\n        <div class=\"col-md-4\">\r\n          <button style=\"margin-top: 20px; margin-bottom: 20px; text-align: center;\" type=\"button\" (click)=\"reroll(4)\" [disabled]=\"!reroll4Toggle\">Re-Roll Move</button><br />\r\n          <p style=\"color:red;\">Energy Cost: {{reroll4EnergyCost}}</p>\r\n          <p style=\"color:red;\">Faulty Universe Increase: {{reroll4FaultyIncrease}}%</p>\r\n        </div>\r\n        <div><p style=\"color:red; text-align: center;\"> {{scoldMessage4}}</p></div>\r\n      </div>\r\n    </div>\r\n    <h5>-------------------------------------------------------------------------------------------------------------</h5>\r\n    <div *ngIf=\"perfectUniverse\" style=\"font-weight: bold; color: green; margin: 50px;\">\r\n      \r\n      <h4 style=\"text-decoration: underline; color: goldenrod;\">Ultimate Move:</h4><br /><br />\r\n      <p style=\"color: blue;\">{{MoveUltimateName}}<br /><br />\r\n        Times Buffed: {{buff5Tally}}</p>\r\n      \r\n\r\n        <button style=\"margin-top: 20px; margin-bottom: 20px; text-align: center;\" type=\"button\" (click)=\"rerollUltimate()\" [disabled]=\"!reroll5Toggle\">Re-Roll Move Once For Free!</button><br />\r\n\r\n      <div class=\"row\" style=\"color:red; font-weight: bold; margin: 30px;\">\r\n        <div class=\"col-md-6\">\r\n          <button style=\"margin-top: 20px; margin-bottom: 20px; text-align: center;\" type=\"button\" (click)=\"buff(5)\" [disabled]=\"!buff5Toggle\">Buff This Move</button><br />\r\n          <p style=\"color:red;\">Energy Cost: {{buff5EnergyCost}}</p>\r\n          <p style=\"color:red;\">Faulty Universe Increase: {{buff5FaultyIncrease}}%</p>\r\n        </div>\r\n\r\n        <div class=\"col-md-6\">\r\n          <button style=\"margin-top: 20px; margin-bottom: 20px; text-align: center;\" type=\"button\" (click)=\"purchase5()\" [disabled]=\"!purchase5Toggle\">Purchase This Move</button><br />\r\n          <p style=\"color:red;\">Energy Cost: {{purchase5EnergyCost}}</p>\r\n          <p style=\"color:red;\">Faulty Universe Increase: {{purchase5FaultyIncrease}}%</p>\r\n\r\n        </div>\r\n      </div>\r\n      <p style=\"color: blue;\">{{perfectUniverseMessage}}</p>\r\n      <div><p style=\"color:red; text-align: center;\"> {{scoldMessage5}}</p></div>\r\n    </div>\r\n  </div>\r\n  <h5>-------------------------------------------------------------------------------------------------------------</h5>\r\n      <p style=\"color: green; font-style: italic; text-align: center;\">\r\n        (Directions: )\r\n      </p>      <br />\r\n\r\n      <p style=\"text-decoration:wavy ; color: red;\">{{scoldMessage}} </p>\r\n      <div style=\"text-align: center;\" class=\"container\">\r\n        <h5 style=\"text-decoration:wavy ; color: red;\">Energy Cost: {{stage3Form.cost}} </h5><br />\r\n        <h5 style=\"text-decoration:wavy ; color: red;\">Faulty Universe %: {{stage3Form.faultyUniverse}} </h5><br /><br />\r\n        <br />\r\n      </div>\r\n  <div style=\"margin-top: 20px; color: green;\">\r\n    <p>\r\n      The Multiverse says to you, \"Just to be clear my lord, you are about to create your fine-tuned Universe. The following \r\n      is an estimation summary of your chances of succes.\"\r\n    </p>\r\n\r\n   \r\n    <ul style=\"list-style: none; font-weight: bold;\">\r\n      <li>You get your finely-tuned Universe card if you roll between {{stage3Form.faultyUniverse}} and 100%.</li>\r\n    </ul>\r\n    <button type=\"button\" (click)=\"rollUniverseCard()\" [disabled]=\"!rollUniverse\">Roll Universe Card....</button><br /><br />\r\n  </div>\r\n  <p style=\"color: blue; font-weight: bold;\">{{rollMessage}} </p>\r\n  <div style=\"margin-top: 30px\">\r\n    <i class=\"fa fa-spinner fa-spin fa-3x\" aria-hidden=\"true\" animation=\"spin\" size=\"4x\" *ngIf=\"spinToggle\"></i>\r\n  </div>\r\n</div>\r\n<app-stage-4-form [stage4Form]=\"stage4Form\"></app-stage-4-form><!--Remember to bind @input shit here too for child components/this is the part that does the actual @input binding-->\r\n<app-render-universe [renderUniverseForm]=\"renderUniverseForm\"></app-render-universe><!--Remember to bind @input shit here too for child components/this is the part that does the actual @input binding-->\r\n"

/***/ }),

/***/ 463:
/***/ (function(module, exports) {

module.exports = "<div style=\"text-align: center;\" class=\"container\" *ngIf=\"renderUniverseForm.showForm\">\r\n  <br /><br />\r\n  <h3 style=\"color:green\">Available Energy: </h3>\r\n  <h4 style=\"color:green\">{{renderUniverseForm.availableEnergy}}</h4>\r\n  <h5 style=\"text-decoration: underline;\">Stage 5: Moment of Creation!!!!</h5><br />\r\n  <p style=\"font-weight: bold; color: blue;\">\r\n    The Multiverse says to you, \"Congratulations Sage of the Multiverse! Look below to gaze upon the Majesty of your new Creation!\".\r\n  </p><br />\r\n\r\n\r\n\r\n  <h1 style=\"text-decoration: underline; color: orangered;\"> {{renderUniverseForm.universeCard.name}}</h1><br /><br />\r\n  <h3 style=\"font-style: italic; color: blue;\"> Created By: Sage {{renderUniverseForm.universeCard.Created_By}}</h3><br /><br />\r\n  <h4 style=\"color: blueviolet;\">Description</h4><br /><br />\r\n\r\n  <p style=\"color: blue; font-style: italic;\">\"{{renderUniverseForm.universeCard.description}}\"</p>\r\n  <br /><br />\r\n  <h5 style=\"text-decoration: underline; color: orangered;\"> The Forces </h5><br />\r\n\r\n    <p style=\"color: green; font-weight: bold;\">{{renderUniverseForm.universeCard.Force_Name_1}}: {{renderUniverseForm.universeCard.Strength_Force_1}}</p>\r\n    <p style=\"color: green; font-weight: bold;\">{{renderUniverseForm.universeCard.Force_Name_2}}: {{renderUniverseForm.universeCard.Strength_Force_2}}</p>\r\n    <p style=\"color: green; font-weight: bold;\">{{renderUniverseForm.universeCard.Force_Name_3}}: {{renderUniverseForm.universeCard.Strength_Force_3}}</p>\r\n\r\n\r\n  <br />\r\n\r\n  <h5 style=\"text-decoration: underline; color: orangered;\"> The Conceptual </h5><br />\r\n\r\n    <p style=\"color: green; font-weight: bold;\">{{renderUniverseForm.universeCard.Concept_Name_1}}: {{renderUniverseForm.universeCard.Strength_Concept_1}}</p>\r\n    <p style=\"color: green; font-weight: bold;\">{{renderUniverseForm.universeCard.Concept_Name_2}}: {{renderUniverseForm.universeCard.Strength_Concept_2}}</p>\r\n    <p style=\"color: green; font-weight: bold;\">{{renderUniverseForm.universeCard.Concept_Name_3}}: {{renderUniverseForm.universeCard.Strength_Concept_3}}</p>\r\n\r\n    <br />\r\n\r\n  <h5 style=\"text-decoration: underline; color: orangered;\"> The Laws You Can Bend (Your Moves) </h5><br />\r\n\r\n    <p style=\"color: green; font-weight: bold;\">{{this.moveName[1]}}: Buff Level {{renderUniverseForm.universeCard.Move1_Buff_Tally}}</p>\r\n    <p style=\"color: green; font-weight: bold;\">{{this.moveName[2]}}: Buff Level {{renderUniverseForm.universeCard.Move2_Buff_Tally}}</p>\r\n    <p style=\"color: green; font-weight: bold;\">{{this.moveName[3]}}: Buff Level {{renderUniverseForm.universeCard.Move3_Buff_Tally}}</p>\r\n    <p style=\"color: green; font-weight: bold;\">{{this.moveName[4]}}: Buff Level {{renderUniverseForm.universeCard.Move4_Buff_Tally}}</p>\r\n    <p style=\"font-weight: bold; color: goldenrod;\" *ngIf=\"moveUltimate\">Ultimate --- {{this.moveName[5]}}: Buff Level {{renderUniverseForm.universeCard.MoveUltimate_Buff_Tally}}</p>\r\n\r\n  <br />\r\n  <h5 style=\"text-decoration: underline; color: blue;\"> Approximate Energy Value: {{renderUniverseForm.universeCard.Energy_Value}} </h5><br />\r\n  <h5 style=\"color: goldenrod;\"><br />\r\n    {{renderUniverseForm.universeCard.Energy_Value}}\r\n  </h5><br /><br /> <br />\r\n  <h5 style=\"text-decoration: underline; color: blue;\"> Original Universe Model</h5> <br />\r\n  <h5 style=\"color: orangered;\"><br />\r\n    {{universeCategory.name}}\r\n  </h5><br /><br /> <br />\r\n\r\n    <p style=\"text-decoration:wavy ; color: red;\">{{scoldMessage}} </p>\r\n</div>"

/***/ }),

/***/ 464:
/***/ (function(module, exports) {

module.exports = "<div style=\"text-align: center;\" class=\"container\" *ngIf=\"stage4Form.showForm\">\r\n  <br /><br />\r\n  <h3 style=\"color:green\">Available Energy: </h3>\r\n  <h4 style=\"color:green\">{{stage4Form.availableEnergy}}</h4>\r\n  <h5 style=\"text-decoration: underline;\">Stage 4: Customization</h5><br />\r\n  <p style=\"font-weight: bold; color: blue;\">\r\n    The Multiverse says to you, \"Here you can truly make this universe to you by choosing a name and write a custom description for it\".\r\n  </p><br />\r\n  <p style=\"font-weight: bold; color: green; margin-bottom: 20px;\">\r\n    Congratulations Sage!  If you are seeing this page, that means you successfully created your Universe Card without any glitches!<br />\r\n    <br /><br />\r\n    You can relax now, for this is no risk or cost for simply editting the name and description of your unique universe to your liking.....\r\n  </p><br />\r\n\r\n  <label>Enter your Universe's Name:</label><br /><br />\r\n  <input [(ngModel)]=\"universeName\" (keyup)=\"0\" placeholder=\"{{universeName}}\"><br /><br />\r\n\r\n\r\n\r\n  <h4 style=\"color: blue; margin-top: 30px; margin-bottom: 30px;\">Your New Universe will be further known throughout the Multiverse as:</h4>\r\n  <h5 style=\"text-decoration: underline; color: orangered;\">{{universeName}}</h5><br /><br />\r\n\r\n  <label>Enter your Universe's Description:</label><br /><br />\r\n  <textarea [(ngModel)]=\"universeDescription\" rows=\"12\" cols=\"150\">\r\n      {{universeDescription}}\r\n  </textarea>\r\n\r\n\r\n  <h4 style=\"color: blueviolet; margin-top: 40px;\">Description:</h4>\r\n  <p style=\"color: blue; margin-top: 10px; font-style: italic;\">{{universeDescription}}</p><br /><br />\r\n\r\n  <button type=\"button\" (click)=\"submit()\" [disabled]=\"submitToggle\">Confirm....Show me my Universe!</button><br /><br /><br />\r\n  <p style=\"text-decoration:wavy ; color: red;\">{{scoldMessage}} </p>\r\n</div>\r\n<app-render-universe [renderUniverseForm]=\"renderUniverseForm\"></app-render-universe><!--Remember to bind @input shit here too for child components/this is the part that does the actual @input binding-->\r\n"

/***/ }),

/***/ 465:
/***/ (function(module, exports) {

module.exports = "<br />\r\n<h4 style=\"text-align: center; color:blue\">Welcome to your Universe Generator!</h4>\r\n<br />\r\n<h5 style=\"text-align: center; color:blue\">{{tutorial}}</h5>\r\n<br /><br /><br /><br />\r\n<div style=\"text-align: center;\">\r\n<h3 style=\"text-align: center;\" *ngIf =\"stage1Form.showCostFaulty\">\r\n  {{title}}\r\n</h3>\r\n  <p style=\"text-align: center; font-style: italic;\">\r\n    {{subTitle}}\r\n  </p>\r\n<br />\r\n  <br />\r\n\r\n\r\n</div>\r\n\r\n<div style=\"text-align: center;\" class=\"container\" *ngIf=\"mainForm\">\r\n\r\n  <h3 style=\"color:green\">Available Energy: </h3>\r\n  <h4 style=\"color:green\">{{stage1Form.availableEnergy}}</h4>\r\n  <br />\r\n  <h5 style=\"text-decoration: underline;\">Stage 0: Before The Big Bang</h5><br />\r\n  <p style=\"font-weight: bold; color: blue;\">\r\n    Enter in any website's URL to give that initial 'spark' of energy to your Universe!\r\n  </p><br />\r\n  <p>\r\n    https://\r\n    <input [(ngModel)]=\"inputURL\" placeholder=\"Website URL\">\r\n  </p>\r\n\r\n  <br />\r\n  <div style=\"text-align: center;\">\r\n    <label>URL you are entering: </label>\r\n    <br />\r\n    <p id=\"for-first-test\">https://{{inputURL}}</p>\r\n    <p><i>(only https protocol allowed at this time)</i></p>\r\n  </div>\r\n\r\n  <br />\r\n  <button type=\"button\" (click)=\"showData()\" [disabled]=\"buttonToggle\">Make My Universe!</button><br /><br />\r\n  <p style=\"color: red;\">Once Finished the Universe Generator will cost 5-10 energy to start.</p><br />\r\n  <div style=\"text-align: center;\" class=\"container\" *ngIf =\"stage1Form.showCostFaulty\">\r\n    <h5 style=\"text-decoration:wavy ; color: red;\">Energy Cost: {{this.stage1Form.cost}} </h5><br />\r\n    <h5 style=\"text-decoration:wavy ; color: red;\">Faulty Universe %: {{this.stage1Form.faultyUniverse}} </h5><br />\r\n  </div>\r\n</div>\r\n<app-stage-1-form [stage1Form]=\"stage1Form\"></app-stage-1-form><!--Remember to bind @input shit here too for child components/this is the part that does the actual @input binding-->\r\n\r\n<div style=\"text-align: center;\">\r\n    <div style=\"margin-top: 20px; color: green; font-weight: bold;\">\r\n      {{response}}\r\n    </div>\r\n    <div style=\"margin-top: 30px\">\r\n      <i class=\"fa fa-spinner fa-spin fa-3x\" aria-hidden=\"true\" animation=\"spin\" size=\"4x\" *ngIf=\"spinToggle\"></i>\r\n    </div><br />\r\n\r\n    <div style=\"color: red;\">\r\n      {{error | json}}\r\n    </div>\r\n\r\n  <div style=\"text-align: center; margin-top: 20px;\">\r\n    <button type=\"button\" (click)=\"addTestCard()\">Add Test Card</button>\r\n\r\n\r\n    <button type=\"button\" (click)=\"back()\">Home Page</button>\r\n    <br /><br />\r\n\r\n    <br />\r\n\r\n\r\n    <br /><br />\r\n    <h3 style=\"red;\">**IMPORTANT CORS NOTE**</h3>\r\n    <p>\r\n      To get the most out of this generator it is <i>strongly</i> recommended to <b>download one of these extensions</b> for your browser that allows\r\n      \"Cross-Origin Resource Sharing (CORS)\".\r\n    </p>\r\n    <h5>\r\n      Below is a list of links I recommend for some of the most popular browsers:\r\n    </h5>\r\n    <ul style=\"list-style:none;\">\r\n\r\n      <li>\r\n        <h4>\r\n          <a href=\"https://chrome.google.com/webstore/detail/cors-toggle/jioikioepegflmdnbocfhgmpmopmjkim?hl=en\" target=\"_blank\">\r\n            Chrome\r\n          </a>\r\n        </h4>\r\n      </li>\r\n      <li>\r\n        <h4>\r\n          <a href=\"https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere\" target=\"_blank\">\r\n            Firefox\r\n          </a>\r\n        </h4>\r\n      </li>\r\n      <li style=\"color: red;\">  <i>(Explorer and Safari is unsupported at this stage.)</i> </li>\r\n    </ul>\r\n    <br />\r\n    <p>\r\n      Basically, this will allow permissions for this generator to 'talk' to other servers, and\r\n      this has to be assigned at the 'browser' level and not the program level to avoid triggering preflights (since many URLS do not\r\n      accept preflight requests using 'GET').\r\n    </p>\r\n    <p>If you are still getting network errors, please make sure the extension is <i>toggled on</i>!</p>\r\n\r\n    <p>It goes without saying, I will keep my eye out for angular packages that will help mitigate this problem without the need of the user \r\n    to download extra or configure stuff.</p>\r\n    <br />\r\n\r\n    <br />\r\n    <!--\r\n    <label style=\"color:blue\">Get Request Type: </label>\r\n    <select [(ngModel)]=\"get.type\">\r\n      <option value=\"HTML\">HTML</option>\r\n      <option value=\"XML\">XML</option>\r\n      <option value=\"JSON\">JSON</option>\r\n    </select>\r\n        -->\r\n\r\n\r\n  </div>\r\n  <br />\r\n  <br />\r\n  <br />\r\n  <br /><br />\r\n  (When I'm ready to make this look nice, adding a little intro screen to set the mood with a little SOMV lore. (Make sure to mention the different fluxes they use and can take a variety of forms as instruments to bend physics to their will!!!))\r\n\r\n</div>"

/***/ }),

/***/ 466:
/***/ (function(module, exports) {

module.exports = "<h2 style=\"text-align: center;\">\r\n  {{title}}\r\n</h2>\r\n\r\n\r\n\r\n<div style=\"text-align: center;\">\r\n  <br />\r\n  <i class=\"fa fa-spinner fa-spin fa-3x\" aria-hidden=\"true\" animation=\"spin\" size=\"4x\" *ngIf=\"spinToggle2\"></i>\r\n  <br /><br />\r\n  <h1>\r\n    {{race.race_name}}\r\n  </h1>\r\n  <h2>\r\n    Level: {{sage.Level}}\r\n\r\n  </h2>\r\n  <br />\r\n  <h5 tooltip={{tipDimensionalWake}} placement=\"bottom\" style=\"text-align: center; cursor: default;\">\r\n    You exist in {{race.dimensional_wake}} spacetime.\r\n  </h5>\r\n  <br />\r\n  <p style=\"color: blue;\">{{race.description}}</p>\r\n\r\n  <br />\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <h3 tooltip={{tipPrimaryAttributes}} placement=\"top\" style=\"text-align: center; cursor:default;\">\r\n        {{subTitle}}\r\n      </h3>\r\n      <p>\r\n        {{attributeDescription}}\r\n      </p>\r\n\r\n      <br />\r\n\r\n      <div class=\"btn-group-vertical text-right\" role=\"group\" style=\"margin-left: -18%;\">\r\n        <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n          <h5 class=\"noselect\" tooltip={{tipIntuition}} placement=\"left\" style=\"display:inline-block; cursor:default;\">\r\n            <!--I am playing with custom tooltip placement/styles-->\r\n            Intuition: {{sage.Intuition}}&nbsp;&nbsp;\r\n          </h5>\r\n        </div>\r\n\r\n        <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n          <h5 class=\"noselect\" tooltip={{tipIngenuity}} placement=\"left\" style=\"display: initial; cursor:default;\">\r\n            Ingenuity: {{sage.Ingenuity}}&nbsp;&nbsp;\r\n          </h5>\r\n        </div>\r\n\r\n        <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n\r\n          <h5 class=\"noselect\" tooltip={{tipInquisitiveness}} placement=\"left\" style=\"display: inline; cursor:default;\">\r\n            Inquisitiveness: {{sage.Inquisitiveness}}&nbsp;&nbsp;\r\n          </h5>\r\n\r\n        </div>\r\n        <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n\r\n          <h5 class=\"noselect\" tooltip={{tipIntelligence}} placement=\"left\" style=\"display: inline; cursor:default;\">\r\n            Intelligence: {{sage.Intelligence}}&nbsp;&nbsp;\r\n          </h5>\r\n        </div>\r\n        <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n\r\n          <h5 class=\"noselect\" tooltip={{tipInvigoration}} placement=\"left\" style=\"display: inline; cursor:default;\">\r\n            Invigoration: {{sage.Invigoration}}&nbsp;&nbsp;\r\n          </h5>\r\n        </div>\r\n        <div class=\"btn row\" style=\"margin: .8em; text-align: right;\">\r\n\r\n          <h5 class=\"noselect\" tooltip={{tipInsanityControl}} placement=\"left\" style=\"display: inline; cursor:default;\">\r\n            Insanity Control: {{sage.Insanity_Control}}&nbsp;&nbsp;\r\n          </h5>\r\n\r\n        </div>\r\n        <br /><br />\r\n\r\n      </div>\r\n\r\n\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n      <h3 style=\"text-align: center;\">\r\n        {{subTitle2}}\r\n      </h3>\r\n\r\n\r\n      <p>\r\n        {{imageDescription}}\r\n      </p>\r\n<br />\r\n      <div>\r\n        <img class=\"picture\" src={{imageURL}} alt=\"Sorry, problem loading image....\">\r\n      </div>\r\n      <!--\r\n      <button type=\"button\" class=\"glyphicon glyphicon-circle-arrow-up\">Increase</button>\r\n      <button type=\"button\" class=\"glyphicon glyphicon-circle-arrow-down\">Decrease</button>\r\n      -->\r\n      <br /><br />\r\n      <br />\r\n      <h3 style=\"text-align: center;\">\r\n        Birth Universe: From The {{race.birth_universe}}\r\n      </h3>\r\n    </div>\r\n\r\n\r\n\r\n\r\n  </div>\r\n  <div style=\"padding-top:60px;\">\r\n    <h5 style=\"color: green;\">Racial Bonus: </h5>\r\n    <p style=\"color: green;\">{{race.racial_bonuses}}</p>\r\n    <br />\r\n\r\n    <button type=\"button\" (click)=\"back()\">Home Page</button>\r\n    <br /><br />\r\n\r\n    <h4 style=\"color: forestgreen\">{{response}}</h4><br /><br />\r\n\r\n    <br />\r\n    <h4 style=\"color: red\">{{error}}</h4><br /><br />\r\n  </div>\r\n</div>"

/***/ }),

/***/ 467:
/***/ (function(module, exports) {

module.exports = "\r\n<h2 style=\"text-align: center;\">\r\n  {{title}}\r\n</h2>\r\n<br />\r\n<br />\r\n\r\n<div style=\"text-align: center;\">\r\n  <h4>If you already have experience as a Sage of the Multiverse, please click the \"Login to Sage Account\" button.  If not, please click the \"Create Sage Account\" button.</h4>\r\n  <br />\r\n  <button type=\"button\" routerLink=\"/new-account\" routerLinkActive=\"active\">Create Sage Account</button>\r\n  <button type=\"button\" routerLink=\"/login\" routerLinkActive=\"active\">Login to Sage Account</button>\r\n\r\n  <br /><br /><br />\r\n  <h5 style=\"font-style: italic; color: blue;margin: 40px;\">\r\n    *Disclaimer: This app is functioning without any styling for the sake of having something to show. I intend to have\r\n    a more stylized rough-draft of this app up soon!!! Thank you for viewing my work in progress. - Anthony Walter (Programmer/Creator)\r\n  </h5>\r\n</div>"

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_client_auth_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Subject__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sage_user_service__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APIAccountsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var APIAccountsService = (function () {
    //CORS NOTE: Make sure you add "Access-Control-Allow-Origin: *" as a header or it won't work!!!!!!
    function APIAccountsService(http, router, apiClientAuthService, sageUserService) {
        this.http = http;
        this.router = router;
        this.apiClientAuthService = apiClientAuthService;
        this.sageUserService = sageUserService;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
            'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json',
        });
        this.error = new __WEBPACK_IMPORTED_MODULE_8_rxjs_Subject__["Subject"]();
        this.apiPasswordClient = {
            grant_type: "password",
            client_id: __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].appID,
            client_secret: __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].appSecret,
            sagename: null,
            password: null,
            scope: "*"
        };
    }
    APIAccountsService.prototype.sendError = function (error) {
        console.log("In API Accounts Service: " + JSON.stringify(error));
        //console.log('sendSage() ' + JSON.stringify(sage));
        this.error.next(error);
    };
    APIAccountsService.prototype.clearError = function () {
        this.error.next();
    };
    APIAccountsService.prototype.getError = function () {
        //console.log('getSage() ' + JSON.stringify(this.sageSubject.asObservable));
        return this.error.asObservable();
    };
    /**********************************************************************************************************
    * 1. Generates API PASSWORD Token 2. THEN attaches headers 3. Gets User Info 4. THEN sets localStorage and navigates to Home Page
    ************************************************************************************************************/
    APIAccountsService.prototype.login = function (sageName, password) {
        var _this = this;
        console.log('SageName to LOGIN: ' + sageName + 'PASSWORD TO LOGIN: ' + password);
        //1.
        this.apiClientAuthService.getPasswordToken(sageName, password).subscribe(function (data) {
            _this.responseData = data;
            //2.
            _this.apiLoginToken = _this.responseData;
            //console.log('my LOGIN token: ' + JSON.stringify(this.apiLoginToken));
            localStorage.setItem('access_token', null); //just in case if something was in there.
            localStorage.setItem('access_token', JSON.stringify(_this.apiLoginToken['access_token']));
            _this.headers.set('Authorization', 'Bearer ' + _this.apiLoginToken['access_token']);
            _this.url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].baseAPIUrl + 'api/user';
            //console.log('headers being sent: ' + JSON.stringify(this.headers));
            //console.log('url being sent: ' + this.url);
            //3.
            _this.response = _this.http.get(_this.url, { headers: _this.headers })
                .map(function (res) { return _this.sage = res.json(); }).retryWhen(function (attempts) { return attempts.zip(__WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].range(1, 4))
                .flatMap(function (_a) {
                var error = _a[0], i = _a[1];
                if (i > 3) {
                    return __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].throw(error.json().error || 'Server error');
                }
                console.log('delay retry by ' + i + ' second(s)');
                return __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].timer(i * 100);
            }); });
            _this.response.subscribe(function (data) {
                _this.sage = data;
                //4. Account Storage
                localStorage.setItem('sage_id', _this.sage.id);
                localStorage.setItem('sagename', _this.sage.sagename);
                localStorage.setItem('realname', _this.sage.realname);
                localStorage.setItem('email', _this.sage.email);
                localStorage.setItem('password', _this.sage.password); //only set password here. 
                //5. Sage Profile Storage
                localStorage.setItem('Sage_Created', _this.sage.Sage_Created);
                var sageCreated = parseInt(localStorage.getItem('Sage_Created'));
                if (sageCreated == 1) {
                    _this.sageUserService.setLocalSageStorage(_this.sage);
                }
                //console.log("Current Auth Token: " + localStorage.getItem['access_token']);
                //console.log("SAGE CREATED TEST: " + localStorage.getItem('Sage_Created'));
                _this.router.navigate(['sagehome', _this.sage.id]); //has to navigate and THEN trigger the broadcast singleton);
                console.log('observing ' + JSON.stringify(_this.sage));
            }, function (err) { return _this.sendError(err); });
        }, function (err) { return _this.sendError(err); });
    }; //**login(data: SageAccount, token)**//
    /***********************************************************************************************************************************
   * 1. Generate CCToken 2. THEN sets as header and send POST Request 3. THEN Logs User In using same login function
   ***********************************************************************************************************************************/
    APIAccountsService.prototype.createAccount = function (sageData) {
        var _this = this;
        //1.
        this.apiClientAuthService.getClientToken().subscribe(function (data) {
            _this.apiCCToken = data;
            localStorage.setItem('access_token', ''); //erases anything there first
            localStorage.setItem('access_token', _this.apiCCToken);
            //2.
            console.log("Access CC Token " + _this.apiCCToken['access_token']);
            _this.headers.set('Authorization', 'Bearer ' + _this.apiCCToken['access_token']);
            _this.url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].baseAPIUrl + 'api/account/post';
            _this.sage = _this.http.post(_this.url, JSON.stringify(sageData), { headers: _this.headers })
                .map(function (res) { return _this.sage = res.json(); }).retryWhen(function (attempts) { return attempts.zip(__WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].range(1, 4))
                .flatMap(function (_a) {
                var error = _a[0], i = _a[1];
                if (i > 3) {
                    return __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].throw(error.json().error || 'Server error');
                }
                console.log('delay retry by ' + i + ' second(s)');
                return __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].timer(i * 100);
            }); }); //10 retries when there are errors evades the whole preflight crap!!!! ;DDDD
            _this.sage.subscribe(function (data) {
                //console.log("data: " + data);
                //3.
                /*Caveat here:  The data comes back with the password hashed, so I cannot use the return data to jump straight into login.
                Have to use exactly what they entered and passed into this function*/
                _this.login(sageData.sagename, sageData.password);
            }, function (err) { return _this.sendError(err); });
        }, function (err) { return _this.sendError(err); });
    }; //**createAccount(data: SageAccount, token)**//
    /***********************************************************************************************************************************
    * 1. Build custom request JSON string 2. make the update!
    ***********************************************************************************************************************************/
    APIAccountsService.prototype.updateAccount = function (formType, input) {
        var _this = this;
        //1.
        var request = '{"sagename": "' + localStorage.getItem('sagename') + '", "' + formType + '": "' + input + '"}';
        this.url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].baseAPIUrl + 'api/account/edit/' + localStorage.getItem('sage_id');
        var token = localStorage.getItem('access_token');
        this.headers.set('Authorization', 'Bearer ' + token.replace('"', ''));
        console.log(request);
        //2.
        this.sage = this.http.post(this.url, request, { headers: this.headers })
            .map(function (res) { return _this.sage = res.json(); }).retryWhen(function (errors) { return errors.delay(1000).take(5); }); //10 retries when there are errors evades the whole preflight crap!!!! ;DDDD
        return this.sage;
    }; /**updateAccount(formType)**/
    /***********************************************************************************************************************************
* 1. Build custom request JSON string 2. make the deletion!
***********************************************************************************************************************************/
    APIAccountsService.prototype.deleteAccount = function (sagename, password, realname) {
        var _this = this;
        console.log(sagename + password + realname);
        //1.
        var request = '{"sagename": "' + sagename + '", "password": "' + password + '", "realname": "' + realname + '"}';
        this.url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].baseAPIUrl + 'api/account/delete/' + localStorage.getItem('sage_id');
        var token = localStorage.getItem('access_token');
        this.headers.set('Authorization', 'Bearer ' + token.replace('"', ''));
        console.log(request);
        //2.
        this.sage = this.http.post(this.url, request, { headers: this.headers })
            .map(function (res) { return _this.sage = res.json(); }).retryWhen(function (attempts) { return attempts.zip(__WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].range(1, 4))
            .flatMap(function (_a) {
            var error = _a[0], i = _a[1];
            if (i > 3) {
                return __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].throw(error.json().error || 'Server error');
            }
            console.log('delay retry by ' + i + ' second(s)');
            return __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].timer(i * 100);
        }); }); //10 retries when there are errors evades the whole preflight crap!!!! ;DDDD
        return this.sage;
    }; /**deleteAccount(formType)**/
    /*
    private getRetry(errors: Observable<Response>): Observable<any> {
        
        return errors.mergeMap(error => {
            
            if (error.status === 500) {
                console.log(error);
                // Add an authorization header, perhaps.
                // ...
                // Emit anything (the error instance, for example) to retry:
                return Observable.of(error);

            } else {

                // Throw the error to give up retrying:
                return Observable.throw(error);
            }
        });
    }
    */
    APIAccountsService.prototype.handleError = function (error) {
        //console.log(error);
        return __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].throw(error.json().error || 'Server error');
    };
    APIAccountsService.prototype.sageCreatedCheck = function () {
        //will check if sage profile has been created
    };
    return APIAccountsService;
}());
APIAccountsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__api_client_auth_service__["a" /* APIClientAuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__api_client_auth_service__["a" /* APIClientAuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_9__sage_user_service__["a" /* SageUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__sage_user_service__["a" /* SageUserService */]) === "function" && _d || Object])
], APIAccountsService);

var _a, _b, _c, _d;
//# sourceMappingURL=api-accounts.service.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Race; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Race = (function () {
    function Race() {
    }
    return Race;
}());
Race = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Race);

//# sourceMappingURL=race.js.map

/***/ }),

/***/ 733:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(284);


/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APIClientAuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

 //this is to get baseAPIURLtokenURL





var APIClientAuthService = (function () {
    function APIClientAuthService(http) {
        this.http = http;
        //private apiClientToken = new APIToken;
        this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Headers */]({
            'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json',
        });
        this.apiCCClient = {
            grant_type: __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].grantType,
            client_id: __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].appID,
            client_secret: __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].appSecret,
            scope: __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].scope,
        };
        this.apiPasswordClient = {
            grant_type: "password",
            client_id: __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].appID,
            client_secret: __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].appSecret,
            username: null,
            password: null,
            scope: "*"
        };
    }
    /**********************************************************************************************************
     * Generates authorization token from environment variables
     ************************************************************************************************************/
    APIClientAuthService.prototype.getClientToken = function () {
        var _this = this;
        this.token = this.http.post(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].tokenURL, JSON.stringify(this.apiCCClient), { headers: this.headers })
            .map(function (res) { return _this.postResponse = res.json(); }).retryWhen(function (errors) { return errors.delay(1000).take(5); }); //10 retries when there are errors evades the whole preflight crap!!!! ;DDDD
        return this.token;
    }; //**getClientToken()**//
    APIClientAuthService.prototype.getPasswordToken = function (sageName, password) {
        var _this = this;
        this.apiPasswordClient.username = sageName;
        this.apiPasswordClient.password = password;
        console.log('to send to api: ' + JSON.stringify(this.apiPasswordClient));
        this.token = this.http.post(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].tokenURL, JSON.stringify(this.apiPasswordClient), { headers: this.headers })
            .map(function (res) { return _this.postResponse = res.json(); }).retryWhen(function (attempts) { return attempts.zip(__WEBPACK_IMPORTED_MODULE_6_rxjs__["Observable"].range(1, 4))
            .flatMap(function (_a) {
            var error = _a[0], i = _a[1];
            if (i > 3) {
                return __WEBPACK_IMPORTED_MODULE_6_rxjs__["Observable"].throw(error.json().error || 'Server error');
            }
            console.log('delay retry by ' + i + ' second(s)');
            return __WEBPACK_IMPORTED_MODULE_6_rxjs__["Observable"].timer(i * 100);
        }); }); //10 retries when there are errors evades the whole preflight crap!!!! ;DDDD
        return this.token;
    }; //**getClientToken()**//
    return APIClientAuthService;
}());
APIClientAuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])() //this lets parameters be injected!
    ,
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */]) === "function" && _a || Object])
], APIClientAuthService);

var _a;
//# sourceMappingURL=api-client-auth-service.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Sage = (function () {
    function Sage() {
    }
    return Sage;
}());
Sage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Sage);

//# sourceMappingURL=sage.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tooltip; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Tooltip = (function () {
    function Tooltip() {
    }
    return Tooltip;
}());
Tooltip = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Tooltip);

//# sourceMappingURL=tooltip.js.map

/***/ })

},[733]);
//# sourceMappingURL=main.bundle.js.map