import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IPath } from 'src/app/interfaces/ipath';

import { IWarehouse } from 'src/app/interfaces/iwarehouse';
import { PathServiceService } from 'src/app/services/path-service.service';
import { WarehouseServiceService } from 'src/app/services/warehouse-service.service';


@Component({
  selector: 'app-get-warehouses',
  templateUrl: './get-warehouses.component.html',
  styleUrls: ['./get-warehouses.component.css','./get-warehouses.component.scss']
})
export class GetWarehousesComponent{
  displayedColumns: string[] = ['id', 'designation', 'address', 'latitude', 'longitude', 'altitude', 'deletes'];
  
  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (row: IWarehouse) => `${row.id}`
    },
    {
      columnDef: 'designation',
      header: 'Designation',
      cell: (row: IWarehouse) => `${row.designation}`
    },
    {
      columnDef: 'address',
      header: 'Address',
      cell: (row: IWarehouse) => `${row.address}`
    },
    {
      columnDef: 'latitude',
      header: 'Latitude',
      cell: (row: IWarehouse) => `${row.latitude}`
    },
    {
      columnDef: 'longitude',
      header: 'Longitude',
      cell: (row: IWarehouse) => `${row.longitude}`
    },
    {
      columnDef: 'altitude',
      header: 'Altitude',
      cell: (row: IWarehouse) => `${row.altitude}`
    }
  ]
  
  dataSource!: MatTableDataSource<IWarehouse>;


  @ViewChild('paginator')
  paginator!: MatPaginator;
  
  @ViewChild(MatSort)
  sort!: MatSort;

  sideBarOpen = true;

  paths: IPath[] = [];

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  
  warehouses: IWarehouse[] = [];

  constructor(private warehouseService: WarehouseServiceService, private pathService: PathServiceService) {

    //this.getWarehouses();
    this.getWarehouses();
    
    
    

    /*const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

    this.dataSource = new MatTableDataSource(users);*/
    


   }

   


  ngAfterViewInit() {
   /*this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;*/
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onChange(active: boolean, inhibt: boolean) {
    this.getWarehousesChecked(active, inhibt);
  }

  getWarehousesChecked(active: boolean, inhibt: boolean): void {
    this.warehouses = [];
    this.warehouseService.getWarehouses().subscribe(
      (warehouses) =>  {
        let w: IWarehouse[] = [];
        warehouses.forEach(function (value) {
          if (active && inhibt){
            w.push(value);
          }
          else if (active && !inhibt){
            if (value.active) w.push(value);
          }
          else if (!active && inhibt){
            if (!value.active) w.push(value);
          }
        });

        this.warehouses = w;
        this.dataSource = new MatTableDataSource(this.warehouses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
      
      );

    }

  

  getWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe(
      (warehouses) =>  {this.warehouses = warehouses,
        

      this.dataSource = new MatTableDataSource(this.warehouses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      }
      
      );


    }


  deleteWarehouse(warehouseId: string){
    this.warehouseService.deleteWarehouse(warehouseId).subscribe((data) => {

      document.querySelectorAll('a').forEach(function(element) {
        element.classList.add('disabled');
      });



      this.pathService.getAllPaths().subscribe((paths) => {
        this.paths = paths;
        for (let i = 0; i < this.paths.length; i++) {
          if (this.paths[i].idWarehouseStart === warehouseId || this.paths[i].idWarehouseEnd === warehouseId){

            this.pathService.deletePath(this.paths[i].id).subscribe();
          }
        }
      });
      
        
      this.getWarehouses();

      document.querySelectorAll('a').forEach(function(element) {
        element.removeAttribute('disabled');
      });
    },

    

    (error) => {
      alert("Error deleting warehouse");
    });
      
  }

  inactivateWarehouse(id: string){
    this.warehouseService.inactivateWarehouse(id).subscribe((data) => {
    this.getWarehouses();
    },

    (error) => {
      alert("Error inhibiting warehouse");
    });
      
  }

  activateWarehouse(data: any){
    this.warehouseService.activateWarehouse({
      "id": data.id,
      "designation": data.designation,
      "address": data.address,
      "latitude": parseFloat(data.latitude),
      "longitude": parseFloat(data.longitude),
      "altitude": parseFloat(data.altitude),
      "active": true
    } as IWarehouse).subscribe((data) => {
      this.getWarehouses();
      },
  
      (error) => {
        alert("Error activating warehouse");
      });
      
  }
}


