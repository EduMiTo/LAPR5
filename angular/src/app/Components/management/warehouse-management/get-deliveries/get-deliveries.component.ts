import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IDelivery } from 'src/app/interfaces/idelivery';
import { IWarehouse } from 'src/app/interfaces/iwarehouse';
import { DeliveryServiceService } from 'src/app/services/delivery-service.service';
import { WarehouseServiceService } from 'src/app/services/warehouse-service.service';

@Component({
  selector: 'app-get-deliveries',
  templateUrl: './get-deliveries.component.html',
  styleUrls: ['./get-deliveries.component.css','./get-deliveries.component.scss']
})
export class GetDeliveriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'unloadTime', 'loadTime', 'limitDate', 'weight', 'warehouse', 'deletes'];
  
  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (row: IDelivery) => `${row.id}`
    },
    {
      columnDef: 'unloadTime',
      header: 'Unload Time',
      cell: (row: IDelivery) => `${row.unloadTime}`
    },
    {
      columnDef: 'loadTime',
      header: 'Load Time',
      cell: (row: IDelivery) => `${row.loadTime}`
    },
    {
      columnDef: 'limitDate',
      header: 'Date',
      cell: (row: IDelivery) => `${row.limitDate}`
    },
    {
      columnDef: 'weight',
      header: 'Weight',
      cell: (row: IDelivery) => `${row.weight}`
    },
    {
      columnDef: 'warehouse',
      header: 'Warehouse',
      cell: (row: IDelivery) => `${this.map.get(`${row.warehouse}`)}`
    }
  ]

  
  warehouses: IWarehouse[] = [];
  
  dataSource!: MatTableDataSource<IDelivery>;


  @ViewChild('paginator')
  paginator!: MatPaginator;
  
  @ViewChild(MatSort)
  sort!: MatSort;
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  
  deliveries: IDelivery[] = [];

  map = new Map<string, string>();

  constructor(private deliveryService : DeliveryServiceService, private warehouseService: WarehouseServiceService) { }

  ngOnInit(): void {
    this.getDeliveries();
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

  getDeliveries(): void {
    this.deliveryService.getAllDeliveries().subscribe(
      (deliveries) => { this.deliveries = deliveries
        this.dataSource = new MatTableDataSource(this.deliveries);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
        this.dataSource.sortData = this.sortData();
        this.dataSource.filterPredicate = this.filterByDel();
      });
    }

    deleteDeliveries(id: string){
      this.deliveryService.deleteDelivery(id).subscribe((data) => 
      this.getDeliveries());
      
    }


    filterByDel(){
      let filterFunction=
      (data: IDelivery, filter: string) : boolean => {
        if(filter){
          if(data.id.toString().indexOf(filter) != -1 || data.limitDate.toString().indexOf(filter) != -1 || data.loadTime.toString().indexOf(filter) != -1 || data.unloadTime.toString().indexOf(filter) != -1 || this.map.get(data.warehouse)!.toString().toUpperCase().indexOf(filter) != -1 || data.weight.toString().indexOf(filter) != -1){
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
      (items: IDelivery[], sort: MatSort):IDelivery[] => {
        if(!sort.active || sort.direction === ''){
          return items;
        }
        return items.sort((a:IDelivery,b:IDelivery) => {
          let compartorResult = 0;
         
          switch (sort.active) {
            case 'id':
              compartorResult= a.id.localeCompare(b.id);
              break;
            case 'unloadTime':
              compartorResult= a.unloadTime - b.unloadTime;
              break;
            case 'loadTime':
              compartorResult= a.loadTime - b.loadTime;
              break;
            case 'limitDate':
              var splitted = a.limitDate.split("/");
              let novaDataPlan= new Date(''+splitted[2]+'-'+splitted[1]+'-'+splitted[0]+'');
              var splitted2 = b.limitDate.split("/");
              let novaDataPlan2= new Date(''+splitted2[2]+'-'+splitted2[1]+'-'+splitted2[0]+'');
              compartorResult= novaDataPlan.getTime() - novaDataPlan2.getTime();
              break;
            case 'weight':
              compartorResult= a.weight - b.weight;
              break;
            case 'warehouse':
              compartorResult= a.warehouse.localeCompare(b.warehouse);
              break;
            
            default:
              compartorResult= a.id.localeCompare(b.id);
              break;
          }
          return compartorResult * (sort.direction === 'asc' ? 1 : -1);
        });
      };
  
    
    return sortFunction;
    }

}
