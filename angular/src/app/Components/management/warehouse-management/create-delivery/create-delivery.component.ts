import { Component, OnInit } from '@angular/core';
import { IDelivery } from 'src/app/interfaces/idelivery';
import { DeliveryServiceService } from 'src/app/services/delivery-service.service';
import { IWarehouse } from 'src/app/interfaces/iwarehouse';
import { WarehouseServiceService } from 'src/app/services/warehouse-service.service';

@Component({
  selector: 'app-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.css','./create-delivery.component.scss'],
})
export class CreateDeliveryComponent implements OnInit {

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  delivery: IDelivery;

  message:string;

  error=false;
  submitted = false;

  warehouses: IWarehouse[] = [];


  constructor(private deliveryService: DeliveryServiceService, private warehouseService: WarehouseServiceService) {
    this.delivery = {
      id: '',
      weight: 0,
      loadTime: 0,
      unloadTime: 0,
      limitDate: '',
      warehouse: '',
    };
    this.message="";
   }

  ngOnInit(): void {
    this.getWarehouses();

    var today = new Date();
    var day = today.getDate();
    var dd = day.toString();
    var month = today.getMonth() + 1; //January is 0!
    var mm = month.toString();
    var yyyy = today.getFullYear();

    if (day < 10) {
      dd = '0' + dd;
    }

    if (month < 10) {
      mm = '0' + mm;
    } 
    var today2 = yyyy + '-' + mm + '-' + dd;

  document.getElementById("LimitDate")!.setAttribute("min", today2);

  }

  getWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe(
      (warehouses) =>  this.warehouses = warehouses);
    }

  createDelivery(data: any){
    
    var splitted = data.LimitDate.split("-");
    let novaDataPlan= splitted[2]+'/'+splitted[1]+'/'+splitted[0];
    this.deliveryService.createDelivery({
    "weight": parseInt(data.Weight),
    "loadTime": parseInt(data.LoadTime),
    "unloadTime": parseInt(data.UnloadTime),
    "limitDate": novaDataPlan,
    "warehouse": data.WarehouseId
    } as IDelivery).subscribe(
      (data) => {
      this.delivery = data;
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
