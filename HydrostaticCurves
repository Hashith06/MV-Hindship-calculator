import React, { useState, useId } from 'react';
import { DRAFTS, COMPLETE_TABLE, CalculationResult } from '../data/hindshipData';
import { Activity, Check, Crosshair } from 'lucide-react';

interface HydrostaticCurvesProps {
  currentCalc: CalculationResult;
  onDraftSelect: (draft: number) => void;
}

interface CurveConfig {
  key: keyof typeof COMPLETE_TABLE[0];
  label: string;
  unit: string;
  color: string;
  min: number;
  max: number;
  defaultVisible: boolean;
  scaleNote?: string;
}

export const HydrostaticCurves: React.FC<HydrostaticCurvesProps> = ({ currentCalc, onDraftSelect }) => {
  const [activeCurves, setActiveCurves] = useState<Record<string, boolean>>({
    displacement: true,
    tpc: true,
    mctc: true,
    kmt: true,
    vcb: true,
    lcb: false,
    lcf: false,
  });

  const [hoverDraft, setHoverDraft] = useState<number | null>(null);

  const curveDefinitions: CurveConfig[] = [
    { key: 'displacement', label: 'Displacement (Δ)', unit: 't', color: '#06b6d4', min: 4000, max: 22000, defaultVisible: true, scaleNote: '4k - 22k t' },
    { key: 'tpc', label: 'TPC', unit: 't/cm', color: '#10b981', min: 20.0, max: 25.0, defaultVisible: true, scaleNote: '20 - 25 t/cm' },
    { key: 'mctc', label: 'MCTC', unit: 't-m/cm', color: '#f59e0b', min: 140, max: 230, defaultVisible: true, scaleNote: '140 - 230' },
    { key: 'kmt', label: 'KM(T)', unit: 'm', color: '#a855f7', min: 8.0, max: 12.5, defaultVisible: true, scaleNote: '8.0 - 12.5 m' },
    { key: 'vcb', label: 'VCB (KB)', unit: 'm', color: '#38bdf8', min: 1.0, max: 5.5, defaultVisible: true, scaleNote: '1.0 - 5.5 m' },
    { key: 'lcb', label: 'LCB fwd AP', unit: 'm', color: '#ec4899', min: 71.5, max: 73.5, defaultVisible: false, scaleNote: '71.5 - 73.5 m' },
    { key: 'lcf', label: 'LCF fwd AP', unit: 'm', color: '#f97316', min: 69.0, max: 73.5, defaultVisible: false, scaleNote: '69.0 - 73.5 m' },
  ];

  // SVG Coordinates
  // X: 0 to 100% normalized across curve scales
  // Y: Draft 2.8m (bottom) to 10.0m (top)
  const svgWidth = 800;
  const svgHeight = 360;
  const padding = { top: 25, right: 35, bottom: 35, left: 55 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const minDraft = 2.8;
  const maxDraft = 10.0;

  const getDraftY = (draft: number) => {
    const norm = (draft - minDraft) / (maxDraft - minDraft);
    // Draft 2.8 at bottom (y = max), draft 10.0 at top (y = min)
    return padding.top + (1 - norm) * plotHeight;
  };

  const getDraftFromY = (y: number) => {
    const clampedY = Math.max(padding.top, Math.min(padding.top + plotHeight, y));
    const norm = 1 - (clampedY - padding.top) / plotHeight;
    const d = minDraft + norm * (maxDraft - minDraft);
    return Math.round(d * 100) / 100;
  };

  const generatePath = (curve: CurveConfig) => {
    const points = COMPLETE_TABLE.map((row) => {
      const val = row[curve.key] as number;
      const xNorm = Math.max(0, Math.min(1, (val - curve.min) / (curve.max - curve.min)));
      const x = padding.left + xNorm * plotWidth;
      const y = getDraftY(row.draft);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return `M ${points.join(' L ')}`;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    // Map to SVG coordinates
    const scaleY = svgHeight / rect.height;
    const svgY = mouseY * scaleY;
    const d = getDraftFromY(svgY);
    setHoverDraft(d);
  };

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const scaleY = svgHeight / rect.height;
    const svgY = mouseY * scaleY;
    const d = getDraftFromY(svgY);
    onDraftSelect(d);
  };

  const activeDraft = hoverDraft !== null ? hoverDraft : currentCalc.draft;
  const activeY = getDraftY(activeDraft);

  const filterId = useId();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-slate-800 bg-slate-950/70">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <span>Hydrostatic Curves of Form</span>
              <span className="text-slate-500 font-mono text-xs">·</span>
              <span className="text-xs text-slate-400">Naval Architecture Particulars vs. Draft</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click anywhere on chart to set draft</span>
        </div>
      </div>

      {/* Curve Visibility Badges / Legend */}
      <div className="px-5 py-2.5 bg-slate-950/40 border-b border-slate-800/60 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-1">Active Curves:</span>
        {curveDefinitions.map((c) => {
          const isVisible = !!activeCurves[c.key];
          return (
            <button
              key={c.key}
              onClick={() => setActiveCurves((prev) => ({ ...prev, [c.key]: !prev[c.key] }))}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-mono transition-all border ${
                isVisible
                  ? 'bg-slate-800 text-slate-200 border-slate-600 shadow-sm'
                  : 'bg-slate-950/50 text-slate-500 border-slate-800/80 hover:text-slate-300'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-sm inline-block shrink-0"
                style={{ backgroundColor: isVisible ? c.color : '#475569' }}
              />
              <span className="font-sans font-medium">{c.label}</span>
              <span className="text-[10px] text-slate-400">({c.scaleNote})</span>
              {isVisible && <Check className="w-3 h-3 text-cyan-400 ml-0.5" />}
            </button>
          );
        })}
      </div>

      {/* Interactive SVG Chart Stage */}
      <div className="relative p-3 bg-slate-950/90 cursor-crosshair">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverDraft(null)}
          onClick={handleClick}
        >
          {/* Subtle horizontal grid lines for Draft */}
          {[3, 4, 5, 6, 7, 8, 9, 10].map((d) => {
            const y = getDraftY(d);
            return (
              <g key={d}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + plotWidth}
                  y2={y}
                  stroke="#334155"
                  strokeWidth="0.7"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 10}
                  y={y + 3}
                  className="text-[10px] font-mono fill-slate-400"
                  textAnchor="end"
                >
                  {d.toFixed(1)}m
                </text>
              </g>
            );
          })}

          {/* Left Y-Axis Label */}
          <text
            x={14}
            y={padding.top + plotHeight / 2}
            className="text-[10px] font-mono font-medium fill-slate-400 -rotate-90 origin-center"
            textAnchor="middle"
          >
            DRAFT (M)
          </text>

          {/* Baseline Y-Axis line */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + plotHeight}
            stroke="#475569"
            strokeWidth="1.5"
          />

          {/* Bottom X-Axis line */}
          <line
            x1={padding.left}
            y1={padding.top + plotHeight}
            x2={padding.left + plotWidth}
            y2={padding.top + plotHeight}
            stroke="#475569"
            strokeWidth="1.5"
          />

          {/* Render Active Curves */}
          {curveDefinitions.map((curve) => {
            if (!activeCurves[curve.key]) return null;
            return (
              <g key={curve.key} className="transition-opacity duration-200">
                <path
                  d={generatePath(curve)}
                  fill="none"
                  stroke={curve.color}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}

          {/* Active / Current Draft Horizontal Crosshair */}
          <line
            x1={padding.left}
            y1={activeY}
            x2={padding.left + plotWidth}
            y2={activeY}
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Draft Tag on Y Axis */}
          <rect
            x={padding.left - 48}
            y={activeY - 10}
            width="42"
            height="20"
            rx="3"
            fill="#0284c7"
          />
          <text
            x={padding.left - 27}
            y={activeY + 4}
            className="text-[10px] font-mono font-bold fill-white"
            textAnchor="middle"
          >
            {activeDraft.toFixed(2)}m
          </text>

          {/* Highlight Points on each active curve at this draft */}
          {curveDefinitions.map((curve) => {
            if (!activeCurves[curve.key]) return null;
            // Value at activeDraft
            const idx = Math.min(
              DRAFTS.length - 2,
              Math.max(0, Math.floor((activeDraft - minDraft) / 0.2))
            );
            const ratio = (activeDraft - DRAFTS[idx]) / (DRAFTS[idx + 1] - DRAFTS[idx]);
            const val1 = COMPLETE_TABLE[idx][curve.key] as number;
            const val2 = COMPLETE_TABLE[idx + 1][curve.key] as number;
            const interpolated = val1 + ratio * (val2 - val1);

            const xNorm = Math.max(0, Math.min(1, (interpolated - curve.min) / (curve.max - curve.min)));
            const ptX = padding.left + xNorm * plotWidth;

            return (
              <g key={curve.key}>
                <circle cx={ptX} cy={activeY} r="4.5" fill={curve.color} stroke="#ffffff" strokeWidth="1.5" />
              </g>
            );
          })}
        </svg>

        {/* Floating Monospace Readout Overlay */}
        <div className="absolute top-4 right-6 bg-slate-900/90 border border-slate-700/80 rounded-lg p-3 backdrop-blur-md shadow-lg text-xs font-mono">
          <div className="text-[11px] text-cyan-300 font-semibold mb-1.5 flex items-center justify-between gap-4">
            <span>DRAFT T = {activeDraft.toFixed(3)} m</span>
            <span className="text-[10px] text-slate-400 font-normal">SW ρ = 1.025</span>
          </div>
          <div className="space-y-1 text-slate-300">
            {curveDefinitions.map((curve) => {
              if (!activeCurves[curve.key]) return null;
              const idx = Math.min(
                DRAFTS.length - 2,
                Math.max(0, Math.floor((activeDraft - minDraft) / 0.2))
              );
              const ratio = (activeDraft - DRAFTS[idx]) / (DRAFTS[idx + 1] - DRAFTS[idx]);
              const val1 = COMPLETE_TABLE[idx][curve.key] as number;
              const val2 = COMPLETE_TABLE[idx + 1][curve.key] as number;
              const interpolated = val1 + ratio * (val2 - val1);

              return (
                <div key={curve.key} className="flex items-center justify-between gap-6 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: curve.color }} />
                    <span className="text-slate-400">{curve.label}:</span>
                  </span>
                  <span className="font-semibold text-white tabular-nums">
                    {interpolated.toFixed(curve.unit === 't' ? 1 : 2)} {curve.unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
