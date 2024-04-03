import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { PathId } from "../domain/pathId";
import ITruckRepo from '../services/IRepos/ITruckRepo';
import { IPathPersistence } from '../dataschema/IPathPersistence';
import { Path } from '../domain/path';
import { PathMap } from '../mappers/PathMap';
import IPathRepo from '../services/IRepos/IPathRepo';
import fetch from 'node-fetch';

@Service()
export default class PathRepo implements IPathRepo {
  private models: any;

  constructor(
    @Inject('pathSchema') private pathSchema : Model<IPathPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (pathId: PathId | string): Promise<boolean> {

    const idX = pathId instanceof PathId ? (<PathId>pathId).id.toValue() : pathId;

    const query = { id: idX}; 
    const pathDocument = await this.pathSchema.findOne( query );

    return !!pathDocument === true;
  }

  public async save (path: Path): Promise<Path> {
    const query = { id: path.id.toString() }; 

    const pathDocument = await this.pathSchema.findOne( query );

    try {
      if (pathDocument === null ) {
        const rawPath: any = PathMap.toPersistence(path);
        
        if (PathMap.isValid(path) != true){
          return PathMap.isValid(path);
        }

        if (!(await this.wharehousesExists(path))){
          return null;
        }
        let exist = false;
        let path1 = await this.findByWarehouseStart(path.idWarehouseStart);
        path1.forEach(element =>{
          if(element.idWarehouseEnd==path.idWarehouseEnd){
            exist = true;
            return null;
          }
        }
        );
        

        if(exist)return null;

        const pathCreated = await this.pathSchema.create(rawPath);
        
        return PathMap.toDomain(pathCreated);
      } else {
        if (PathMap.isValid(path) != true){
          return PathMap.isValid(path);
        }
        pathDocument.distance = path.distance;
        pathDocument.time = path.time;
        pathDocument.energy = path.energy;
        pathDocument.extraTime = path.extraTime;
        await pathDocument.save();

        return path;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (pathId: PathId | string): Promise<Path> {
    const query = { id : pathId};
    const pathRecord = await this.pathSchema.findOne( query as FilterQuery<IPathPersistence & Document> );

    if( pathRecord != null) {
      return PathMap.toDomain(pathRecord);
    }
    else
      return null;
  }

  public async findAll() : Promise<Array<Path>> {
    const pathRecord = await this.pathSchema.find();
    var paths:Array<Path> =[];
    if( pathRecord != null) {
      pathRecord.forEach(async element => {
        paths.push(await PathMap.toDomain(element));
        });
      return paths;
    }
    else
      return null;
  }

  public async findByWarehouseStart(idWarehouseStart: string): Promise<Array<Path>> {
    const pathRecord = await this.pathSchema.find();
    var paths:Array<Path> =[];
    if( pathRecord != null) {
      pathRecord.forEach(async element => {
        if (element.idWarehouseStart == idWarehouseStart){
          paths.push(await PathMap.toDomain(element));
        }
      });
      return paths;
    }
    else
      return null;
  }

  public async findByWarehouseEnd(idWarehouseEnd: string): Promise<Array<Path>> {
    const pathRecord = await this.pathSchema.find();
    var paths:Array<Path> =[];
    if( pathRecord != null) {
      pathRecord.forEach(async element => {
        if (element.idWarehouseEnd == idWarehouseEnd){
          paths.push(await PathMap.toDomain(element));
        }
      });
      return paths;
    }
    else
      return null;
  }

  public async findByWarehouses(idWarehouseStart: string, idWarehouseEnd: string): Promise<Path> {
    const query = { idWarehouseStart : idWarehouseStart, idWarehouseEnd : idWarehouseEnd };
    const pathRecord = await this.pathSchema.findOne( query as FilterQuery<IPathPersistence & Document> );

    if( pathRecord != null) {
      return PathMap.toDomain(pathRecord);
    }
    else
      return null;
  }

  public async wharehousesExists (path: Path): Promise<any>{
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      // 👇️ const response: Response
      const response = await fetch('http://localhost:5001/api/Warehouses', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result: any[] = (await response.json());

      var validWarehouses = 0;

      result.forEach( (element) => {
        if (path.idWarehouseEnd == element.id?.value || path.idWarehouseStart == element.id?.value){
          validWarehouses++;
        }
      });

      
  
      if (validWarehouses === 2){
        return true;
      }

      console.log("Invalid wharehouses ids.");
      return false;
    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  public async delete (path: Path): Promise<Path> {
    const query = { id: path.id.toString() }; 

    try {

      const pathRecord = await this.pathSchema.findOneAndDelete(query);
      if (pathRecord != null) {
        return PathMap.toDomain(pathRecord);
      }
    } catch (err) {
      throw err;
    }
  }
}
