import React from 'react';
import { VESSEL_INFO } from '../data/hindshipData';
import { X, Ship, Award, Compass, Info, CheckCircle2 } from 'lucide-react';

interface VesselParticularsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VesselParticularsModal: React.FC<VesselParticularsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>MV HINDSHIP · General Particulars</span>
                <span className="text-slate-500 font-mono text-xs">·</span>
                <span className="text-xs text-cyan-400 font-mono">Official Ship's Stability Data</span>
              </h3>
              <p className="text-xs text-slate-400">
                Official moulded dimensions, tonnage registry, and hydrostatic particulars
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Creator Attribution Spotlight */}
          <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/30 rounded-xl p-5 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                    Lead Marine Developer & Computational Engineer
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Official Vessel Data Verified</span>
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {VESSEL_INFO.creator}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Computational naval architecture suite for <strong>MV HINDSHIP</strong> formulated by Hashith. 
                  All general particulars, hydrostatic tables (2.8m to 10.0m), and metacentric heights are powered directly by the official ship stability dataset.
                </p>
              </div>
            </div>
          </div>

          {/* Moulded Dimensions Grid */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Moulded Dimensions & Longitudinal Datums</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">LOA TO EXTREME POINT ON BULB</span>
                <span className="text-base font-bold font-mono text-white">{VESSEL_INFO.loaBulb.toFixed(3)} mts</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Length overall to bulb</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">LOA TO EXTREME POINT ON STEM</span>
                <span className="text-base font-bold font-mono text-white">{VESSEL_INFO.loaStem.toFixed(3)} mts</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Length overall to stem</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">LENGTH BETWEEN PERPENDICULARS (LBP)</span>
                <span className="text-base font-bold font-mono text-cyan-300">{VESSEL_INFO.lbp.toFixed(3)} mts</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Midships = {VESSEL_INFO.midships.toFixed(3)} mts fwd of AP</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">BREADTH MOULDED (BEAM)</span>
                <span className="text-base font-bold font-mono text-slate-200">{VESSEL_INFO.beam.toFixed(3)} mts</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Moulded width</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">DEPTH MOULDED TO UPPER DECK</span>
                <span className="text-base font-bold font-mono text-slate-200">{VESSEL_INFO.depthUpperDeck.toFixed(3)} mts</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Main deck depth</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">DEPTH MOULDED TO SECOND DECK</span>
                <span className="text-base font-bold font-mono text-slate-200">{VESSEL_INFO.depthSecondDeck.toFixed(3)} mts</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Tween / 2nd deck</span>
              </div>
            </div>
          </div>

          {/* Loadline, Coefficients & Deadweight Particulars */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Ship className="w-4 h-4 text-cyan-400" />
              <span>Loadline, Displacement & Tonnage</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">SUMMER LOAD DRAUGHT</span>
                <span className="text-base font-bold font-mono text-amber-400">{VESSEL_INFO.summerDraft.toFixed(3)} mts</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Design summer loadline</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">BLOCK COEFFICIENT (Cb)</span>
                <span className="text-base font-bold font-mono text-cyan-300">{VESSEL_INFO.blockCoefficient.toFixed(3)}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Hull form fullness factor</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">DISPLACEMENT (SUMMER DRAUGHT)</span>
                <span className="text-base font-bold font-mono text-emerald-400">{VESSEL_INFO.summerDisplacement.toLocaleString()} TONNES</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">In salt water (ρ = 1.025)</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">DEADWEIGHT (SUMMER)</span>
                <span className="text-base font-bold font-mono text-cyan-400">{VESSEL_INFO.summerDeadweight.toLocaleString()} TONNES</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Cargo, fuel, water & stores</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">LIGHTSHIP DISPLACEMENT</span>
                <span className="text-base font-bold font-mono text-slate-300">{VESSEL_INFO.lightshipDisplacement.toLocaleString()} TONNES</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Displacement - Deadweight</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">MAX SCANTLING DRAFT</span>
                <span className="text-base font-bold font-mono text-purple-400">{VESSEL_INFO.scantlingDraft.toFixed(2)} mts</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Max table limit (21,498 tonnes)</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">GROSS TONNAGE</span>
                <span className="text-base font-bold font-mono text-slate-200">{VESSEL_INFO.grossTonnage.toFixed(2)} TONS</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Enclosed ship volume</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">NET TONNAGE</span>
                <span className="text-base font-bold font-mono text-slate-200">{VESSEL_INFO.netTonnage.toFixed(2)} TONS</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Cargo capacity metric</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-mono">HYDROSTATIC RANGE</span>
                <span className="text-base font-bold font-mono text-cyan-300">2.80m – 10.00m</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">37 calibrated steps</span>
              </div>
            </div>
          </div>

          {/* Naval Architecture Symbols & Definitions Guide */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Hydrostatic Parameters Glossary</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800 flex items-start gap-2.5">
                <strong className="text-cyan-400 font-mono shrink-0 w-16">Δ (Disp):</strong>
                <span>Total mass of water displaced by hull in metric tonnes, scaled linearly with relative density factor (ρ / 1.025).</span>
              </div>
              <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800 flex items-start gap-2.5">
                <strong className="text-emerald-400 font-mono shrink-0 w-16">TPC:</strong>
                <span>Tonnes Per Centimetre immersion; cargo weight required to increase mean draft bodily by 1 cm.</span>
              </div>
              <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800 flex items-start gap-2.5">
                <strong className="text-amber-400 font-mono shrink-0 w-16">MCTC:</strong>
                <span>Moment to Change Trim by One Centimetre (t-m/cm); trimming moment required to change total trim by 1 cm.</span>
              </div>
              <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800 flex items-start gap-2.5">
                <strong className="text-sky-400 font-mono shrink-0 w-16">LCB:</strong>
                <span>Longitudinal Centre of Buoyancy in metres forward of the After Perpendicular (AP). Geometric center of underwater volume.</span>
              </div>
              <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800 flex items-start gap-2.5">
                <strong className="text-orange-400 font-mono shrink-0 w-16">LCF:</strong>
                <span>Longitudinal Centre of Flotation in metres forward of AP; tipping axis about which the vessel trims.</span>
              </div>
              <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800 flex items-start gap-2.5">
                <strong className="text-teal-400 font-mono shrink-0 w-16">VCB (KB):</strong>
                <span>Vertical Centre of Buoyancy in metres above the baseline/keel (K).</span>
              </div>
              <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800 flex items-start gap-2.5">
                <strong className="text-purple-400 font-mono shrink-0 w-16">KM_T / KM_L:</strong>
                <span>Transverse and Longitudinal Metacentric heights above Keel (K). At drafts 7.4m to 7.6m, KM_T attains its minimal plateau of 8.238m.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Engineered with mathematical precision by {VESSEL_INFO.creator}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
