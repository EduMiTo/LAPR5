import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-management',
  templateUrl: './shipping-management.component.html',
  styleUrls: ['./shipping-management.component.css','./shipping-management.component.scss']
})
export class ShippingManagementComponent implements OnInit {

  constructor(private router: Router) { }

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
  }

  createTruck(){
    this.router.navigateByUrl('/create-truck');
  }

  getTrucks(){
    this.router.navigateByUrl('/get-trucks');
  }

  updateTruck(){
    this.router.navigateByUrl('/update-truck');
  }
  
}
