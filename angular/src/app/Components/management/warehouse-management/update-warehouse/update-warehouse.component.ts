import { Component, OnInit } from '@angular/core';
import { IWarehouse } from 'src/app/interfaces/iwarehouse';
import { WarehouseServiceService } from 'src/app/services/warehouse-service.service';
@Component({
  selector: 'app-update-warehouse',
  templateUrl: './update-warehouse.component.html',
  styleUrls: ['./update-warehouse.component.css','./update-warehouse.component.scss']
})
export class UpdateWarehouseComponent implements OnInit {


  error = false;
  message: string = "";

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  
  idRestriction = "Must be an alphanumeric code with 3 chars, starting with a capital letter, followed by 2 numbers";
  designationRestriction = "Must have a maximum of 50 chars";
  addressRestriction = "ex: Rua das Cerdeiras,4400-901,Guimarães,Portugal,121";
  latitudeRestriction = "Must be in the following range: [-90 degrees - 90 degress]";
  longitudeRestriction = "Must be in the following range: [-180 degrees - 180 degress]"
  altitudeRestriction = "Cannot be negative"

  warehouses: IWarehouse[] = [];


  warehouse!: IWarehouse;
  selectedWarehouse!: IWarehouse;

  submitted = false;

  constructor(private warehouseService: WarehouseServiceService) {
    this.warehouse = {
      "id": "",
      "designation": "",
      "address": "",
      "latitude": 0,
      "longitude": 0,
      "altitude": 0,
      "active": true
    };

    this.selectedWarehouse = {
      "id": "",
      "designation": "",
      "address": "",
      "latitude": 0,
      "longitude": 0,
      "altitude": 0,
      "active": true
    };

  }

  ngOnInit(): void {
    this.warehouseService.getWarehouses().subscribe(
      (warehouses) => {
        this.warehouses = warehouses;
      }
    )
  };

  getWarehouseById(id: string){
    
    for (let warehouse of this.warehouses){
      if (warehouse.id == id){
        this.selectedWarehouse = warehouse;
      }
    }
  }

  updateWarehouse(data: any) {
    this.getWarehouseById(data.id);
    this.warehouseService.updateWarehouse({
      "id": data.id,
      "designation": data.designation,
      "address": data.address,
      "latitude": parseFloat(data.latitude),
      "longitude": parseFloat(data.longitude),
      "altitude": parseFloat(data.altitude),
      "active": this.selectedWarehouse.active
    } as IWarehouse).subscribe((warehouse) => {
      this.warehouse = warehouse;
      this.submitted = true;
      this.error = false;
    },
      (error) => {
        this.error = true;
        this.message = error.error.message;
      }
    );
  }


}
