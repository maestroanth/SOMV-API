﻿import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-form',
  templateUrl: './welcome-form.component.html',
  styleUrls: ['./welcome-form.component.css']
})
export class WelcomeFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  title = 'Greetings Newcomer! Are you prepared to learn the ways of the Multiverse?';
}
