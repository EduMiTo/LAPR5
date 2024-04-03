import { TripDesignation } from "../domain/tripDesignation";

export interface ITripPersistance {
    id: string;
    date: Date;
    designation: TripDesignation;
}