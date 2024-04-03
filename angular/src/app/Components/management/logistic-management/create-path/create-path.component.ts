import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PathServiceService } from 'src/app/services/path-service.service';
import { WarehouseServiceService } from 'src/app/services/warehouse-service.service';
import { IPath } from 'src/app/interfaces/ipath';
import { IWarehouse } from 'src/app/interfaces/iwarehouse';


@Component({
  selector: 'app-path',
  templateUrl: './create-path.component.html',
  styleUrls: ['./create-path.component.css','./create-path.component.scss']
})
export class CreatePathComponent implements OnInit {


  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  warehouses: IWarehouse[] = [];

  message:string;
  error=false;
  warehouse!: IWarehouse;
  selectedWarehouse!: IWarehouse;

  constructor(private pathService: PathServiceService, private warehouseService: WarehouseServiceService) { 
    this.path={
      "id":'',
      "idWarehouseStart": '',
      "idWarehouseEnd": '',
      "distance": 0,
      "time": {
        "hours": 0,
        "minutes": 0,
        "seconds": 0,
      },
      "energy": 0,
      "extraTime": {
        "hours": 0,
        "minutes": 0,
        "seconds": 0,
      }
    };
    this.message="";
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

  path!: IPath;

  submitted = false;

  createPath(data: any){
    let time: any = {"hours": data.hours, "minutes": data.minutes, "seconds": data.seconds};
    let extraTime: any = {"hours": data.et_Hours, "minutes": data.et_Minutes, "seconds": data.et_Seconds};
    this.pathService.createPath({"idWarehouseStart": data.idWarehouseStart, 
    "idWarehouseEnd": data.idWarehouseEnd, 
    "distance": data.distance, 
    "time": time, 
    "energy": data.energy, 
    "extraTime": extraTime} as IPath).subscribe(
      (path) =>{ this.path = path;
      this.submitted = true;
    },
    (error) => {
      this.error = true;
      this.message = error.error.message;
    }
  );
  }
}
