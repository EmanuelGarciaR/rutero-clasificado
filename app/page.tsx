'use client'

import { useEffect, useState } from 'react'
import Map from '@/components/Map'
import StorePanel from '@/components/StorePanel'
import Legend from '@/components/Legend'
import { loadStores } from '@/lib/parseStores'
import { Store } from '@/lib/types'
import gsap from 'gsap'

export default function Home() {
  const [stores, setStores] = useState<Store[]>([])
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const data = await loadStores()
      setStores(data)
      setLoading(false)

      // Animar entrada inicial de los marcadores con un pequeño delay
      setTimeout(() => {
        gsap.fromTo('.custom-marker',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.015, ease: 'back.out(2)' }
        )
      }, 500)
    }
    init()
  }, [])

  return (
    <main className="h-screen w-full flex flex-col overflow-hidden bg-[#0F172A] relative">
      {/* Header minimalista */}
      <header className="absolute top-0 left-0 w-full z-10 px-6 py-4 flex items-center justify-between bg-gradient-to-b from-[#0F172A]/90 to-transparent pointer-events-none">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
          Rutero Diana
        </h1>
        <div className="px-4 py-1.5 rounded-full bg-slate-800/80 backdrop-blur border border-slate-700/50 text-sm font-medium text-slate-300">
          {loading ? 'Cargando...' : `${stores.length} tiendas · Medellín`}
        </div>
      </header>

      {/* Mapa */}
      <div className="flex-1 relative z-0">
        <Map 
          stores={stores} 
          selectedStore={selectedStore} 
          onStoreSelect={setSelectedStore} 
        />
        <Legend />
      </div>

      {/* Panel lateral */}
      <StorePanel 
        store={selectedStore} 
        onClose={() => setSelectedStore(null)} 
      />
    </main>
  )
}
