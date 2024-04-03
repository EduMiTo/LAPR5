import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  firstName = "";
  lastName = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
    this.firstName = payLoad.firstName;
    this.lastName = payLoad.lastName;
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit(); 
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    location.reload();
  }
}
