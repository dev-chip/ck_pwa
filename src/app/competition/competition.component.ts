import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  isOnline = false;

  constructor() { }

  ngOnInit(): void {
    if(navigator.onLine){
      this.isOnline = true;
    }
    else{
      this.isOnline = false;
    }
  }

}
