import type { Feature, FeatureCollection, Point } from 'geojson'

export type StationProperties = { name: string; bikes: number }
export type Station = Feature<Point, StationProperties>

export const stations: FeatureCollection<Point, StationProperties> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: '서울광장', bikes: 12 },
      geometry: { type: 'Point', coordinates: [126.9779, 37.5663] },
    },
    {
      type: 'Feature',
      properties: { name: '광화문', bikes: 4 },
      geometry: { type: 'Point', coordinates: [126.9768, 37.5759] },
    },
    {
      type: 'Feature',
      properties: { name: '동대문디자인플라자', bikes: 8 },
      geometry: { type: 'Point', coordinates: [127.0095, 37.5667] },
    },
    {
      type: 'Feature',
      properties: { name: '남산서울타워', bikes: 1 },
      geometry: { type: 'Point', coordinates: [126.9882, 37.5512] },
    },
  ],
}
