import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';
import { UserServiceService } from 'src/app/services/user-service.service';
import { TruckServiceService } from 'src/app/services/truck-service.service';
import { WarehouseServiceService } from 'src/app/services/warehouse-service.service';
import { DeliveryServiceService } from 'src/app/services/delivery-service.service';

@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.css', './dataview.component.scss']
})

export class DataViewComponent implements OnInit {

  public legendPosition: LegendPosition = LegendPosition.Below;

  roles: { name: string; value: number; }[] = [];

  types: { name: string; value: number; }[] = [];

  warehouses: { name: string; value: number; }[] = [];

  view: [number, number] = [600, 320];

  view2: [number, number] = [1700, 320];

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Type';
  xAxisLabel1 = 'Warehouse';
  showYAxisLabel = true;
  yAxisLabel = 'Number of';

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;
  sideBarOpen = true;

  gradient: boolean = false;
  isDoughnut: boolean = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


  colorScheme1: Color = { 
    domain: ['#704FC4', '#4B852C', '#B67A3D'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
  };

  colorScheme2: Color = { 
    domain: ['#873e23', '#76b5c5', '#5cd65c'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
  };

  colorScheme3: Color = { 
    domain: ['#e65353', '#e67f53', '#e69f53', '#e6d553', '#b3e653', '#62e653', '#53e6ba', '#53c9e6', '#53c9e6', '#6453e6', '#c653e6', '#e653b7', '#e653b7', '#e653b7', '#e6537f', '#e69f53'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
  };


  constructor(private uService: UserServiceService, private tService: TruckServiceService, private wService: WarehouseServiceService, private dService: DeliveryServiceService) { }

  ngOnInit(): void {

    this.doUsersArray();
    this.doTypesArray();
    this.doWarehousesArray();
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  doUsersArray(): void{
    this.uService.getUserLogistic().subscribe((cont) => this.roles = this.roles.concat({name: "Logistic Manager",value: cont}));
    this.uService.getUserShipping().subscribe((cont) => this.roles = this.roles.concat({name: "Shipping Manager",value: cont}));
    this.uService.getUserLogistic().subscribe((cont) => this.roles = this.roles.concat({name: "Warehouse Manager",value: cont}));
  }

  doTypesArray(): void{
    this.tService.getAllTrucks().subscribe((cont) => this.types = this.types.concat({name: "Trucks",value: cont.length}));
    this.wService.getWarehouses().subscribe((cont) => this.types = this.types.concat({name: "Warehouses",value: cont.length}));
    this.dService.getAllDeliveries().subscribe((cont) => this.types = this.types.concat({name: "Deliveries",value: cont.length}));
  }

  doWarehousesArray(): void{
    this.wService.getWarehouses().subscribe((list) => 
    list.forEach(element1 => {
        let cont: number = 0;
        this.dService.getAllDeliveries().subscribe((list2) => {list2.forEach(element2 => {
          if (element2.warehouse === element1.id){
            cont++;
          }
        }); this.warehouses = this.warehouses.concat({name: element1.designation,value: cont})}
        );
      })
    );
  }
}