import { Component, OnInit } from '@angular/core';
import { IPath } from 'src/app/interfaces/ipath';
import { PathServiceService } from 'src/app/services/path-service.service';

@Component({
  selector: 'app-update-path',
  templateUrl: './update-path.component.html',
  styleUrls: ['./update-path.component.css','./update-path.component.scss']
})
export class UpdatePathComponent implements OnInit {

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  paths: IPath[] = [];

  path!: IPath;
  selectedPath!: IPath;

  message:string;
  error=false;
  submitted = false;

  constructor(private pathService: PathServiceService) {
    this.path={
      "id":'',
      "idWarehouseStart": '',
      "idWarehouseEnd": '',
      "distance": 0,
      "time": {
        "hours": 0,
        "minutes": 0,
        "seconds": 0,
      },
      "energy": 0,
      "extraTime": {
        "hours": 0,
        "minutes": 0,
        "seconds": 0,
      }
    };
    this.selectedPath={
      "id":'',
      "idWarehouseStart": '',
      "idWarehouseEnd": '',
      "distance": 0,
      "time": {
        "hours": 0,
        "minutes": 0,
        "seconds": 0,
      },
      "energy": 0,
      "extraTime": {
        "hours": 0,
        "minutes": 0,
        "seconds": 0,
      }
    };
    this.message="";
   }

  ngOnInit(): void {
    this.pathService.getAllPaths().subscribe(
      (paths) => {
        this.paths = paths;
      }
    )  
  }

  getPathById(id: string){
    for (let path of this.paths){
      if (path.id == id){
        this.selectedPath = path;
      }
    }
  }

  updatePath(data: any) {
    this.pathService.updatePath({
      "idWarehouseStart": this.selectedPath.idWarehouseStart,
      "idWarehouseEnd": this.selectedPath.idWarehouseEnd,
      "distance": data.distance,
      "time": {
        "hours": data.hours,
        "minutes": data.minutes,
        "seconds": data.seconds,
      },
      "energy": data.energy,
      "extraTime": {
        "hours": data.et_hours,
        "minutes": data.et_minutes,
        "seconds": data.et_seconds,
      }
      
    } as IPath).subscribe((path) => {
      this.path = path;
      this.submitted = true;
    },
      (error) => {
        this.error = true;
        this.message = error.error.message;
      }
    );
  }

}
