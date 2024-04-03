export interface Iroute {
    id: string,
    truckPlate: string,
    planningDate: string,
    path: string,
    planningTime: number,
    time?: string,
    heuristic: string,
    generations: number,
    population: number,
    crossover: number,
    mutation: number
}
