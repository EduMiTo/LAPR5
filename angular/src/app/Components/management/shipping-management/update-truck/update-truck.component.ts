import { Component, OnInit } from '@angular/core';
import { ITruck } from 'src/app/interfaces/itruck';
import { TruckServiceService } from 'src/app/services/truck-service.service';

@Component({
  selector: 'app-update-truck',
  templateUrl: './update-truck.component.html',
  styleUrls: ['./update-truck.component.css','./update-truck.component.scss']
})
export class UpdateTruckComponent implements OnInit {

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  trucks: ITruck[] = [];

  message:string;
  error=false;
  truck!: ITruck;
  selectedTruck!: ITruck;

  submitted = false;

  constructor(private truckService: TruckServiceService) {
    this.truck = {
      "plate": "",
      "tare": 0,
      "massCapacity": 0,
      "maximumBattery": 0,
      "autonomy": 0,
      "chargeTime": {
        "hours": 0,
        "minutes": 0,
        "seconds": 0
      },
      active: true
    };

    this.selectedTruck = {
      "plate": "",
      "tare": 0,
      "massCapacity": 0,
      "maximumBattery": 0,
      "autonomy": 0,
      "chargeTime": {
        "hours": 0,
        "minutes": 0,
        "seconds": 0
      },
      active: true
    };
    this.message="";
  }

  ngOnInit(): void {
    this.truckService.getAllTrucks().subscribe(
      (trucks) => {
        this.trucks = trucks;
      }
    )
  };

  getTruckByPlate(plate: string){
    
    for (let truck of this.trucks){
      if (truck.plate == plate){
        this.selectedTruck = truck;
      }
    }
  }

  updateTruck(data: any) {
    this.truckService.updateTruck({
      "plate": data.Plate,
      "tare": data.Tare,
      "massCapacity": data.MassCapacity,
      "maximumBattery": data.Battery,
      "autonomy": data.Autonomy,
      "chargeTime":{
        "hours": data.Hours,
        "minutes": data.Minutes,
        "seconds": data.Seconds
      }
      
    } as ITruck).subscribe((truck) => {
      this.truck = truck;
      this.submitted = true;
    },
      (error) => {
        this.error = true;
        this.message = error.error.message;
      }
    );
  }


}
