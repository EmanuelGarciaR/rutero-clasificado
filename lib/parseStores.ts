import Papa from 'papaparse'
import { Store } from './types'

export async function loadStores(): Promise<Store[]> {
  try {
    const res = await fetch('/data/Ruta_diana_clasificada.csv')
    const text = await res.text()
    
    const { data } = Papa.parse(text, { header: true, skipEmptyLines: true })
    
    return (data as any[])
      .filter(row => row['Coord. Geocaptura 2'] && row['Coord. Geocaptura 1'])
      .map(row => ({
        code: String(row['Código'] || '').trim(),
        name: String(row['Nombre del Cliente'] || '').trim(),
        route: String(row['Ruta '] || '').trim(),
        address: String(row['Dirección'] || '').trim(),
        lng: parseFloat(String(row['Coord. Geocaptura 1'] || '').replace(',', '.')),
        lat: parseFloat(String(row['Coord. Geocaptura 2'] || '').replace(',', '.')),
        lastMonthSales: parseInt(String(row['Venta ultimo mes '] || '').replace(/\./g, '').trim()) || 0,
        classification: String(row['Clasificacion'] || '').trim() as Store['classification'],
        visitDays: String(row['Dia de visita'] || '').trim(),
      }))
  } catch (error) {
    console.error("Error loading stores:", error)
    return []
  }
}
