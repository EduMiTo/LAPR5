import { Component, OnInit } from '@angular/core';
import { IPacking } from 'src/app/interfaces/ipacking';
import { PackingServiceService } from '../../../../services/packing-service.service';
import { FormGroup } from '@angular/forms';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-packing',
  templateUrl: './update-packing.component.html',
  styleUrls: ['./update-packing.component.css','./update-packing.component.scss']
})
export class UpdatePackingComponent implements OnInit {

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  packing!: IPacking;
  selectedPacking!: IPacking;

  message:string;
  error=false;
  submitted = false;

  constructor(private packingService: PackingServiceService) {
    this.packing={
      id: '',
      truckPlate: '',
      deliveryId: '',
      position: {
        positionX: 0,
        positionY: 0,
        positionZ: 0
      }
    }
    this.selectedPacking = {
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
   }
  
  packings: IPacking[] = [];
  
  ngOnInit(): void {
    this.getAllPackings();
  }

  getAllPackings(): void {
    this.packingService.getAllPackings().subscribe(
    (packings) =>  this.packings = packings);
  }

  getPackingById(id:string): void{
    for (let packing of this.packings){
      if (packing.id == id){
        this.selectedPacking = packing;
      }
    }
    //this.packingService.getPackingById(id);
  }

  

  updatePacking(data: any){

    let position: any = {"positionX": data.positionX, "positionY": data.positionY, "positionZ": data.positionZ};
    this.packingService.updatePacking({"id": data.id,
    "position": position} as IPacking).subscribe(
      (packing) => {this.packing = packing;
      this.submitted = true;},
      (error) => {
        this.error = true;
        this.message = error.error.message;
      }
    );
  }
}
