import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserServiceService} from '../../services/user-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css','./admin.component.scss']
})
export class AdminComponent implements OnInit {

  submitted = false;
  sideBarOpen = true;
 
  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }


}
