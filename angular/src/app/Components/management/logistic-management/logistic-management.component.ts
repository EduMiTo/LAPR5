import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logistic-management',
  templateUrl: './logistic-management.component.html',
  styleUrls: ['./logistic-management.component.css','./logistic-management.component.scss']
})
export class LogisticManagementComponent implements OnInit {

  constructor(private router: Router) { }

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }
  updatePacking(){
    this.router.navigateByUrl('/update-packing');
  }
  createPacking(){
    this.router.navigateByUrl('/create-packing');
  }

  getPackings(){
    this.router.navigateByUrl('/get-packings');
  }
  
  createPath() {
    this.router.navigateByUrl('/create-path');
  }

  getPaths(){
    this.router.navigateByUrl('/get-paths');
  }

  updatePath(){
    this.router.navigateByUrl('/update-path');
  }

  
}
