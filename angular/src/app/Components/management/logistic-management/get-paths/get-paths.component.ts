import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IDelivery } from 'src/app/interfaces/idelivery';
import { IPath } from 'src/app/interfaces/ipath';
import { IWarehouse } from 'src/app/interfaces/iwarehouse';
import { PathServiceService } from 'src/app/services/path-service.service';
import { WarehouseServiceService } from 'src/app/services/warehouse-service.service';


@Component({
  selector: 'app-path',
  templateUrl: './get-paths.component.html',
  styleUrls: ['./get-paths.component.css','./get-paths.component.scss']
})
export class GetPathsComponent implements OnInit {

  displayedColumns: string[] = ['idWarehouseStart', 'idWarehouseEnd', 'distance', 'time', 'energy','extraTime', 'deletes'];

  columns = [
    {
      columnDef: 'idWarehouseStart',
      header: 'Warehouse Start',
      cell: (row: IPath) => `${this.map.get(`${row.idWarehouseStart}`)}`
    },
    {
      columnDef: 'idWarehouseEnd',
      header: 'Warehouse End',
      cell: (row: IPath) => `${this.map.get(`${row.idWarehouseEnd}`)}`
    },
    {
      columnDef: 'distance',
      header: 'Distance',
      cell: (row: IPath) => `${row.distance}`
    },
    {
      columnDef: 'time',
      header: 'Time',
      cell: (row: IPath) => `${row.time.hours*60 + row.time.minutes + row.time.seconds/60}`
    },
    {
      columnDef: 'energy',
      header: 'Energy',
      cell: (row: IPath) => `${row.energy}`
    },
    {
      columnDef: 'extraTime',
      header: 'Extra Time',
      cell: (row: IPath) => `${row.extraTime.hours*60 + row.extraTime.minutes + row.extraTime.seconds/60}`
    }
  ]



  dataSource!: MatTableDataSource<IPath>;


  @ViewChild('paginator')
  paginator!: MatPaginator;
  
  @ViewChild(MatSort)
  sort!: MatSort;
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  deliveries: IDelivery[] = [];

  paths: IPath[] = [];

  warehouses: IWarehouse[] = [];
  map = new Map<string, string>();

  constructor(private pathService: PathServiceService, private warehouseService: WarehouseServiceService) { }

  ngOnInit(): void {
    this.getAllPaths();
    this.getWarehouses();
  }

  getWarehouses(){
    this.warehouseService.getWarehouses().subscribe(
      (warehouses) => {
        this.warehouses = warehouses;
        for (let warehouse of this.warehouses){
          this.map.set(warehouse.id, warehouse.designation);
        }
      }
    );
  }

  applyFilter(filterValue: string) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toUpperCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  fiterByPath(){
    let filterFunction=
    (data: IPath, filter: string) : boolean => {
      if(filter){
        const time = data.time.hours*60 + data.time.minutes + data.time.seconds/60;
        const extraTime = data.extraTime.hours*60 + data.extraTime.minutes + data.extraTime.seconds/60;
        if(time.toString().indexOf(filter) != -1 || this.map.get(data.idWarehouseStart)!.toString().toUpperCase().indexOf(filter) != -1 || this.map.get(data.idWarehouseEnd)!.toString().toUpperCase().indexOf(filter) != -1 || data.distance.toString().indexOf(filter) != -1 || data.energy.toString().indexOf(filter) != -1 || extraTime.toString().indexOf(filter) != -1){
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
    (items: IPath[], sort: MatSort):IPath[] => {
      if(!sort.active || sort.direction === ''){
        return items;
      }
      return items.sort((a:IPath,b:IPath) => {
        let compartorResult = 0;
        const aTime = a.time.hours*60 + a.time.minutes + a.time.seconds/60;
        const bTime = b.time.hours*60 + b.time.minutes + b.time.seconds/60;

        const aExtraTime = a.extraTime.hours*60 + a.extraTime.minutes + a.extraTime.seconds/60;
        const bExtraTime = b.extraTime.hours*60 + b.extraTime.minutes + b.extraTime.seconds/60;
        switch (sort.active) {
          case 'idWarehouseStart': 
            compartorResult= a.idWarehouseStart.localeCompare(b.idWarehouseStart);
            break;
          case 'idWarehouseEnd':
            compartorResult= a.idWarehouseEnd.localeCompare(b.idWarehouseEnd);
            break;
          case 'distance':
            compartorResult= a.distance - b.distance;
            break;
          case 'time':
            compartorResult= aTime - bTime;
            break;
          case 'energy':
            compartorResult= a.energy - b.energy;
            break;
          case 'extraTime':
            compartorResult= aExtraTime - bExtraTime;
            break;
          default:
            compartorResult= a.idWarehouseStart.localeCompare(b.idWarehouseStart);
            break;
        }
        return compartorResult * (sort.direction === 'asc' ? 1 : -1);
      });
    };

  
  return sortFunction;
  }

  getAllPaths(): void {
    this.pathService.getAllPaths().subscribe(
    (paths) =>  {this.paths = paths
      this.dataSource = new MatTableDataSource(this.paths);
      this.dataSource.sortData = this.sortData();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.fiterByPath();
    });

  }

  deletePath(id: string){
    this.pathService.deletePath(id).subscribe((data) => {
    this.getAllPaths();
    },

    (error) => {
      alert("Error deleting path");
    });
      
  }

}
