import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-warehouse-management',
  templateUrl: './warehouse-management.component.html',
  styleUrls: ['./warehouse-management.component.css','./warehouse-management.component.scss']
})
export class WarehouseManagementComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    
  }

  createWarehouse(){
    this.router.navigate(['create-warehouse'], {relativeTo: this.route});
  }

  getWarehouses(){
    this.router.navigate(['get-warehouses']);
  }

  updateWarehouse(){
    this.router.navigateByUrl('/warehouse-management/update-warehouse');
  }

  createDelivery(){
    this.router.navigateByUrl('/create-delivery');
  }

  getDeliveries(){
    this.router.navigateByUrl('/get-deliveries');
  }
  updateDelivery(){
    this.router.navigateByUrl('/update-delivery');
  }
 

}
