import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPacking } from 'src/app/interfaces/ipacking';
import { PackingServiceService } from '../../../../services/packing-service.service';


@Component({
  selector: 'app-packing',
  templateUrl: './get-packings.component.html',
  styleUrls: ['./get-packings.component.css','./get-packings.component.scss']
})
export class GetPackingsComponent implements OnInit {

  displayedColumns: string[] = ['truckPlate', 'deliveryId', 'position.positionX', 'position.positionY', 'position.positionZ', 'deletes'];
  columns = [
    {
      columnDef: 'truckPlate',
      header: 'Truck Plate',
      cell: (row: IPacking) => `${row.truckPlate}`
    },
    {
      columnDef: 'deliveryId',
      header: 'Delivery ID',
      cell: (row: IPacking) => `${row.deliveryId}`
    },
    {
      columnDef: 'position.positionX',
      header: 'Position X',
      cell: (row: IPacking) => `${row.position.positionX}`
    },
    {
      columnDef: 'position.positionY',
      header: 'Position Y',
      cell: (row: IPacking) => `${row.position.positionY}`
    },
    {
      columnDef: 'position.positionZ',
      header: 'Position Z',
      cell: (row: IPacking) => `${row.position.positionZ}`
    }
  ]
  
  dataSource!: MatTableDataSource<IPacking>;


  @ViewChild('paginator')
  paginator!: MatPaginator;
  
  @ViewChild(MatSort)
  sort!: MatSort;

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  packings: IPacking[] = [];

  constructor(private packingService: PackingServiceService) {
    this.getAllPackings();
   
   }

  ngOnInit(): void {
   
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  fiterByPacking(){
    let filterFunction=
    (data: IPacking, filter: string) : boolean => {
      if(filter){
        if(data.truckPlate.indexOf(filter) != -1 || data.deliveryId.indexOf(filter) != -1 || data.position.positionX.toString().indexOf(filter) != -1 || data.position.positionY.toString().indexOf(filter) != -1 || data.position.positionZ.toString().indexOf(filter) != -1){
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
    (items: IPacking[], sort: MatSort):IPacking[] => {
      if(!sort.active || sort.direction === ''){
        return items;
      }
      return items.sort((a:IPacking,b:IPacking) => {
        let compartorResult = 0;
       
        switch (sort.active) {
          case 'truckPlate':
            compartorResult= a.truckPlate.localeCompare(b.truckPlate);
            break;
          case 'deliveryId':
            compartorResult= a.deliveryId.localeCompare(b.deliveryId);
            break;
          case 'position.positionX':
            compartorResult= a.position.positionX - b.position.positionX;
            break;
          case 'position.positionY':
            compartorResult= a.position.positionY - b.position.positionY;
            break;
          case 'position.positionZ':
            compartorResult= a.position.positionZ - b.position.positionZ;
            break;
          default:
            compartorResult= a.truckPlate.localeCompare(b.truckPlate);
            break;
        }
        return compartorResult * (sort.direction === 'asc' ? 1 : -1);
      });
    };

  
  return sortFunction;
  }

  
  getAllPackings(): void {
  this.packingService.getAllPackings().subscribe(
    (packings) =>  {
      this.packings = packings;


    this.dataSource = new MatTableDataSource(this.packings);
    this.dataSource.sortData = this.sortData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.fiterByPacking();

    });

  }

  deletePacking(id: string): void {

    this.packingService.deletePacking(id).subscribe(
      (response) => {
        this.getAllPackings();
      },
      (error) => {
      }
    );
    
  }

}
