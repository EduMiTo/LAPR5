import { Component, OnInit } from '@angular/core';
import { Iroute } from 'src/app/interfaces/iroute';
import { ITruck } from 'src/app/interfaces/itruck';
import { RoutePlanningService } from 'src/app/services/route-planning.service';
import { TruckServiceService } from 'src/app/services/truck-service.service';
import { GetRoutePlanningComponent } from '../get-route-planning/get-route-planning.component';

@Component({
  selector: 'app-get-specific-route',
  templateUrl: './get-specific-route.component.html',
  styleUrls: ['./get-specific-route.component.css', './get-specific-route.component.scss']
})
export class GetSpecificRouteComponent implements OnInit {

  constructor(private routeService: RoutePlanningService, private truckService: TruckServiceService) {
    this.routes= {
      id:" ",
      truckPlate: "Selected Truck",
      planningDate: " ",
      planningTime: 0,
      path: " ",
      heuristic: " ",
      generations: 0,
      population: 0,
      crossover: 0,
      mutation: 0
    }
   }

  sideBarOpen = true;
  submitted = false;

  selected= false;

   truckList: ITruck[] = [];
  plateList: Iroute[] = [];
  dateList: Iroute[] = [];

  routes: Iroute;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  ngOnInit(): void {
    this.getPlates();
  }

 


  getPlan(plate: string, date: string){



    this.routeService.getPlanByPlateAndDate(plate,date.replaceAll('/', '')).subscribe( 
      (data) =>{ 
        
        this.routes=data,
        this.routes.planningDate = GetRoutePlanningComponent.adaptDate(this.routes.planningDate),
        this.routes.path = GetRoutePlanningComponent.adaptPath(this.routes.path),
        this.routes.planningTime = GetRoutePlanningComponent.adaptTime(this.routes.planningTime);



      }


    );
    this.submitted=true;
  }

  getDatesofTruck(plate: string){
    this.dateList = [];
    for (let p of this.plateList){
      if (p.truckPlate == plate){
        this.routes.truckPlate = p.truckPlate;
        
      }
    }

    this.routeService.getAllRoutes().subscribe(
      (data) =>{ 

        for (let i = 0; i < data.length; i++) {
          if(data[i].truckPlate == this.routes.truckPlate){ 
          if(!this.dateList.find(route => route.planningDate == data[i].planningDate)){
            this.dateList.push(data[i]);
          }
        }
      }

        for (let i = 0; i < this.dateList.length; i++) {
          this.dateList[i].planningDate = GetRoutePlanningComponent.adaptDate(this.dateList[i].planningDate);
        }      
      }
    );
    this.selected=true;
  }

  getPlates(){
    this.routeService.getAllRoutes().subscribe(
      (data) =>{ 
        for (let i = 0; i < data.length; i++) {
          if(!this.plateList.find(route => route.truckPlate == data[i].truckPlate)){
            this.plateList.push(data[i]);
          }
        }
        
      }

    );
  }

  upDate(date: string){
    this.routes.planningDate = date;
  }


}



