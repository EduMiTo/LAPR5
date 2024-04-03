import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Iroute } from 'src/app/interfaces/iroute';
import { RoutePlanningService } from 'src/app/services/route-planning.service';

@Component({
  selector: 'app-get-route-planning',
  templateUrl: './get-route-planning.component.html',
  styleUrls: ['./get-route-planning.component.css', './get-route-planning.component.scss']
})
export class GetRoutePlanningComponent implements OnInit {
  displayedColumns: string[] = ['truckPlate', 'planningDate', 'path', 'planningTime', 'heuristic', 'deletes'];

  columns = [
    {
      columnDef: 'truckPlate',
      header: 'Truck Plate',
      cell: (row: Iroute) => `${row.truckPlate}`
    },
    {
      columnDef: 'planningDate',
      header: 'Date',
      cell: (row: Iroute) => `${row.planningDate}`
    },
    {
      columnDef: 'path',
      header: 'Path',
      cell: (row: Iroute) => `${row.path}`
    },
    {
      columnDef: 'planningTime',
      header: 'Time(Min)',
      cell: (row: Iroute) => `${row.planningTime}`
    },
    {
      columnDef: 'heuristic',
      header: 'Method',
      cell: (row: Iroute) => `${row.heuristic}`
    }
  ]

  dataSource!: MatTableDataSource<Iroute>;


  @ViewChild('paginator')
  paginator!: MatPaginator;
  
  @ViewChild(MatSort)
  sort!: MatSort;




  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  routes: Iroute[] = [];

  constructor(private routeService: RoutePlanningService) { }

  ngOnInit(): void {
    this.getAllRoutes();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getAllRoutes(): void {
    this.routeService.getAllRoutes().subscribe(
    (routes) => { 
      
      for (let i = 0; i < routes.length; i++) {
        routes[i].planningDate = GetRoutePlanningComponent.adaptDate(routes[i].planningDate);
        routes[i].path = GetRoutePlanningComponent.adaptPath(routes[i].path);
        routes[i].planningTime = GetRoutePlanningComponent.adaptTime(routes[i].planningTime);
        // this.adaptTime(routes[i].planningTime);
      }



      this.routes = routes;

      this.dataSource = new MatTableDataSource(this.routes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    
    
    });
  }

  static adaptTime(time: number): number {

    let newTime = time.toFixed(3);

    return parseFloat(newTime);
  }

  static adaptPath(path: string): string {
    let newPath = path.split("");


    for(let i = 0; i < path.length/3; i++){
     
      newPath[i*3+3+i] = '-'; 
      newPath[i*3+2+i] = path[i*3+2];
      newPath[i*3+1+i] = path[i*3+1];
      newPath[i*3+i] = path[i*3];

    }

    newPath[newPath.length-1] = '';


    return newPath.join("");
  }

  static adaptDate(date: string): string {
    let newDate = date.split("");
    newDate[9]= date[7];
    newDate[8]= date[6];
    newDate[7]= date[5];
    newDate[6]= date[4];
    newDate[5]= '/';
    newDate[4]= date[3];
    newDate[3]= date[2];
    newDate[2]= '/';



    return newDate.join("");
  }

  deletePlanning (id: string){
    this.routeService.deletePlanning(id).subscribe(
      (response) => {
        this.getAllRoutes();
      }
    )
  }
  
}
