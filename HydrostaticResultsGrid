import React, { useState } from 'react';
import { CalculationResult, VESSEL_INFO } from '../data/hindshipData';
import { Scale, Compass, Anchor, ArrowUpDown, Info, Check, Copy } from 'lucide-react';

interface HydrostaticResultsGridProps {
  calc: CalculationResult;
}

export const HydrostaticResultsGrid: React.FC<HydrostaticResultsGridProps> = ({ calc }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const cards = [
    {
      key: 'displacement',
      title: 'Displacement (Δ)',
      symbol: 'Δ',
      value: calc.displacement.toFixed(2),
      unit: 'tonnes',
      description: 'Total vessel mass displacing fluid at this draft & density',
      formula: `Δ = Δ_sw × (${calc.density.toFixed(3)} / 1.025)`,
      subDetail: `Deadweight: ~${calc.deadweight.toFixed(1)} t (Lightship: ${VESSEL_INFO.lightshipDisplacement} t)`,
      accentColor: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/50',
    },
    {
      key: 'tpc',
      title: 'TPC (Tonnes per Centimetre)',
      symbol: 'TPC',
      value: calc.tpc.toFixed(2),
      unit: 't/cm',
      description: 'Mass required to sink or float vessel bodily by 1 cm',
      formula: `TPC = TPC_sw × (ρ / 1.025)`,
      subDetail: `10 cm sinkage = ${(calc.tpc * 10).toFixed(1)} t cargo`,
      accentColor: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/50',
    },
    {
      key: 'mctc',
      title: 'MCTC (Moment to Change Trim)',
      symbol: 'MCTC',
      value: calc.mctc.toFixed(2),
      unit: 't-m / cm',
      description: 'Trimming moment required to alter trim by 1 centimetre',
      formula: `MCTC = (Δ × GM_L) / (100 × LBP)`,
      subDetail: `Density corrected factor: ${calc.factor.toFixed(4)}`,
      accentColor: 'text-amber-400',
      borderColor: 'hover:border-amber-500/50',
    },
    {
      key: 'lcb',
      title: 'LCB (Longitudinal Center of Buoyancy)',
      symbol: 'LCB',
      value: calc.lcb.toFixed(3),
      unit: 'm fwd of AP',
      description: 'Longitudinal centroid of underwater displaced volume',
      formula: `Measured from After Perpendicular (Midships = ${VESSEL_INFO.midships.toFixed(3)}m)`,
      subDetail: `${calc.lcb >= VESSEL_INFO.midships ? `+${(calc.lcb - VESSEL_INFO.midships).toFixed(3)}m Fwd of ⨂` : `${(VESSEL_INFO.midships - calc.lcb).toFixed(3)}m Aft of ⨂`}`,
      accentColor: 'text-sky-400',
      borderColor: 'hover:border-sky-500/50',
    },
    {
      key: 'lcf',
      title: 'LCF (Longitudinal Center of Flotation)',
      symbol: 'LCF',
      value: calc.lcf.toFixed(3),
      unit: 'm fwd of AP',
      description: 'Centroid of waterplane area (tipping point for trim)',
      formula: `Axis about which the vessel trims longitudinally`,
      subDetail: `${calc.lcf >= VESSEL_INFO.midships ? `+${(calc.lcf - VESSEL_INFO.midships).toFixed(3)}m Fwd of ⨂` : `${(VESSEL_INFO.midships - calc.lcf).toFixed(3)}m Aft of ⨂`}`,
      accentColor: 'text-orange-400',
      borderColor: 'hover:border-orange-500/50',
    },
    {
      key: 'vcb',
      title: 'VCB (Vertical Center of Buoyancy)',
      symbol: 'KB',
      value: calc.vcb.toFixed(3),
      unit: 'm above Keel',
      description: 'Vertical centroid of buoyancy measured from baseline K',
      formula: `KB height increases as hull submerges`,
      subDetail: `Immersion depth ratio: ${(calc.vcb / calc.draft).toFixed(3)} × Draft`,
      accentColor: 'text-teal-400',
      borderColor: 'hover:border-teal-500/50',
    },
    {
      key: 'kmt',
      title: 'KM(T) (Transverse Metacentre)',
      symbol: 'KM_T',
      value: calc.kmt.toFixed(3),
      unit: 'm above Keel',
      description: 'Height of transverse metacentre above baseline K',
      formula: `KM_T = KB + BM_T (BM_T = ${calc.bmt.toFixed(3)} m)`,
      subDetail: `Transverse Metacentric Radius BM_T: ${calc.bmt.toFixed(3)} m`,
      accentColor: 'text-purple-400',
      borderColor: 'hover:border-purple-500/50',
    },
    {
      key: 'kml',
      title: 'KM(L) (Longitudinal Metacentre)',
      symbol: 'KM_L',
      value: calc.kml.toFixed(1),
      unit: 'm above Keel',
      description: 'Height of longitudinal metacentre above baseline K',
      formula: `KM_L = KB + BM_L (BM_L = ${calc.bml.toFixed(1)} m)`,
      subDetail: `Longitudinal Metacentric Radius: ${calc.bml.toFixed(1)} m`,
      accentColor: 'text-indigo-400',
      borderColor: 'hover:border-indigo-500/50',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const isCopied = copiedKey === card.key;
          return (
            <div
              key={card.key}
              className={`bg-slate-900/90 border border-slate-800 rounded-xl p-4 transition-all duration-200 flex flex-col justify-between ${card.borderColor} group`}
            >
              <div>
                {/* Title & Copy affordance */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-medium text-slate-400 leading-snug">
                    {card.title}
                  </span>
                  <button
                    onClick={() => copyToClipboard(card.value, card.key)}
                    title="Copy value"
                    className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded hover:bg-slate-800"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>

                {/* Main Metric Value */}
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-2xl font-mono font-bold text-slate-100 tabular-nums tracking-tight">
                    {card.value}
                  </span>
                  <span className="text-xs uppercase font-mono text-slate-400 font-medium">
                    {card.unit}
                  </span>
                </div>

                {/* Physical Marine Definition */}
                <p className="text-xs text-slate-400/90 leading-relaxed mb-3">
                  {card.description}
                </p>
              </div>

              {/* Sub-Detail Footer with clean unboxed metadata */}
              <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="truncate">{card.subDetail}</span>
                <span className={`text-[10px] font-semibold ${card.accentColor} shrink-0`}>
                  {card.symbol}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Naval Architecture Allowance Summary Ribbon (FWA & DWA) */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Anchor className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-200">
              Fresh Water & Dock Water Allowance (FWA / DWA)
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>FWA: Displacement / (40 × TPC)</span>
              <span aria-hidden="true">·</span>
              <span>DWA: FWA × (1.025 - ρ) / 0.025</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">FRESH WATER ALLOWANCE</span>
            <span className="text-base font-bold text-cyan-400 tabular-nums">
              {calc.fwa.toFixed(1)} cm
            </span>
            <span className="text-slate-400 text-[11px] ml-1">({(calc.fwa / 100).toFixed(3)} m)</span>
          </div>

          <div className="border-l border-slate-800 pl-6">
            <span className="text-slate-500 block text-[10px]">DOCK WATER ALLOWANCE</span>
            <span className="text-base font-bold text-emerald-400 tabular-nums">
              {calc.dwa.toFixed(1)} cm
            </span>
            <span className="text-slate-400 text-[11px] ml-1">({(calc.dwa / 100).toFixed(3)} m)</span>
          </div>

          <div className="border-l border-slate-800 pl-6 hidden md:block">
            <span className="text-slate-500 block text-[10px]">DENSITY CORRECTION FACTOR</span>
            <span className="text-base font-bold text-slate-200 tabular-nums">
              {calc.factor.toFixed(4)}
            </span>
            <span className="text-slate-400 text-[10px] ml-1">(ρ / 1.025)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
