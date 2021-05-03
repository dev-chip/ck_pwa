import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import cocktails from "src/assets/cocktails.json";


@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit {
  
  listOfRecipes = cocktails

  constructor(
    private route: ActivatedRoute
  ) { }
  
    ngOnInit(){

    }
  

}
