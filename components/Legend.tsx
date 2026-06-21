'use client'

export default function Legend() {
  return (
    <div className="absolute bottom-6 left-6 z-10 bg-[#0F172A]/80 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 shadow-2xl">
      <h3 className="text-slate-200 text-xs font-semibold mb-3 uppercase tracking-wider">Clasificación</h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-[#10B981] border border-white"></div>
          <div className="flex flex-col">
            <span className="text-slate-100 text-sm font-medium">A</span>
            <span className="text-slate-400 text-xs">Mayor venta</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-[#FACC15] border border-white"></div>
          <div className="flex flex-col">
            <span className="text-slate-100 text-sm font-medium">AA</span>
            <span className="text-slate-400 text-xs">Venta media</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-[#EF4444] border border-white"></div>
          <div className="flex flex-col">
            <span className="text-slate-100 text-sm font-medium">AAA</span>
            <span className="text-slate-400 text-xs">Menor venta</span>
          </div>
        </div>
      </div>
    </div>
  )
}
