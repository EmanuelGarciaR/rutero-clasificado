'use client'

import { useEffect, useRef, useState } from 'react'
import { Store } from '@/lib/types'
import gsap from 'gsap'
import { X, MapPin, Receipt, Hash } from 'lucide-react'

const formatCOP = (val: number) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val)
}

const getClassificationColor = (classification: string) => {
  switch (classification) {
    case 'A': return '#10B981'
    case 'AA': return '#FACC15'
    case 'AAA': return '#EF4444'
    default: return '#64748B'
  }
}

export default function StorePanel({ store, onClose }: { store: Store | null, onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const salesRef = useRef<HTMLSpanElement>(null)
  const [displayStore, setDisplayStore] = useState<Store | null>(null)

  // Maximo ventas del dataset aprox
  const maxSales = 7000000 

  useEffect(() => {
    if (store) {
      const isNewStore = displayStore?.code !== store.code
      setDisplayStore(store)
      
      // Entrar el panel si no estaba visible
      if (!displayStore || displayStore.code !== store.code) {
         gsap.fromTo(panelRef.current,
           { x: 320, opacity: 0 },
           { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
         )
      }

      // Animaciones de cambio de tienda
      if (badgeRef.current) {
        gsap.fromTo(badgeRef.current,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' }
        )
      }

      if (salesRef.current && isNewStore) {
        const counter = { val: 0 }
        gsap.fromTo(counter, { val: 0 }, {
          val: store.lastMonthSales,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: () => { 
            if (salesRef.current) {
              salesRef.current.textContent = formatCOP(Math.round(counter.val)) 
            }
          }
        })
      }
    } else if (displayStore) {
      // Animar salida
      gsap.to(panelRef.current,
        { 
          x: 320, 
          opacity: 0, 
          duration: 0.3, 
          ease: 'power2.in', 
          onComplete: () => setDisplayStore(null) 
        }
      )
    }
  }, [store])

  const handleClose = () => {
    // Si se cierra por botón, delegamos al padre que enviará store=null
    onClose()
  }

  if (!displayStore) return null

  const color = getClassificationColor(displayStore.classification)
  const progressPercent = Math.min((displayStore.lastMonthSales / maxSales) * 100, 100)

  return (
    <div 
      ref={panelRef}
      className="fixed right-0 top-0 bottom-0 w-full md:w-[320px] bg-[#0F172A]/95 backdrop-blur-xl z-50 flex flex-col shadow-2xl opacity-0 transform translate-x-[320px]"
      style={{ borderLeft: `2px solid ${color}` }}
    >
      <div className="p-6 flex-1 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div 
            ref={badgeRef}
            className="px-3 py-1 rounded-full text-white font-bold text-sm shadow-lg flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            Categoría {displayStore.classification}
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-white mb-8 leading-tight">
          {displayStore.name}
        </h2>

        <div className="space-y-6 flex-1">
          <div className="flex items-start gap-4">
            <div className="mt-1 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400">
              <Hash size={16} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Código</p>
              <p className="text-slate-200 font-medium">{displayStore.code}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400">
              <MapPin size={16} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Dirección</p>
              <p className="text-slate-200 font-medium">{displayStore.address}</p>
              <p className="text-slate-500 text-sm mt-1">{displayStore.route}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400">
              <Receipt size={16} />
            </div>
            <div className="w-full">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Venta último mes</p>
              <p className="text-3xl font-bold text-white tracking-tight mb-4 mt-2" style={{ color: color }}>
                <span ref={salesRef}>{formatCOP(displayStore.lastMonthSales)}</span>
              </p>
              
              <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%`, backgroundColor: color }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
