import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  isOnline: boolean;
  firstName: string;
  lastName: string;
  email: string;
  ingredients: string;
  method: string;
  
  public cameraOn:boolean;
  public imageWidth:number;
  public imageHeight:number;

  constructor() {
    this.cameraOn = false;
    this.imageWidth = 240;
    this.imageHeight = 180;
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

  ngAfterViewInit(){
    this.clearCanvas()
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

  public showCamera() {
    /*
    Show the camera canvas and start the camera.
    */
    this.cameraOn = true
    this.clearCanvas()
    
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream
      }).catch(console.error)
  }

  public clearCanvas() {
    /*
    Clears the canvas.
    */    
    this.canvas.nativeElement.style = "border: 1px solid black;"
    var ctx = this.canvas.nativeElement.getContext("2d");
    ctx.clearRect(0, 0, this.imageWidth, this.imageHeight);
    ctx.font = "20px Arial";
    ctx.fillText("Your cocktail image", this.imageHeight/2 - 40, this.imageHeight/2 - 20);
  }

  public hideCamera(){
    /*
    Hide the camera canvas and stop the camera.
    */    
    this.cameraOn = false
    this.video.nativeElement.srcObject = null 
  }

  public capture() {
    /*
    Capture an image using the camera
    */
    this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, this.imageWidth, this.imageHeight);
    this.canvas.nativeElement.style = ""
    this.hideCamera()
  }

}
