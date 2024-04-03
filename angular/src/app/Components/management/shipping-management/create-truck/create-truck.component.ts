import { Component, OnInit } from '@angular/core';
import { ITruck } from 'src/app/interfaces/itruck';
import { TruckServiceService } from '../../../../services/truck-service.service';


@Component({
  selector: 'app-truck',
  templateUrl: './create-truck.component.html',
  styleUrls: ['./create-truck.component.css','./create-truck.component.scss']
})
export class CreateTruckComponent implements OnInit {

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  truck!: ITruck;

  message:string;
  error=false;
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
    this.message="";
   }

  ngOnInit(): void {
  }

  createTruck(data: any){
    let chargeTime: any = {"hours": data.Hours, "minutes": data.Minutes, "seconds": data.Seconds};
    this.truckService.createTruck({"plate": data.Plate,
    "tare": data.Tare,
    "massCapacity": data.MassCapacity,
    "maximumBattery": data.Battery,
    "autonomy": data.Autonomy,
    "chargeTime": chargeTime} as ITruck).subscribe(
      (truck) => {
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
