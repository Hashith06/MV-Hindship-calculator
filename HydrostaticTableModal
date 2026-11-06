import React, { useState } from 'react';
import { COMPLETE_TABLE, CalculationResult, VESSEL_INFO } from '../data/hindshipData';
import { X, Download, Search, Check, FileSpreadsheet } from 'lucide-react';

interface HydrostaticTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  calc: CalculationResult;
  onSelectDraft: (draft: number) => void;
}

export const HydrostaticTableModal: React.FC<HydrostaticTableModalProps> = ({
  isOpen,
  onClose,
  calc,
  onSelectDraft,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const filteredData = COMPLETE_TABLE.filter((row) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      row.draft.toFixed(2).includes(query) ||
      row.displacement.toString().includes(query) ||
      row.tpc.toFixed(2).includes(query)
    );
  });

  const exportCSV = () => {
    const headers = ['Draft (m)', 'Displacement SW (t)', 'TPC (t/cm)', 'MCTC (t-m/cm)', 'LCB fwd AP (m)', 'LCF fwd AP (m)', 'VCB (m)', 'KM(T) (m)', 'KM(L) (m)'];
    const rows = COMPLETE_TABLE.map((r) => [
      r.draft.toFixed(2),
      r.displacement,
      r.tpc.toFixed(2),
      r.mctc.toFixed(1),
      r.lcb.toFixed(3),
      r.lcf.toFixed(3),
      r.vcb.toFixed(3),
      r.kmt.toFixed(3),
      r.kml.toFixed(1),
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MV_HINDSHIP_Hydrostatic_Table_${calc.draft.toFixed(2)}m.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>MV HINDSHIP Hydrostatic Particulars Table</span>
                <span className="text-slate-500 font-mono text-xs">·</span>
                <span className="text-xs font-mono text-cyan-400">Baseline SW (ρ = 1.025)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Official 37-Point Hydrostatic Scale · Formulated by {VESSEL_INFO.creator}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Active Interval Indicator */}
        <div className="px-6 py-3 bg-slate-950/40 border-b border-slate-800/60 flex flex-wrap items-center justify-between gap-4">
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Filter by draft or displacement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span>Current Interpolation Range:</span>
            <span className="text-cyan-400 font-bold">
              {COMPLETE_TABLE[calc.lowerIndex].draft.toFixed(2)}m – {COMPLETE_TABLE[calc.upperIndex].draft.toFixed(2)}m
            </span>
            <span className="text-slate-500">({(calc.intervalRatio * 100).toFixed(1)}% between interval)</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto p-6">
          <table className="w-full text-xs font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider sticky top-0 bg-slate-900 z-10">
                <th className="py-2.5 px-3">Draft (m)</th>
                <th className="py-2.5 px-3">Displacement (t)</th>
                <th className="py-2.5 px-3">TPC (t/cm)</th>
                <th className="py-2.5 px-3">MCTC (t-m)</th>
                <th className="py-2.5 px-3">LCB fwd AP (m)</th>
                <th className="py-2.5 px-3">LCF fwd AP (m)</th>
                <th className="py-2.5 px-3">VCB (KB) (m)</th>
                <th className="py-2.5 px-3">KM(T) (m)</th>
                <th className="py-2.5 px-3">KM(L) (m)</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredData.map((row) => {
                const isSelected = Math.abs(calc.draft - row.draft) < 0.001;
                const isInInterval = row.draft === COMPLETE_TABLE[calc.lowerIndex].draft || row.draft === COMPLETE_TABLE[calc.upperIndex].draft;

                return (
                  <tr
                    key={row.draft}
                    className={`transition-colors hover:bg-slate-800/60 ${
                      isSelected
                        ? 'bg-cyan-500/15 text-cyan-200 font-bold'
                        : isInInterval
                        ? 'bg-slate-800/30 text-slate-200'
                        : 'text-slate-300'
                    }`}
                  >
                    <td className="py-2 px-3 tabular-nums font-bold text-white">
                      {row.draft.toFixed(2)}
                    </td>
                    <td className="py-2 px-3 tabular-nums">{row.displacement.toLocaleString()}</td>
                    <td className="py-2 px-3 tabular-nums">{row.tpc.toFixed(2)}</td>
                    <td className="py-2 px-3 tabular-nums">{row.mctc.toFixed(1)}</td>
                    <td className="py-2 px-3 tabular-nums">{row.lcb.toFixed(3)}</td>
                    <td className="py-2 px-3 tabular-nums">{row.lcf.toFixed(3)}</td>
                    <td className="py-2 px-3 tabular-nums">{row.vcb.toFixed(3)}</td>
                    <td className="py-2 px-3 tabular-nums">{row.kmt.toFixed(3)}</td>
                    <td className="py-2 px-3 tabular-nums">{row.kml.toFixed(1)}</td>
                    <td className="py-2 px-3 text-right">
                      <button
                        onClick={() => {
                          onSelectDraft(row.draft);
                          onClose();
                        }}
                        className="px-2 py-1 text-[11px] font-sans font-medium text-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/10 rounded transition-colors"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <span>Table shows uncorrected salt water (SW = 1.025 t/m³) baseline values</span>
          <span className="font-semibold text-slate-300">Creator: {VESSEL_INFO.creator}</span>
        </div>
      </div>
    </div>
  );
};
