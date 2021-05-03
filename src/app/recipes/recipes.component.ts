import { Component, OnInit } from '@angular/core';

import cocktails from "src/assets/cocktails.json";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  listOfCocktails = cocktails

  constructor() {
  }

  ngOnInit(): void {
  }

}
