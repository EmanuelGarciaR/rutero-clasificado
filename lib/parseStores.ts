import Papa from 'papaparse'
import { Store } from './types'

export async function loadStores(): Promise<Store[]> {
  try {
    const res = await fetch('/data/stores.csv')
    const text = await res.text()
    
    const { data } = Papa.parse(text, { header: true, skipEmptyLines: true })
    
    return (data as any[])
      .filter(row => row['Coord. Geocaptura 2'] && row['Coord. Geocaptura 1'])
      .map(row => ({
        code: String(row['Código'] || '').trim(),
        name: String(row['Nombre del Cliente'] || '').trim(),
        route: String(row['Ruta '] || '').trim(),
        address: String(row['Dirección'] || '').trim(),
        lng: parseFloat(row['Coord. Geocaptura 1']),
        lat: parseFloat(row['Coord. Geocaptura 2']),
        lastMonthSales: parseInt(String(row['Venta ultimo mes '] || '').replace(/\./g, '').trim()) || 0,
        classification: String(row['Clasificacion'] || '').trim() as Store['classification'],
      }))
  } catch (error) {
    console.error("Error loading stores:", error)
    return []
  }
}
