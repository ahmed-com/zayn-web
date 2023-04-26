import { defineStore } from "pinia";
import { ref, watch, watchEffect } from "vue";
import { GeoPoint } from "../types/GeoPoint.type";
import Leaflet from 'leaflet'
import { MapMarker } from "../types/MapMarker.type";
import highlightIconUrl from '../assets/map-marker-icon.png';
import { shortenText } from "../utils/shortenText";

const highlightIcon: Leaflet.Icon = Leaflet.icon({
    iconUrl: highlightIconUrl,
    iconSize: [35, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
})

// TODO: refactor the leaflet logic to a file in lib 

export const useSearchMapStore = defineStore("searchMap",()=>{
    let map: (Leaflet.Map | null) = null;
    let view: (GeoPoint | null) = null;
    let markersLayer: Leaflet.LayerGroup = Leaflet.layerGroup();
    
    const setMap = (id: string) => {
        map = Leaflet.map(id);
        Leaflet.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }
        ).addTo(map);
        markersLayer.addTo(map)
        if(view) map.setView(view,8);
    }

    const removeMap = ()=> map = null
    
    const setView = (p: GeoPoint) => {
        view = p;
        if(!map) return;
        map.setView(p,8, {animate: true});
    }

    const setMarkers = (ms: MapMarker[])=> {
        markersLayer.clearLayers()
        let markerIsHighlighted = false;
        ms.forEach(m=>{
            const marker: Leaflet.Marker = Leaflet.marker(m.position);
            marker.bindTooltip(shortenText(m.description))
            markersLayer.addLayer(marker);
            if(!m.isHighlighted) return;
            markerIsHighlighted = true;
            marker.setIcon(highlightIcon)
            marker.bindPopup(shortenText(m.description))
            marker.openPopup()
            map?.panTo(m.position);
        });
        if(markerIsHighlighted) return;
        if(view) map?.panTo(view,{animate: true})
    }

    return {
        setMap,
        setView,
        setMarkers,
        view,
        removeMap
    }

})