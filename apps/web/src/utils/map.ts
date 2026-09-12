import { buffer, point } from '@turf/turf'
import { BIKE_COLORS } from '../constants/map'

export function getBikeColor(bikes: number): [number, number, number] {
  if (bikes < 5) return BIKE_COLORS.low
  if (bikes < 10) return BIKE_COLORS.medium
  return BIKE_COLORS.high
}

export function createWalkingArea(
  center: readonly [number, number],
  radiusInMeters: number,
) {
  return buffer(point([...center]), radiusInMeters, { units: 'meters' })
}
