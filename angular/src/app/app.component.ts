import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';
  sideBarOpen = true;
  loginUser = false;

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
  loginToUser(){
    this.loginUser = !this.loginUser;
  }
}
