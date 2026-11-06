import React, { useState } from 'react';
import { CalculationResult, VESSEL_INFO } from '../data/hindshipData';
import { Eye, Sliders, Waves, Compass, ArrowDown, ArrowUp } from 'lucide-react';

interface VesselCrossSectionProps {
  calc: CalculationResult;
  onDraftChange: (newDraft: number) => void;
}

export const VesselCrossSection: React.FC<VesselCrossSectionProps> = ({ calc, onDraftChange }) => {
  const [viewMode, setViewMode] = useState<'profile' | 'midship'>('profile');
  const [showWaveMotion, setShowWaveMotion] = useState<boolean>(true);
  const [showStabilityPoints, setShowStabilityPoints] = useState<boolean>(true);

  // Hull geometry dimensions in SVG coordinate space
  // Draft ranges 2.8m to 10.0m; Hull depth is 13.4m
  const svgWidth = 840;
  const svgHeight = 280;

  // Midship & baseline positioning
  const baselineY = 220; // Keel K coordinate
  const deckY = 60;      // Main Deck coordinate (depth ~ 13.4m)
  const scaleMetersToPx = (baselineY - deckY) / VESSEL_INFO.depth; // ~11.94 px/m

  // Current waterline Y position
  const currentWaterlineY = baselineY - (calc.draft * scaleMetersToPx);

  // Buoyancy center VCB in pixels above baseline
  const vcbY = baselineY - (calc.vcb * scaleMetersToPx);
  // Metacentre KMT in pixels above baseline
  const kmtY = baselineY - (calc.kmt * scaleMetersToPx);

  // Longitudinal scaling for profile view:
  // AP (x = 80) to FP (x = 760). LBP = 146m -> ~4.65 px/m
  const apX = 100;
  const fpX = 740;
  const lbpPx = fpX - apX; // 640px
  const scaleLbpPx = lbpPx / VESSEL_INFO.lbp;

  // LCB & LCF positions in pixels from AP
  const lcbX = apX + (calc.lcb * scaleLbpPx);
  const lcfX = apX + (calc.lcf * scaleLbpPx);

  // Midships X position forward of AP: 71.580m
  const midshipX = apX + (VESSEL_INFO.midships * scaleLbpPx);

  // Quick preset clicks
  const presets = [
    { label: 'Lightship', draft: 2.80 },
    { label: 'Normal Ballast', draft: 5.60 },
    { label: 'Summer Draft', draft: VESSEL_INFO.summerDraft },
    { label: 'Max Scantling', draft: 10.00 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 border-b border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <span>Dynamic Hull Hydrostatic Model</span>
              <span className="text-slate-500 font-mono text-xs">·</span>
              <span className="text-cyan-400 font-mono text-xs tabular-nums">T = {calc.draft.toFixed(3)} m</span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive geometry for MV HINDSHIP · Baseline to Waterline visualization
            </p>
          </div>
        </div>

        {/* Controls bar */}
        <div className="flex items-center gap-2 text-xs">
          {/* View Mode Toggle */}
          <div className="flex items-center p-0.5 bg-slate-800 rounded-lg border border-slate-700/60">
            <button
              onClick={() => setViewMode('profile')}
              className={`px-3 py-1 font-medium rounded-md transition-colors ${
                viewMode === 'profile'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Profile View (LBP)
            </button>
            <button
              onClick={() => setViewMode('midship')}
              className={`px-3 py-1 font-medium rounded-md transition-colors ${
                viewMode === 'midship'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Midship Section
            </button>
          </div>

          {/* Toggle Waves */}
          <button
            onClick={() => setShowWaveMotion(!showWaveMotion)}
            title="Toggle water motion"
            className={`p-1.5 rounded-lg border transition-colors ${
              showWaveMotion
                ? 'bg-slate-800 border-cyan-500/40 text-cyan-400'
                : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Waves className="w-4 h-4" />
          </button>

          {/* Toggle Centers */}
          <button
            onClick={() => setShowStabilityPoints(!showStabilityPoints)}
            title="Toggle Hydrostatic Centers (B, F, M)"
            className={`p-1.5 rounded-lg border transition-colors ${
              showStabilityPoints
                ? 'bg-slate-800 border-cyan-500/40 text-cyan-400'
                : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Canvas Stage */}
      <div className="relative w-full h-[300px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-2 select-none overflow-hidden">
        {/* Subtle coordinate grid lines */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full max-h-[300px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Water gradient */}
            <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="hullGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <pattern id="cargoHoldPattern" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 0 16 L 16 0 M 0 0 L 16 16" fill="none" stroke="#475569" strokeWidth="0.5" strokeOpacity="0.3" />
            </pattern>
          </defs>

          {viewMode === 'profile' ? (
            /* =========================================================================
               PROFILE VIEW (Longitudinal LBP = 146m, Stem to Stern)
               ========================================================================= */
            <g id="vessel-profile">
              {/* Draft Scale on Stern and Stem */}
              <g className="text-[9px] font-mono fill-slate-400">
                {[3, 4, 5, 6, 7, 8, 9, 10].map((d) => {
                  const y = baselineY - d * scaleMetersToPx;
                  return (
                    <g key={d}>
                      <line x1={apX - 18} y1={y} x2={apX - 8} y2={y} stroke="#475569" strokeWidth="1" />
                      <text x={apX - 22} y={y + 3} textAnchor="end">{d}m</text>
                      <line x1={fpX + 8} y1={y} x2={fpX + 18} y2={y} stroke="#475569" strokeWidth="1" />
                      <text x={fpX + 22} y={y + 3} textAnchor="start">{d}m</text>
                    </g>
                  );
                })}
              </g>

              {/* Baseline (Keel K) Line */}
              <line
                x1={apX - 30}
                y1={baselineY}
                x2={fpX + 30}
                y2={baselineY}
                stroke="#64748b"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text x={apX - 35} y={baselineY + 4} className="text-[10px] font-mono fill-slate-400" textAnchor="end">
                BASELINE (K)
              </text>

              {/* After Perpendicular (AP) and Forward Perpendicular (FP) */}
              <line x1={apX} y1={40} x2={apX} y2={baselineY + 15} stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
              <text x={apX} y={35} className="text-[9px] font-mono fill-slate-400" textAnchor="middle">AP (x = 0m)</text>

              <line x1={fpX} y1={40} x2={fpX} y2={baselineY + 15} stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
              <text x={fpX} y={35} className="text-[9px] font-mono fill-slate-400" textAnchor="middle">FP ({VESSEL_INFO.lbp.toFixed(1)}m)</text>

              <line x1={midshipX} y1={45} x2={midshipX} y2={baselineY + 15} stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.6" />
              <text x={midshipX} y={40} className="text-[9px] font-mono fill-cyan-400" textAnchor="middle">MIDSHIPS ⨂ ({VESSEL_INFO.midships.toFixed(1)}m)</text>

              {/* Main Hull Shape (MV HINDSHIP Bulker Profile) */}
              {/* Stern counter, rudder, keel line, bulbous bow, forecastle */}
              <path
                d={`
                  M ${apX - 25} ${deckY + 15}
                  L ${apX} ${deckY + 8}
                  L ${midshipX} ${deckY}
                  L ${fpX - 20} ${deckY - 5}
                  L ${fpX} ${deckY - 12}
                  L ${fpX + 10} ${deckY}
                  Q ${fpX + 28} ${baselineY - 45} ${fpX + 15} ${baselineY - 15}
                  Q ${fpX + 5} ${baselineY} ${fpX - 15} ${baselineY}
                  L ${apX + 15} ${baselineY}
                  Q ${apX - 5} ${baselineY} ${apX - 10} ${baselineY - 25}
                  L ${apX - 25} ${baselineY - 35}
                  L ${apX - 35} ${deckY + 30}
                  Z
                `}
                fill="url(#hullGradient)"
                stroke="#64748b"
                strokeWidth="1.5"
              />

              {/* Superstructure & Bridge Deckhouse at Stern */}
              <path
                d={`
                  M ${apX - 10} ${deckY + 8}
                  L ${apX - 10} ${deckY - 45}
                  L ${apX + 45} ${deckY - 45}
                  L ${apX + 45} ${deckY + 4}
                  Z
                `}
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="1"
              />
              {/* Bridge Windows */}
              <rect x={apX - 6} y={deckY - 42} width="47" height="6" fill="#38bdf8" fillOpacity="0.4" />
              {/* Radar Mast & Funnel */}
              <line x1={apX + 8} y1={deckY - 45} x2={apX + 8} y2={deckY - 60} stroke="#94a3b8" strokeWidth="2" />
              <rect x={apX + 22} y={deckY - 40} width="14" height="22" fill="#ef4444" rx="2" />

              {/* Cargo Holds Hatch Coamings & Cranes */}
              {[1, 2, 3, 4, 5].map((hatch) => {
                const xPos = apX + 85 + (hatch - 1) * 98;
                return (
                  <g key={hatch}>
                    <rect x={xPos} y={deckY - 4} width="72" height="6" fill="#0f172a" stroke="#64748b" strokeWidth="1" rx="1" />
                    {/* Hold interior outline */}
                    <rect x={xPos + 4} y={deckY + 8} width="64" height="75" fill="url(#cargoHoldPattern)" stroke="#334155" strokeWidth="0.5" rx="2" />
                    <text x={xPos + 36} y={deckY + 45} className="text-[8px] font-mono fill-slate-500" textAnchor="middle">HOLD #{hatch}</text>
                  </g>
                );
              })}

              {/* Water Surface Line & Under-Water Volume Fill */}
              {/* We clip the hull under the current waterline */}
              <clipPath id="hullWaterClip">
                <path
                  d={`
                    M ${apX - 25} ${deckY + 15}
                    L ${apX} ${deckY + 8}
                    L ${midshipX} ${deckY}
                    L ${fpX - 20} ${deckY - 5}
                    L ${fpX} ${deckY - 12}
                    L ${fpX + 10} ${deckY}
                    Q ${fpX + 28} ${baselineY - 45} ${fpX + 15} ${baselineY - 15}
                    Q ${fpX + 5} ${baselineY} ${fpX - 15} ${baselineY}
                    L ${apX + 15} ${baselineY}
                    Q ${apX - 5} ${baselineY} ${apX - 10} ${baselineY - 25}
                    L ${apX - 25} ${baselineY - 35}
                    L ${apX - 35} ${deckY + 30}
                    Z
                  `}
                />
              </clipPath>

              {/* Submerged Hull Blue Fill */}
              <rect
                x={apX - 45}
                y={currentWaterlineY}
                width={svgWidth}
                height={baselineY - currentWaterlineY + 10}
                fill="url(#waterGradient)"
                clipPath="url(#hullWaterClip)"
              />

              {/* Sea Waterline across viewport */}
              <g id="waterline-profile">
                {showWaveMotion ? (
                  <path
                    d={`
                      M 20 ${currentWaterlineY}
                      Q 100 ${currentWaterlineY - 2.5} 180 ${currentWaterlineY}
                      T 340 ${currentWaterlineY}
                      T 500 ${currentWaterlineY}
                      T 660 ${currentWaterlineY}
                      T 820 ${currentWaterlineY}
                    `}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                ) : (
                  <line
                    x1="20"
                    y1={currentWaterlineY}
                    x2="820"
                    y2={currentWaterlineY}
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                )}
                {/* Waterline Label WL */}
                <rect x="25" y={currentWaterlineY - 10} width="68" height="20" rx="4" fill="#0369a1" />
                <text x="59" y={currentWaterlineY + 4} className="text-[10px] font-mono font-bold fill-white" textAnchor="middle">
                  WL {calc.draft.toFixed(2)}m
                </text>
              </g>

              {/* Hydrostatic Stability Points (B, F) */}
              {showStabilityPoints && (
                <g id="stability-points-profile">
                  {/* LCF Marker: Longitudinal Centre of Flotation (on the waterplane) */}
                  <line x1={lcfX} y1={currentWaterlineY - 14} x2={lcfX} y2={currentWaterlineY + 14} stroke="#f59e0b" strokeWidth="2" />
                  <circle cx={lcfX} cy={currentWaterlineY} r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x={lcfX - 35} y={currentWaterlineY - 32} width="70" height="16" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
                  <text x={lcfX} y={currentWaterlineY - 20} className="text-[9px] font-mono font-semibold fill-amber-300" textAnchor="middle">
                    LCF {calc.lcf.toFixed(2)}m
                  </text>

                  {/* LCB & VCB Marker: Longitudinal & Vertical Centre of Buoyancy */}
                  <line x1={lcbX} y1={vcbY - 10} x2={lcbX} y2={vcbY + 10} stroke="#10b981" strokeWidth="2" />
                  <line x1={lcbX - 10} y1={vcbY} x2={lcbX + 10} y2={vcbY} stroke="#10b981" strokeWidth="2" />
                  <circle cx={lcbX} cy={vcbY} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x={lcbX - 44} y={vcbY + 10} width="88" height="18" rx="3" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
                  <text x={lcbX} y={vcbY + 22} className="text-[8.5px] font-mono font-semibold fill-emerald-300" textAnchor="middle">
                    B (LCB {calc.lcb.toFixed(1)}m)
                  </text>
                </g>
              )}
            </g>
          ) : (
            /* =========================================================================
               MIDSHIP SECTION VIEW (Transverse Body Plan: K, B, G, M_T)
               ========================================================================= */
            <g id="midship-section" transform="translate(180, 0)">
              {/* Midship Centerline CL */}
              <line x1="240" y1="20" x2="240" y2={baselineY + 20} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
              <text x="240" y="15" className="text-[9px] font-mono fill-slate-400" textAnchor="middle">CENTERLINE (CL)</text>

              {/* Baseline Keel K */}
              <line x1="60" y1={baselineY} x2="420" y2={baselineY} stroke="#64748b" strokeWidth="1.5" />
              <text x="240" y={baselineY + 16} className="text-[10px] font-mono fill-slate-300" textAnchor="middle">KEEL BASELINE (K = 0.00m)</text>

              {/* Midship Hull Geometry (Breadth ~22.8m, Depth ~13.4m) */}
              {/* Breadth px: ~22.8 * scaleMetersToPx = ~270px; Half-breadth = 135px */}
              <path
                d={`
                  M 105 ${deckY}
                  L 105 ${baselineY - 30}
                  Q 105 ${baselineY} 135 ${baselineY}
                  L 345 ${baselineY}
                  Q 375 ${baselineY} 375 ${baselineY - 30}
                  L 375 ${deckY}
                  Z
                `}
                fill="url(#hullGradient)"
                stroke="#64748b"
                strokeWidth="2"
              />

              {/* Inner Double Bottom & Wing Tanks */}
              <path
                d={`
                  M 125 ${deckY + 15}
                  L 125 ${baselineY - 24}
                  L 355 ${baselineY - 24}
                  L 355 ${deckY + 15}
                  Z
                `}
                fill="#0f172a"
                stroke="#334155"
                strokeWidth="1"
              />
              <text x="240" y={deckY + 70} className="text-[11px] font-mono fill-slate-500" textAnchor="middle">
                CARGO HOLD MIDSHIPS (B = {VESSEL_INFO.beam.toFixed(1)}m, D = {VESSEL_INFO.depthUpperDeck.toFixed(1)}m)
              </text>

              {/* Under-Water Hull Fill */}
              <clipPath id="midshipHullClip">
                <path
                  d={`
                    M 105 ${deckY}
                    L 105 ${baselineY - 30}
                    Q 105 ${baselineY} 135 ${baselineY}
                    L 345 ${baselineY}
                    Q 375 ${baselineY} 375 ${baselineY - 30}
                    L 375 ${deckY}
                    Z
                  `}
                />
              </clipPath>
              <rect
                x="60"
                y={currentWaterlineY}
                width="360"
                height={baselineY - currentWaterlineY + 10}
                fill="url(#waterGradient)"
                clipPath="url(#midshipHullClip)"
              />

              {/* Waterline */}
              <line x1="50" y1={currentWaterlineY} x2="430" y2={currentWaterlineY} stroke="#38bdf8" strokeWidth="2.5" />
              <rect x="52" y={currentWaterlineY - 9} width="50" height="18" rx="3" fill="#0284c7" />
              <text x="77" y={currentWaterlineY + 4} className="text-[9px] font-mono font-bold fill-white" textAnchor="middle">
                WL {calc.draft.toFixed(2)}m
              </text>

              {/* Draft Marks Column */}
              <g className="text-[8.5px] font-mono fill-slate-400">
                {[3, 5, 7, 9].map((d) => {
                  const y = baselineY - d * scaleMetersToPx;
                  return (
                    <g key={d}>
                      <line x1="95" y1={y} x2="105" y2={y} stroke="#64748b" strokeWidth="1" />
                      <text x="90" y={y + 3} textAnchor="end">{d}m</text>
                    </g>
                  );
                })}
              </g>

              {/* Transverse Stability Points: K, B, M_T */}
              {showStabilityPoints && (
                <g id="stability-points-midship">
                  {/* Point K (Keel) */}
                  <circle cx="240" cy={baselineY} r="4" fill="#64748b" stroke="#ffffff" strokeWidth="1" />
                  <text x="254" y={baselineY - 4} className="text-[10px] font-mono font-bold fill-slate-200">K</text>

                  {/* Point B (Centre of Buoyancy - VCB) */}
                  <circle cx="240" cy={vcbY} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="240" y1={vcbY} x2="285" y2={vcbY} stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
                  <rect x="290" y={vcbY - 9} width="84" height="18" rx="3" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
                  <text x="332" y={vcbY + 3} className="text-[9px] font-mono font-bold fill-emerald-300" textAnchor="middle">
                    B (KB = {calc.vcb.toFixed(3)}m)
                  </text>

                  {/* Point M_T (Transverse Metacentre - KM_T) */}
                  {kmtY >= 20 && (
                    <>
                      <circle cx="240" cy={kmtY} r="5" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
                      <line x1="240" y1={kmtY} x2="285" y2={kmtY} stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 2" />
                      <rect x="290" y={kmtY - 9} width="92" height="18" rx="3" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1" />
                      <text x="336" y={kmtY + 3} className="text-[9px] font-mono font-bold fill-purple-300" textAnchor="middle">
                        M(T) (KM = {calc.kmt.toFixed(3)}m)
                      </text>
                    </>
                  )}

                  {/* Metacentric Radius BM_T dimension bracket */}
                  {kmtY >= 20 && vcbY > kmtY && (
                    <g className="opacity-75">
                      <line x1="220" y1={vcbY} x2="220" y2={kmtY} stroke="#a855f7" strokeWidth="1.5" />
                      <polygon points={`220,${kmtY} 217,${kmtY + 5} 223,${kmtY + 5}`} fill="#a855f7" />
                      <polygon points={`220,${vcbY} 217,${vcbY - 5} 223,${vcbY - 5}`} fill="#a855f7" />
                      <text x="210" y={(vcbY + kmtY) / 2 + 3} className="text-[9px] font-mono fill-purple-400" textAnchor="end">
                        BM_T {calc.bmt.toFixed(3)}m
                      </text>
                    </g>
                  )}
                </g>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* Quick Draft Scrubbing Bar */}
      <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-4">
        {/* Interactive Slider */}
        <div className="flex-1 min-w-[260px] flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 shrink-0">Draft Scrubber:</span>
          <input
            type="range"
            min="2.80"
            max="10.00"
            step="0.01"
            value={calc.draft}
            onChange={(e) => onDraftChange(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <span className="text-xs font-mono font-bold text-cyan-400 shrink-0 w-16 text-right tabular-nums">
            {calc.draft.toFixed(2)} m
          </span>
        </div>

        {/* Preset buttons */}
        <div className="flex items-center gap-1.5">
          {presets.map((p) => {
            const isActive = Math.abs(calc.draft - p.draft) < 0.05;
            return (
              <button
                key={p.label}
                onClick={() => onDraftChange(p.draft)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                {p.label} ({p.draft.toFixed(1)}m)
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
