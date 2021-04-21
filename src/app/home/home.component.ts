import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quotes = ['“No amount of physical contact could match the healing powers of a well made cocktail.” — David Sedaris.',
  '“Hear no evil, speak no evil, and you won’t be invited to cocktail parties.” — Oscar Wilde',
  '“There are two kinds of people I don’t trust: people who don’t drink and people who collect stickers.” — Chelsea Handler',
  '“Alcohol may be man’s worst enemy, but the bible says love your enemy.” — Frank Sinatra',
  '"A cocktail done right can really show your guests that you care." — Danny Meyer',
  '“Life is a crazy mixture of intoxicating cocktails.” ― Ken Poirot',
  '“Cocktails don’t solve any problems, but then again neither does water.” ― Emily Beckett'];
  randomQuote = '';
  constructor() { }
  
  ngOnInit(): void {
    let quoteIndex = Math.floor(Math.random() * (this.quotes.length));
     this.randomQuote = this.quotes[quoteIndex];
  }



}
