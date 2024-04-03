export interface IPath {
    id:string;
    idWarehouseStart: string;
    idWarehouseEnd: string;
    distance: number;
    time: {
        hours: number;
        minutes: number;
        seconds: number;
      }
    energy: number;
    extraTime: {
        hours: number;
        minutes: number;
        seconds: number;
      }
  }
  