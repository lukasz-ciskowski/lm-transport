export interface BusStop {
    Id: number
    Name: string
    Street: string
    City: string
    PostCode: string
    Lat: number
    Lon: number
}

export type BaseBusStop = Pick<BusStop, "Id" | "Name">