'use client'

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Store } from '@/lib/types'
import { divIcon } from 'leaflet'
import { useEffect } from 'react'

const getClassificationColor = (classification: string) => {
  switch (classification) {
    case 'A': return '#10B981' // Verde esmeralda
    case 'AA': return '#FACC15' // Amarillo claro
    case 'AAA': return '#EF4444' // Rojo
    default: return '#64748B' // Gris
  }
}

const createCustomIcon = (store: Store, isSelected: boolean) => {
  const color = getClassificationColor(store.classification)
  const isSelectedClass = isSelected ? 'ring-4 ring-white animate-pulse' : ''
  
  const html = `
    <div style="background-color: ${color};" class="w-[28px] h-[28px] rounded-full border-[2px] border-white flex items-center justify-center text-white font-bold text-xs shadow-lg ${isSelectedClass}">
      ${store.classification}
    </div>
  `
  return divIcon({
    html,
    className: 'custom-marker', // quita los estilos por defecto
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })
}

// Componente para animar el pin si es necesario, o hacer flyTo
function MapController({ selectedStore, stores }: { selectedStore: Store | null, stores: Store[] }) {
  const map = useMap()
  
  useEffect(() => {
    if (selectedStore) {
      map.flyTo([selectedStore.lat, selectedStore.lng], 15, { animate: true, duration: 1 })
    }
  }, [selectedStore, map])

  return null
}

export default function MapClient({ 
  stores, 
  selectedStore, 
  onStoreSelect 
}: { 
  stores: Store[], 
  selectedStore: Store | null, 
  onStoreSelect: (store: Store | null) => void 
}) {
  return (
    <MapContainer 
      center={[6.2876, -75.5550]} 
      zoom={13} 
      className="w-full h-full z-0"
      zoomControl={false}
      onClick={() => onStoreSelect(null)}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
      />
      
      {stores.map((store) => (
        <Marker
          key={store.code}
          position={[store.lat, store.lng]}
          icon={createCustomIcon(store, selectedStore?.code === store.code)}
          eventHandlers={{
            click: () => onStoreSelect(store)
          }}
        />
      ))}
      <MapController selectedStore={selectedStore} stores={stores} />
    </MapContainer>
  )
}
