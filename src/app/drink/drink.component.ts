import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import cocktails from "src/assets/cocktails.json";


@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit {
  listOfCocktails = cocktails
  cocktailID:any=''

  constructor(
    private route: ActivatedRoute
  ) { 
    this.route.paramMap.subscribe(params=>{
      this.cocktailID=params.get('id') //+ string to number
    })
  }
  
    ngOnInit(){
    }
  

}
