import React, { useState } from 'react';
import { CalculationResult, computeHydrostatics, VESSEL_INFO } from '../data/hindshipData';
import { Scale, ArrowRight, ArrowDownUp, RefreshCw, Layers, PlusCircle, MinusCircle } from 'lucide-react';

interface TrimStabilityToolsProps {
  currentDensity: number;
  onApplyTrueDraft: (draft: number) => void;
}

export const TrimStabilityTools: React.FC<TrimStabilityToolsProps> = ({ currentDensity, onApplyTrueDraft }) => {
  const [activeTab, setActiveTab] = useState<'draftSurvey' | 'cargoSimulator'>('draftSurvey');

  // Draft survey inputs
  const [draftFwd, setDraftFwd] = useState<number>(6.50);
  const [draftAft, setDraftAft] = useState<number>(7.30);

  // Cargo simulator inputs
  const [cargoWeight, setCargoWeight] = useState<number>(850); // tonnes
  const [cargoOperation, setCargoOperation] = useState<'load' | 'discharge'>('load');
  const [holdLocation, setHoldLocation] = useState<number>(115.0); // distance from AP in metres (Hold 4/5)
  const [baseDraft, setBaseDraft] = useState<number>(6.80);

  // Standard Hold longitudinal centroids forward of AP
  const cargoLocations = [
    { name: 'After Peak Tank (APT)', x: 6.0 },
    { name: 'Cargo Hold #1 (Fwd)', x: 128.0 },
    { name: 'Cargo Hold #2', x: 104.0 },
    { name: 'Cargo Hold #3 (Mid)', x: 73.0 },
    { name: 'Cargo Hold #4', x: 48.0 },
    { name: 'Cargo Hold #5 (Aft)', x: 26.0 },
    { name: 'Fore Peak Tank (FPT)', x: 142.0 },
  ];

  // 1. DRAFT SURVEY CALCULATIONS
  const apparentMeanDraft = (draftFwd + draftAft) / 2;
  const trim = draftAft - draftFwd; // positive = trim by stern, negative = trim by head
  const isByStern = trim >= 0;
  const trimAbs = Math.abs(trim);

  // Compute hydrostatics at apparent mean draft
  const initialHydro = computeHydrostatics(apparentMeanDraft, currentDensity);

  // LCF correction to draft: Trim * (LCF - Midship) / LBP
  // Midship = 71.580m, LBP = 143.160m
  const midshipDist = VESSEL_INFO.midships; // 71.580m
  const lcfDistFromMid = initialHydro.lcf - midshipDist;
  const lcfCorrection = (trim * lcfDistFromMid) / VESSEL_INFO.lbp;
  const trueMeanDraft = Math.max(2.8, Math.min(10.0, apparentMeanDraft + lcfCorrection));

  // True Hydrostatics at True Mean Draft
  const trueHydro = computeHydrostatics(trueMeanDraft, currentDensity);

  // Trim angle in degrees
  const trimAngleDeg = (Math.atan(trim / VESSEL_INFO.lbp) * 180) / Math.PI;

  // 2. CARGO WEIGHT SINKAGE & TRIM CALCULATIONS
  const baseHydro = computeHydrostatics(baseDraft, currentDensity);
  const signedWeight = cargoOperation === 'load' ? cargoWeight : -cargoWeight;

  // Bodily sinkage in cm: W / TPC
  const bodilySinkageCm = baseHydro.tpc > 0 ? signedWeight / baseHydro.tpc : 0;
  const bodilySinkageM = bodilySinkageCm / 100;

  // Trimming moment in tonne-metres: W * (x - LCF)
  // When loading forward of LCF (x > LCF), moment trims ship by head (increases forward draft)
  const trimmingArm = holdLocation - baseHydro.lcf;
  const trimmingMoment = signedWeight * trimmingArm;

  // Total change of trim in cm: Trimming Moment / MCTC
  const changeOfTrimCm = baseHydro.mctc > 0 ? trimmingMoment / baseHydro.mctc : 0;
  const changeOfTrimM = changeOfTrimCm / 100;

  // Change of draft forward and aft
  // delta_T_aft = bodilySinkage - changeOfTrim * (LCF / LBP)
  // delta_T_fwd = bodilySinkage + changeOfTrim * ((LBP - LCF) / LBP)
  const deltaAftM = bodilySinkageM - changeOfTrimM * (baseHydro.lcf / VESSEL_INFO.lbp);
  const deltaFwdM = bodilySinkageM + changeOfTrimM * ((VESSEL_INFO.lbp - baseHydro.lcf) / VESSEL_INFO.lbp);

  const newDraftAft = Math.max(2.8, Math.min(10.0, baseDraft + deltaAftM));
  const newDraftFwd = Math.max(2.8, Math.min(10.0, baseDraft + deltaFwdM));
  const newMeanDraft = (newDraftAft + newDraftFwd) / 2;
  const newHydro = computeHydrostatics(newMeanDraft, currentDensity);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 border-b border-slate-800 bg-slate-950/70">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              Maritime Trim & Stability Operational Tools
            </h3>
            <p className="text-xs text-slate-400">
              Naval architecture formulations for cargo operations on MV HINDSHIP
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center p-0.5 bg-slate-800 rounded-lg border border-slate-700/60 text-xs">
          <button
            onClick={() => setActiveTab('draftSurvey')}
            className={`px-3 py-1 font-medium rounded-md transition-colors ${
              activeTab === 'draftSurvey'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Draft Survey & LCF Correction
          </button>
          <button
            onClick={() => setActiveTab('cargoSimulator')}
            className={`px-3 py-1 font-medium rounded-md transition-colors ${
              activeTab === 'cargoSimulator'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cargo Bodily Sinkage & Trim
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === 'draftSurvey' ? (
          /* TAB 1: DRAFT SURVEY & LCF CORRECTION */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Draft Forward Input */}
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Forward Draft (T_F)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    min="2.8"
                    max="10.0"
                    value={draftFwd}
                    onChange={(e) => setDraftFwd(parseFloat(e.target.value) || 2.8)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-base focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-xs font-mono text-slate-400">m</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-2">
                  Draft read at Forward Perpendicular (FP)
                </span>
              </div>

              {/* Draft Aft Input */}
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Aft Draft (T_A)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    min="2.8"
                    max="10.0"
                    value={draftAft}
                    onChange={(e) => setDraftAft(parseFloat(e.target.value) || 2.8)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-base focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-xs font-mono text-slate-400">m</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-2">
                  Draft read at After Perpendicular (AP)
                </span>
              </div>

              {/* Computed Trim State Card */}
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 block mb-1">TOTAL VESSEL TRIM</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-mono font-bold text-amber-400 tabular-nums">
                      {trimAbs.toFixed(3)} m
                    </span>
                    <span className="text-xs font-semibold text-slate-300 uppercase">
                      {trim === 0 ? 'Even Keel' : isByStern ? 'By Stern' : 'By Head'}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                  Trim Angle: {Math.abs(trimAngleDeg).toFixed(3)}° · LBP: {VESSEL_INFO.lbp.toFixed(3)} m
                </div>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[11px] text-slate-400 block mb-1">APPARENT MEAN DRAFT</span>
                <span className="text-lg font-mono font-bold text-slate-200 tabular-nums">
                  {apparentMeanDraft.toFixed(3)} m
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">(T_F + T_A) / 2</span>
              </div>

              <div className="bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[11px] text-slate-400 block mb-1">LCF POSITION</span>
                <span className="text-lg font-mono font-bold text-slate-200 tabular-nums">
                  {initialHydro.lcf.toFixed(3)} m
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  {lcfDistFromMid >= 0 ? `+${lcfDistFromMid.toFixed(3)}m Fwd ⨂` : `${lcfDistFromMid.toFixed(3)}m Aft ⨂`}
                </span>
              </div>

              <div className="bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[11px] text-slate-400 block mb-1">LCF TRIM CORRECTION</span>
                <span className="text-lg font-mono font-bold text-cyan-400 tabular-nums">
                  {lcfCorrection >= 0 ? `+${lcfCorrection.toFixed(4)}` : lcfCorrection.toFixed(4)} m
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">Trim × (LCF - {VESSEL_INFO.midships.toFixed(2)}) / {VESSEL_INFO.lbp.toFixed(2)}</span>
              </div>

              <div className="bg-cyan-950/30 border border-cyan-800/50 p-3.5 rounded-lg flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-cyan-300 block mb-1 font-medium">TRUE MEAN DRAFT</span>
                  <span className="text-xl font-mono font-bold text-cyan-300 tabular-nums">
                    {trueMeanDraft.toFixed(3)} m
                  </span>
                </div>
                <button
                  onClick={() => onApplyTrueDraft(trueMeanDraft)}
                  className="mt-2 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 py-1 px-2.5 rounded transition-colors flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Sync Main Calculator</span>
                </button>
              </div>
            </div>

            {/* True Hydrostatic Results Card */}
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-200">
                  Hydrostatic State at True Mean Draft ({trueMeanDraft.toFixed(3)} m)
                </span>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span>Displacement: <strong className="text-slate-100 font-mono">{trueHydro.displacement.toFixed(1)} t</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Deadweight: <strong className="text-slate-100 font-mono">{trueHydro.deadweight.toFixed(1)} t</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>TPC: <strong className="text-slate-100 font-mono">{trueHydro.tpc.toFixed(2)}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>MCTC: <strong className="text-slate-100 font-mono">{trueHydro.mctc.toFixed(2)}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">
                  LCB: {trueHydro.lcb.toFixed(3)}m · KM_T: {trueHydro.kmt.toFixed(3)}m
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: CARGO BODILY SINKAGE & TRIM SIMULATOR */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Base Draft */}
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Initial Even Keel Draft
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    min="2.8"
                    max="10.0"
                    value={baseDraft}
                    onChange={(e) => setBaseDraft(parseFloat(e.target.value) || 2.8)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-base focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-xs font-mono text-slate-400">m</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-2">
                  Displacement: {baseHydro.displacement.toFixed(0)} t
                </span>
              </div>

              {/* Load / Discharge Operation */}
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Cargo Operation
                </label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    onClick={() => setCargoOperation('load')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-center gap-1.5 ${
                      cargoOperation === 'load'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Load</span>
                  </button>
                  <button
                    onClick={() => setCargoOperation('discharge')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-center gap-1.5 ${
                      cargoOperation === 'discharge'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <MinusCircle className="w-3.5 h-3.5" />
                    <span>Discharge</span>
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 block mt-2">
                  {cargoOperation === 'load' ? 'Increases displacement' : 'Decreases displacement'}
                </span>
              </div>

              {/* Cargo Weight */}
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Cargo Quantity (Tonnes)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="10"
                    min="1"
                    max="15000"
                    value={cargoWeight}
                    onChange={(e) => setCargoWeight(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-base focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-xs font-mono text-slate-400">t</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-2">
                  TPC = {baseHydro.tpc.toFixed(2)} t/cm
                </span>
              </div>

              {/* Hold Location Preset */}
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Hold / Tank Location (Fwd AP)
                </label>
                <select
                  value={holdLocation}
                  onChange={(e) => setHoldLocation(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
                >
                  {cargoLocations.map((loc) => (
                    <option key={loc.name} value={loc.x}>
                      {loc.name} ({loc.x}m)
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-slate-400 block mt-2">
                  Trimming arm: {(holdLocation - baseHydro.lcf).toFixed(1)}m from LCF
                </span>
              </div>
            </div>

            {/* Results Output Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[11px] text-slate-400 block mb-1">PARALLEL SINKAGE / RISE</span>
                <span className="text-lg font-mono font-bold text-cyan-400 tabular-nums">
                  {bodilySinkageCm >= 0 ? `+${bodilySinkageCm.toFixed(1)}` : bodilySinkageCm.toFixed(1)} cm
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">δT = W / TPC</span>
              </div>

              <div className="bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[11px] text-slate-400 block mb-1">TOTAL CHANGE OF TRIM</span>
                <span className="text-lg font-mono font-bold text-amber-400 tabular-nums">
                  {Math.abs(changeOfTrimCm).toFixed(1)} cm
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  {changeOfTrimCm >= 0 ? 'Trim by Head' : 'Trim by Stern'}
                </span>
              </div>

              <div className="bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[11px] text-slate-400 block mb-1">NEW FORWARD DRAFT</span>
                <span className="text-lg font-mono font-bold text-slate-100 tabular-nums">
                  {newDraftFwd.toFixed(3)} m
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Change: {deltaFwdM >= 0 ? `+${deltaFwdM.toFixed(3)}` : deltaFwdM.toFixed(3)} m
                </span>
              </div>

              <div className="bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-lg">
                <span className="text-[11px] text-slate-400 block mb-1">NEW AFT DRAFT</span>
                <span className="text-lg font-mono font-bold text-slate-100 tabular-nums">
                  {newDraftAft.toFixed(3)} m
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Change: {deltaAftM >= 0 ? `+${deltaAftM.toFixed(3)}` : deltaAftM.toFixed(3)} m
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
