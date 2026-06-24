export type Classification = 'A' | 'AA' | 'AAA'

export interface Store {
  code: string
  name: string
  route: string
  address: string
  lng: number   // Coord. Geocaptura 1
  lat: number   // Coord. Geocaptura 2
  lastMonthSales: number
  classification: Classification
  visitDays: string
}
