import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  listOfRecipes = 
  [
    [1, 'Tequila Sunset',    'assets/tequila_sunset.jpg'  ,  "• 50ml tequila<br>• 200ml orange juice<br>• 25ml cherry sours<br>• Orange slice, garnish", "1) In a highball glass filled with ice cubes, pour the tequila and orange juice.<br>2) Stir well.<br>3) Add cherry sours.<br>4) Garnish with an orange slice.", "mock description"],
    [2, 'Blue Lagoon',       'assets/blue_lagoon.jpg'     ,   "• 25ml blue curaçao<br>• 25ml vodka<br>• lemonade", "1) Put ice cubes into a hurricane glass.<br>2) Pour over the curaçao, vodka, and lemonade.<br>3) Stir well.<br>4) Garnish with lemon." , "mock description"],
    [3, 'Espresso Martini',  'assets/espresso_martini.jpg',   "• 25ml Kahlúa<br>• 50ml Vodka<br>• 1 shot espresso<br>1/2 egg white", "1) Put ice into a Martini glass (to chill the glass).<br>2) Add ice, Kahlúa, Vodka, espresso shot, and egg white into a Boston Shaker.<br>3) Shake well<br>4) Remove ice from the Martini glass and strain contents of shaker into a Martini glass", "mock description"],
    [4, 'Aperol Spritz',     'assets/aperol_spritz.jpg'   ,    "• 50ml Aperol<br>• 75ml Prosecco<br>• Lemonade", "1) Put ice into a Martini glass (to chill the glass).<br>2) Add ice, Kahlúa, Vodka, espresso shot, and egg white into a Boston Shaker.<br>3) Shake well<br>4) Remove ice from the Martini glass and strain contents of shaker into a Martini glass", "mock description"],
    [5, 'Vodka Martini',     'assets/vodka_martini.jpg'   ,     "• 60ml Vodka<br>• 1 tbsp dry vermouth<br>• olive or lemon peel, to garnish", "mock method", "mock description"],
    [6, 'Yoda',              'assets/yoda.jpg'            ,      "• 25ml blue curaçao<br>• 25ml creme de banana<br>• lemonade<br>• Lemon, to garnish.", "mock method" , "mock description"],
    [7, 'Sex on the Beach',  'assets/yoda.jpg'            ,   "blah" , "mock descriptioon" ] ,
    [8, 'Cosmopolitan',      'assets/yoda.jpg'            ,    "blah blah"  , "mock description" ],
    [9, 'Zombie',            'assets/yoda.jpg'            ,    "blah blah blah", "mock description"   ]
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
