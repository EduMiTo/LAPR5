import { Component, OnInit, ViewChild } from '@angular/core';
import { forEach } from 'lodash';
import { IDelivery } from 'src/app/interfaces/idelivery';
import { IFleetPlanning } from 'src/app/interfaces/iFleetPlanning';
import { ITruck } from 'src/app/interfaces/itruck';
import { DeliveryServiceService } from 'src/app/services/delivery-service.service';
import { RoutePlanningService } from 'src/app/services/route-planning.service';
import { TruckServiceService } from 'src/app/services/truck-service.service';
import { GetRoutePlanningComponent } from '../get-route-planning/get-route-planning.component';

@Component({
  selector: 'app-get-fleet-planning',
  templateUrl: './get-fleet-planning.component.html',
  styleUrls: ['./get-fleet-planning.component.css', './get-fleet-planning.component.scss']
})
export class GetFleetPlanningComponent implements OnInit {
  algorithm = '';
  submitted = false;
  selected= false;
  sideBarOpen = true;
  truckList: ITruck[] = [];
  plateList: ITruck[] = [];
  dateList: IDelivery[] = [];
  deliveries: IDelivery[] = [];
  fleetPlanning : IFleetPlanning;


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  constructor(private routeService: RoutePlanningService, private truckService: TruckServiceService, private deliveryService: DeliveryServiceService) {
    this.fleetPlanning = {
      planningDate:[''],
      generations:0,
      population:0,
      crossover:0,
      mutation:0,
      path: [''],
      time:[''],
      heuristic:""
    }
    
   }

  ngOnInit(): void {
    this.getAllDeliveries();
    this.getPlates();
  }

  upAlgorithm(type: string){
    this.fleetPlanning.heuristic = type;
  }

  getPlates(){
    this.truckService.getAllTrucks().subscribe(
      (data) =>{ 
        this.plateList = data;
        //console.log(this.plateList);
        
      }

    );
    
  }
  getAllDeliveries(){
    this.deliveryService.getAllDeliveries().subscribe(
      (data) =>{ 
        this.deliveries = data;        
      }
    );
  }

  getDates(){
    let date = new Date();
    this.deliveries.forEach(delivery => {
      if(!this.dateList.find(route => route.limitDate == delivery.limitDate)){
           
          var splitted = delivery.limitDate.split("/"); 

          let novaDataPlan= new Date(''+splitted[2]+'-'+splitted[1]+'-'+splitted[0]+'');
          console.log(novaDataPlan);

          if(novaDataPlan.getTime() > date.getTime()){
            this.dateList.push(delivery);
          }
      }
    });
  }

  makePlanningFleetFake(){
    this.fleetPlanning.generations=50,
    this.fleetPlanning.crossover=50,
    this.fleetPlanning.mutation=50,
    this.fleetPlanning.population=5;

    this.fleetPlanning.path = ["A01-E01-V04-V01-M01"];
    this.fleetPlanning.time = ["500"];
    this.fleetPlanning.planningDate = ["2023-05-01"];


    this.fleetPlanning.heuristic="Other Algorithm",
    this.submitted = true;

  }

  
  async makePlanningFleet(generations: number, population:number, crossover: number, mutation:number){

    this.routeService.getAllRoutes().subscribe(
      async (data) =>{ 
        let date = new Date();
        for(let k=0; k<data.length; k++){
          let planDate=GetRoutePlanningComponent.adaptDate(data[k].planningDate);
          var splitted = planDate.split("/");
          let novaDataPlan= new Date(''+splitted[2]+'-'+splitted[1]+'-'+splitted[0]+'');
          if(novaDataPlan.getTime() > date.getTime()){
            this.routeService.deletePlanning(data[k].id).subscribe();
          }
        }

      },
      (error) => {
      }
    );
    
    this.getDates();

    let posTrucks=this.generateRandomNumber(this.plateList.length-1, this.dateList.length);

      let i=0;
      let a=-1;
      for(let j=0; j<this.dateList.length; j++){
        if(i==this.plateList.length-1){
          i=0;
        }
        
        this.routeService.postPlanByPlateAndDate(this.plateList[posTrucks[i]].plate,this.dateList[j].limitDate.replaceAll('/', ''), 'GeneticAlgorithm', generations, crossover, mutation, population).subscribe(
          (data) =>{
            this.fleetPlanning.generations=generations,
            this.fleetPlanning.crossover=crossover,
            this.fleetPlanning.mutation=mutation,
            this.fleetPlanning.population=population;
            if(data.path.length<5){
              for(let k=0; k<data.path.length; k++){
                a++;
                this.fleetPlanning.path[a] = data.path[k];
                this.fleetPlanning.time[a] = data.time![k];
                this.fleetPlanning.planningDate[a] = GetRoutePlanningComponent.adaptDate(data.planningDate);
                
              }
            }else{
              a++;
              this.fleetPlanning.path[a] = data.path;
              this.fleetPlanning.time[a] = data.time!;
              this.fleetPlanning.planningDate[a] = GetRoutePlanningComponent.adaptDate(data.planningDate);
            }
            this.fleetPlanning.heuristic=data.heuristic,
            this.submitted = true;
          }
      );
      let tempo = generations*21;
      if(tempo>7000){
        tempo=7000;
      }
      else if(tempo<1500){
        tempo=1500;
      }
      await this.delay(tempo);

      i++;
    
  }
}

     
delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
  generateRandomNumber(n: number, num:number) {
    let array = [];
    for(let i=0; i<num; i++){
     array.push(Math.floor(Math.random() * (n - 0 + 1) + 0));

    }

    return array;

  }
}
