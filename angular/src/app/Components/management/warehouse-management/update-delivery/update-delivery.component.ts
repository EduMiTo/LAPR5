import { Component, OnInit } from '@angular/core';
import { IDelivery } from 'src/app/interfaces/idelivery';
import { IWarehouse } from 'src/app/interfaces/iwarehouse';
import { DeliveryServiceService } from 'src/app/services/delivery-service.service';
import { WarehouseServiceService } from 'src/app/services/warehouse-service.service';

@Component({
  selector: 'app-update-delivery',
  templateUrl: './update-delivery.component.html',
  styleUrls: ['./update-delivery.component.css','./update-delivery.component.scss']
})
export class UpdateDeliveryComponent implements OnInit {


  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  
  delivery: IDelivery;
  selectedDelivery!: IDelivery;

  message:string;

  error=false;
  submitted = false;

  warehouses: IWarehouse[] = [];

  deliveries: IDelivery[] = [];


  constructor(private deliveryService: DeliveryServiceService, private warehouseService: WarehouseServiceService) {
    this.delivery = {
      id: '',
      weight: 0,
      loadTime: 0,
      unloadTime: 0,
      limitDate: '',
      warehouse: '',
    };
    this.selectedDelivery = {
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
    
    this.getDeliveries();

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

  document.getElementById("LimitDate2")!.setAttribute("min", today2);
  }

  getWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe(

      (warehouses) =>  {
        for(let warehouse of warehouses){
          if (warehouse.id != this.selectedDelivery.warehouse){
            this.warehouses.push(warehouse);
          }
        }
        
      });
    }


    getWarehouses2():void{
      this.warehouseService.getWarehouses().subscribe(
        (warehouses) =>  this.warehouses = warehouses);
    }

    getDeliveries(): void {
      this.deliveryService.getAllDeliveries().subscribe(
        (deliveries) =>  {
          this.deliveries = deliveries;
          for(let i=0; i<this.deliveries.length; i++){
            var splitted = this.deliveries[i].limitDate.split("/");
            let novaDataPlan= splitted[2]+'-'+splitted[1]+'-'+splitted[0];
            this.deliveries[i].limitDate = novaDataPlan;
          }

        }
        );
        
        
      }

      getDeliveryById(id: string){
    
      for (let delivery of this.deliveries){
        if (delivery.id == id){
          this.selectedDelivery = delivery;
          
        }
      }

      
  
    this.getWarehouses();
    }

    updateDelivery(data: any) {
      var splitted = data.LimitDate.split("-");
      let novaDataPlan= splitted[2]+'/'+splitted[1]+'/'+splitted[0];
      this.deliveryService.updateDelivery({
        "id": data.id,
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

