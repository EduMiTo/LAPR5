import { Component, OnInit } from '@angular/core';
import { IWarehouse } from 'src/app/interfaces/iwarehouse';
import { WarehouseServiceService } from 'src/app/services/warehouse-service.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { PathServiceService } from 'src/app/services/path-service.service';
import { IPath } from 'src/app/interfaces/ipath';

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.css','./create-warehouse.component.scss']
})
export class CreateWarehouseComponent implements OnInit {


  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  
  warehouse!: IWarehouse;

  warehouses: IWarehouse[] = [];

  submitted = false;
  error = false;
  message = "";
 
  constructor(private service : WarehouseServiceService, private pathService: PathServiceService) { 
    this.warehouse = {
      "id": "",
      "designation": "",
      "address": "",
      "latitude": 0,
      "longitude": 0,
      "altitude": 0,
      "active": true
    }
  }

  /*idRestriction = "Must be an alphanumeric code with 3 chars, starting with a capital letter, followed by 2 numbers";
  designationRestriction = "Must have a maximum of 50 chars";
  addressRestriction = "ex: Rua das Cerdeiras,4400-901,Guimarães,Portugal,121";
  latitudeRestriction = "Must be in the following range: [-90 degrees - 90 degress]";
  longitudeRestriction = "Must be in the following range: [-180 degrees - 180 degress]"
  altitudeRestriction = "Cannot be negative"*/


  ngOnInit(): void {
    
  }

  createWarehouse(data: any){
    this.service.addWarehouse({
      "id": data.id,
      "designation": data.designation,
      "address": data.address,
      "latitude": parseFloat(data.latitude),
      "longitude": parseFloat(data.longitude),
      "altitude": parseFloat(data.altitude)
    }as IWarehouse).subscribe((warehouse) => {
        this.warehouse = warehouse;
        this.submitted = true;
        this.error = false;

        this.service.getWarehouses().subscribe((data) => {

          this.warehouses = data;
          let time: any = {"hours": 1, "minutes": 55, "seconds": 0};
          let extraTime: any = {"hours": 0, "minutes": 0, "seconds": 0};
          for(let i = 0; i < this.warehouses.length; i++){
            // if id this.warehouse different than this.warehouses[i].id

            if(this.warehouse.id !== this.warehouses[i].id){
              this.pathService.createPath({"idWarehouseStart": this.warehouse.id,
              "idWarehouseEnd": this.warehouses[i].id,
              "distance": 60,
              "time": time,
              "energy": 35,
              "extraTime": extraTime
              } as IPath).subscribe();
            }
            }
            for(let i = 0; i < this.warehouses.length; i++){
              if(this.warehouse.id !== this.warehouses[i].id){
              this.pathService.createPath({"idWarehouseStart": this.warehouses[i].id,
              "idWarehouseEnd": this.warehouse.id,
              "distance": 60,
              "time": time,
              "energy": 35,
              "extraTime": extraTime
              } as IPath).subscribe();}
            }
          });
      },
      (error) => {
        this.error = true;
        this.message = error.error.message;
      }
    );
    }
  }
