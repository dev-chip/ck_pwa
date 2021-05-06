import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  isOnline: boolean;
  firstName: string
  lastName: string
  email: string
  ingredients: string
  method: string

  constructor() {
  }

  ngOnInit(): void {
    this.loadEntries()
    if(navigator.onLine){
      this.isOnline = true;
    }
    else{
      this.isOnline = false;
    }
  }

  loadEntries() {
    /*
    Get entries from local storage.
    */
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.ingredients = localStorage.getItem('ingredients');
    this.method = localStorage.getItem('method');
  }

  saveEntries() {
  /*
  Set entries in local storage.
  */
  localStorage.setItem("firstName", (<HTMLInputElement>document.getElementById('firstName')).value);
  localStorage.setItem("lastName", (<HTMLInputElement>document.getElementById('lastName')).value);
  localStorage.setItem("email", (<HTMLInputElement>document.getElementById('email')).value);
  localStorage.setItem("ingredients", (<HTMLInputElement>document.getElementById('ingredients')).value);
  localStorage.setItem("method", (<HTMLInputElement>document.getElementById('method')).value);
  }

  submitForm() {
    /*
    Form submission.
    */
    alert('Cocktail submitted. Good luck!')
    // Clear local storage
    localStorage.setItem("firstName", "");
    localStorage.setItem("lastName", "");
    localStorage.setItem("email", "");
    localStorage.setItem("method", "");
    localStorage.setItem("ingredients", "");
    // Refresh the page to clear fields
    window.location.reload();
  }
}
