import { GeoPoint } from "./GeoPoint.type"

export type MapMarker = {
    position: GeoPoint,
    description: string,
    isHighlighted: boolean
}