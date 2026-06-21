'use client'

import dynamic from 'next/dynamic'

const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0F172A] flex items-center justify-center text-slate-400">Cargando mapa...</div>
})

export default function Map({ stores, selectedStore, onStoreSelect }: any) {
  return <MapClient stores={stores} selectedStore={selectedStore} onStoreSelect={onStoreSelect} />
}
