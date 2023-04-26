import { GeoPoint } from "./GeoPoint.type"

export type Order = {
    id: string,
    title: string,
    location: GeoPoint
}