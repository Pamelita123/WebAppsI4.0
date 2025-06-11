import { Component } from "@angular/core";  
@Component({
  selector: "app-home",
  template:`<h1>Home</h1>`
})
export class HomeView {
  constructor() {
    console.log("HomeView initialized");
  }
}