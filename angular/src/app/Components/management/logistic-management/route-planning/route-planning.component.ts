import { Component, OnInit } from '@angular/core';
import { IDelivery } from 'src/app/interfaces/idelivery';
import { IPacking } from 'src/app/interfaces/ipacking';
import { Iroute } from 'src/app/interfaces/iroute';
import { ITruck } from 'src/app/interfaces/itruck';
import { DeliveryServiceService } from 'src/app/services/delivery-service.service';
import { PackingServiceService } from 'src/app/services/packing-service.service';
import { RoutePlanningService } from 'src/app/services/route-planning.service';
import { TruckServiceService } from 'src/app/services/truck-service.service';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-route-planning',
  templateUrl: './route-planning.component.html',
  styleUrls: ['./route-planning.component.css','./route-planning.component.scss'],
})
export class RoutePlanningComponent implements OnInit {
sideBarOpen = true;
  submitted = false;
  selected= false;
  ga = false;

  message:string;

  error=false;


  routes : Iroute;
   truckList: ITruck[] = [];
  plateList: ITruck[] = [];
  dateList: IDelivery[] = [];
  deliveries: IDelivery[] = [];

  constructor(private routeService: RoutePlanningService, private truckService: TruckServiceService, private deliveryService: DeliveryServiceService) { 
    this.routes= {
      id:"",
      truckPlate: "",
      planningDate: "",
      planningTime: 0,
      path: "",
      heuristic: "",
      generations: 0,
      population: 0,
      crossover: 0,
      mutation: 0
    }
    this.message = "";
  }

  

 


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.getAllDeliveries();
    this.getPlates();
  }

  getAllDeliveries(){
    this.deliveryService.getAllDeliveries().subscribe(
      (data) =>{ 
        this.deliveries = data;        
      }
    );
  }

  getPlates(){
    this.truckService.getAllTrucks().subscribe(
      (data) =>{ 
        this.plateList = data;
        
      }

    );
    
  }

  getRoutePlanning(){
    this.submitted = true;
  }

  getDates(plate : string){
    let currentDate = new Date();
    this.deliveries.forEach(delivery => {
      var splitted = delivery.limitDate.split("/");
      let deliveryDate = new Date(''+splitted[2]+'-'+splitted[1]+'-'+splitted[0]+'');
      console.log(deliveryDate);
      console.log(currentDate);
      if(!this.dateList.find(route => route.limitDate == delivery.limitDate) && deliveryDate.getTime() >= currentDate.getTime()){
    
        this.dateList.push(delivery);
      }
      
    });
   /* this.dateList = [];
    for (let p of this.plateList){
      if (p.truckPlate == plate){
        this.routes.truckPlate = p.truckPlate;
        
      }
    }

    this.packingService.getAllPackings().subscribe(
      (data) =>{

        for (let i = 0; i < data.length; i++) {
          if(data[i].truckPlate == plate){
            
            for (let j = 0; j < this.deliveries.length; j++) {
              if(this.deliveries[j].id == data[i].deliveryId){
                if(!this.dateList.find(route => route.limitDate == this.deliveries[j].limitDate)){
                  this.dateList.push(this.deliveries[j]);
                }

              }
            }


          }
        }        
      }
    );*/
    this.selected=true;

  }

  upHeuristic(type: string){
    this.routes.heuristic = type;
    if (type == "GeneticAlgorithm") this.ga = true;
  }

  upDate(date: string){
    this.routes.planningDate = date;
  }

  postPlan(plate: string, date: string, type: string, generations: number, population: number, crossover: number, mutation:number){
    this.message="";

   

    this.routeService.getAllRoutes().subscribe(
      (data) =>{ 
        
        let nDate= date.replaceAll('/', '');
        data.forEach(route => {
          if(route.planningDate === nDate){
            
            this.routeService.deletePlanning(route.id).subscribe(
              (data) =>{
              },
              (error) => {
              }
            );
          }
        });
      },
      (error) => {
      }
    );


      
    this.routeService.postPlanByPlateAndDate(plate,date.replaceAll('/', ''), type, generations, crossover, mutation, population).subscribe(
      (data) =>{ this.routes.truckPlate=plate,
        this.routes.planningDate=date,
        this.error = false;
      this.submitted = true;
    },
    (error) => {
      this.error = true;
      this.message = error.error.message;
    }
    
  );
  }

}
