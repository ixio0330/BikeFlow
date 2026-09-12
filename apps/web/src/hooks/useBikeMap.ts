import { GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers'
import { MapLibreOverlay } from '@deck.gl/maplibre'
import { Map, NavigationControl, Popup } from 'maplibre-gl'
import { useEffect, type RefObject } from 'react'
import {
  INITIAL_ZOOM,
  OPEN_FREE_MAP_STYLE,
  SEOUL_CENTER,
  SEOUL_PLAZA,
  WALKING_RADIUS_METERS,
} from '../constants/map'
import { stations, type Station } from '../data/stations'
import { createWalkingArea, getBikeColor } from '../utils/map'

const seoulPlazaWalkingArea = createWalkingArea(
  SEOUL_PLAZA,
  WALKING_RADIUS_METERS,
)

export function useBikeMap(mapContainer: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!mapContainer.current) return

    const map = new Map({
      container: mapContainer.current,
      style: OPEN_FREE_MAP_STYLE,
      center: [...SEOUL_CENTER],
      zoom: INITIAL_ZOOM,
    })

    map.addControl(new NavigationControl(), 'top-right')

    const deckOverlay = new MapLibreOverlay({
      interleaved: true,
      getCursor: ({ isHovering }) => (isHovering ? 'pointer' : 'grab'),
      layers: [
        new GeoJsonLayer({
          id: 'seoul-plaza-walking-area',
          data: seoulPlazaWalkingArea,
          filled: true,
          stroked: true,
          getFillColor: [37, 99, 235, 45],
          getLineColor: [37, 99, 235, 210],
          getLineWidth: 3,
          lineWidthUnits: 'pixels',
        }),
        new ScatterplotLayer<Station>({
          id: 'stations',
          data: stations.features,
          getPosition: (station) =>
            station.geometry.coordinates as [number, number],
          getRadius: 85,
          radiusUnits: 'meters',
          radiusMinPixels: 7,
          getFillColor: (station) => getBikeColor(station.properties.bikes),
          getLineColor: [255, 255, 255],
          getLineWidth: 2,
          lineWidthUnits: 'pixels',
          stroked: true,
          pickable: true,
          autoHighlight: true,
          onClick: ({ object }) => {
            if (!object) return
            new Popup({ offset: 14 })
              .setLngLat(object.geometry.coordinates as [number, number])
              .setText(
                `${object.properties.name} · ${object.properties.bikes}대`,
              )
              .addTo(map)
          },
        }),
      ],
    })

    map.once('load', () => map.addControl(deckOverlay))

    return () => {
      if (map.hasControl(deckOverlay)) map.removeControl(deckOverlay)
      map.remove()
    }
  }, [mapContainer])
}
