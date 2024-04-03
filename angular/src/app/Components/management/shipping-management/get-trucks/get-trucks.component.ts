import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITruck } from 'src/app/interfaces/itruck';
import { TruckServiceService } from 'src/app/services/truck-service.service';

@Component({
  selector: 'app-get-trucks',
  templateUrl: './get-trucks.component.html',
  styleUrls: ['./get-trucks.component.css','./get-trucks.component.scss']
})
export class GetTrucksComponent implements OnInit {
  displayedColumns: string[] = ['plate', 'tare', 'massCapacity', 'maximumBattery', 'autonomy','chargeTime', 'deletes'];
  columns = [
    {
      columnDef: 'plate',
      header: 'Plate',
      cell: (row: ITruck) => `${row.plate}`
    },
    {
      columnDef: 'tare',
      header: 'Tare',
      cell: (row: ITruck) => `${row.tare}`
    },
    {
      columnDef: 'massCapacity',
      header: 'Mass Capacity',
      cell: (row: ITruck) => `${row.massCapacity}`
    },
    {
      columnDef: 'maximumBattery',
      header: 'Battery',
      cell: (row: ITruck) => `${row.maximumBattery}`
    },
    {
      columnDef: 'autonomy',
      header: 'Autonomy',
      cell: (row: ITruck) => `${row.autonomy}`
    },
    {
      columnDef: 'chargeTime',
      header: 'Charge Time',
      cell: (row: ITruck) => `${row.chargeTime.hours*60+row.chargeTime.minutes+row.chargeTime.seconds/60}`
    }
  ]
  
  dataSource!: MatTableDataSource<ITruck>;


  @ViewChild('paginator')
  paginator!: MatPaginator;
  
  @ViewChild(MatSort)
  sort!: MatSort;
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  trucks: ITruck[] = [];

  truck: ITruck;

  constructor(private truckService : TruckServiceService) {
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
      "active": true
    };
  }

  ngOnInit(): void {
    this.getTrucks();
  }

  onChange(active: boolean, inhibt: boolean) {
    this.getTrucksChecked(active, inhibt);
  }

  getTrucksChecked(active: boolean, inhibt: boolean): void {
    this.trucks = [];
    this.truckService.getAllTrucks().subscribe(
      (trucks) =>  {
        let t: ITruck[] = [];
        trucks.forEach(function (value) {
          if (active && inhibt){
            t.push(value);
          }
          else if (active && !inhibt){
            if (value.active) t.push(value);
          }
          else if (!active && inhibt){
            if (!value.active) t.push(value);
          }
        });

        this.trucks = t;
        this.dataSource = new MatTableDataSource(this.trucks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
      
      );

    }

  getTrucks(): void {
    this.truckService.getAllTrucks().subscribe(
      (trucks) =>  {this.trucks = trucks
        this.dataSource = new MatTableDataSource(this.trucks);
        this.dataSource.sortData = this.sortData();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.fiterByTruck();

      });
  }

  deleteTruck(plate: string){
    this.truckService.deleteTruck(plate).subscribe((data) => {
    this.getTrucks();
    },

    (error) => {
      alert("Error deleting truck");
    });
      
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toUpperCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  fiterByTruck(){
    let filterFunction=
    (data: ITruck, filter: string) : boolean => {
      if(filter){
        if(data.plate.toString().indexOf(filter) != -1 || data.tare.toString().indexOf(filter) != -1 || data.massCapacity.toString().indexOf(filter) != -1 || data.maximumBattery.toString().indexOf(filter) != -1 || data.autonomy.toString().indexOf(filter) != -1 || (data.chargeTime.hours*60+data.chargeTime.minutes+data.chargeTime.seconds/60).toString().indexOf(filter) != -1){

          return true;
          }
         
          return false;
        
        }else{
          return true;
        }
    };
    return filterFunction;
  }

  sortData(){
    let sortFunction =
    (items: ITruck[], sort: MatSort):ITruck[] => {
      if(!sort.active || sort.direction === ''){
        return items;
      }
      return items.sort((a:ITruck,b:ITruck) => {
        let compartorResult = 0;
       
        switch (sort.active) {
          case 'plate':
            compartorResult= a.plate.localeCompare(b.plate);
            break;
          case 'tare':
            compartorResult= a.tare - b.tare;
            break;
          case 'massCapacity':
            compartorResult= a.massCapacity - b.massCapacity;
            break;
          case 'maximumBattery':
            compartorResult= a.maximumBattery - b.maximumBattery;
            break;
          case 'autonomy':
            compartorResult= a.autonomy - b.autonomy;
            break;
          case 'chargeTime':
            compartorResult= (a.chargeTime.hours*60+a.chargeTime.minutes+a.chargeTime.seconds/60) - (b.chargeTime.hours*60+b.chargeTime.minutes+b.chargeTime.seconds/60);
            break;
          
          default:
            compartorResult= a.plate.localeCompare(b.plate);
            break;
        }
        return compartorResult * (sort.direction === 'asc' ? 1 : -1);
      });
    };

  
  return sortFunction;
  }

  inactivateTruck(plate: string){
    this.truckService.inactivateTruck(plate).subscribe((data) => {
    this.getTrucks();
    },

    (error) => {
      alert("Error inhibiting truck");
    });
      
  }

  activateTruck(data: any){
    this.truckService.activateTruck({
      "plate": data.plate,
      "tare": parseFloat(data.tare),
      "massCapacity": parseFloat(data.massCapacity),
      "maximumBattery": parseFloat(data.maximumBattery),
      "autonomy": parseFloat(data.autonomy),
      "chargeTime": {
        "hours": parseFloat(data.chargeTime.hours),
        "minutes": parseFloat(data.chargeTime.minutes),
        "seconds": parseFloat(data.chargeTime.seconds)
      },
      "active": data.active
    } as ITruck).subscribe((data) => {
      this.getTrucks();
      },
  
      (error) => {
        alert("Error activating truck");
      });
      
  }

}
