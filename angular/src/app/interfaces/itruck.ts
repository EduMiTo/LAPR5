export interface ITruck {
  plate: string;
  tare: number;
  massCapacity: number;
  maximumBattery: number;
  autonomy: number;
  chargeTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  active: boolean;
}
