import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IPacking } from 'src/app/interfaces/ipacking';
import { PackingServiceService } from '../../../../services/packing-service.service';
import { TruckServiceService } from 'src/app/services/truck-service.service';
import { DeliveryServiceService } from 'src/app/services/delivery-service.service';
import { FormGroup } from '@angular/forms';
import { ITruck } from 'src/app/interfaces/itruck';
import { IDelivery } from 'src/app/interfaces/idelivery';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-packing',
  templateUrl: './create-packing.component.html',
  styleUrls: ['./create-packing.component.css','./create-packing.component.scss']
})
export class CreatePackingComponent implements OnInit {

  @ViewChild('myDialog', { static: true })
  myDialog!: TemplateRef<any>;

  selDelivery!: IDelivery;
  constructor(private packingService: PackingServiceService, private truckService: TruckServiceService, private deliveryService: DeliveryServiceService, private dialog: MatDialog) { 
    this.packing={
      id: '',
      truckPlate: '',
      deliveryId: '',
      position: {
        positionX: 0,
        positionY: 0,
        positionZ: 0
      }
    };
    this.message="";
    this.selDelivery={
      id: '',
      limitDate: '',
      loadTime: 0,
      unloadTime: 0,
      weight: 0,
      warehouse: ''
    };
  }

  openDialogWithoutRef(id: string) {

    this.dialog.open(this.myDialog);

  }

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.truckService.getAllTrucks().subscribe(
      (trucks) => {
        this.trucks = trucks;
      }
    );
    this.deliveryService.getAllDeliveries().subscribe(
      (deliveries) => {
        this.deliveries = deliveries;
      }
    );
  }

  trucks: ITruck[] = [];

  deliveries: IDelivery[] = [];

  packing!: IPacking;
  message:string;
  error=false;
  truck!: ITruck;
  selectedTruck!: ITruck;
  delivery!: IDelivery;
  selectedDelivery!: IDelivery;

  submitted = false;

  getTruckByPlate(plate: string){
    
    for (let truck of this.trucks){
      if (truck.plate == plate){
        this.selectedTruck = truck;
      }
    }
  }

  getDeliveryById(id: string){
    
    for (let delivery of this.deliveries){
      if (delivery.id == id){
        this.selectedDelivery = delivery;
      }
    }
  }

  createPacking(data: any){
    let position: any = {"positionX": data.positionX, "positionY": data.positionY, "positionZ": data.positionZ};
    this.packingService.createPacking({"truckPlate": data.truckPlate,
    "deliveryId": data.deliveryId,
    "position": position} as IPacking).subscribe(
      (packing) =>{ this.packing = packing;
      this.submitted = true;
    },
    (error) => {
      this.error = true;
      this.message = error.error.message;
    }
  );
  }
}
