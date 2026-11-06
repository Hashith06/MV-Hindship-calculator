import React, { useState, useMemo } from 'react';
import { computeHydrostatics, VESSEL_INFO } from './data/hindshipData';
import { VesselCrossSection } from './components/VesselCrossSection';
import { HydrostaticResultsGrid } from './components/HydrostaticResultsGrid';
import { HydrostaticCurves } from './components/HydrostaticCurves';
import { TrimStabilityTools } from './components/TrimStabilityTools';
import { HydrostaticTableModal } from './components/HydrostaticTableModal';
import { VesselParticularsModal } from './components/VesselParticularsModal';
import { 
  Ship, 
  Droplets, 
  Layers, 
  FileSpreadsheet, 
  SlidersHorizontal, 
  RotateCcw, 
  Check, 
  AlertTriangle,
  Info,
  Award,
  Download
} from 'lucide-react';

export default function App() {
  // Primary operational inputs
  const [draftInput, setDraftInput] = useState<string>('7.89');
  const [densityInput, setDensityInput] = useState<string>('1.010');

  // Modals state
  const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
  const [isParticularsModalOpen, setIsParticularsModalOpen] = useState<boolean>(false);

  // Active section view mode for desktop and mobile navigation
  const [activeTab, setActiveTab] = useState<'calculator' | 'curves' | 'trim'>('calculator');

  // Parse numeric values with fallback clamping
  const draftNum = parseFloat(draftInput);
  const densityNum = parseFloat(densityInput);

  const isValidDraft = !isNaN(draftNum) && draftNum >= 2.8 && draftNum <= 10.0;
  const isValidDensity = !isNaN(densityNum) && densityNum >= 0.990 && densityNum <= 1.035;

  const validDraft = isValidDraft ? draftNum : (draftNum < 2.8 ? 2.8 : 10.0);
  const validDensity = isValidDensity ? densityNum : 1.025;

  // Memoized computation
  const calcResult = useMemo(() => {
    return computeHydrostatics(validDraft, validDensity);
  }, [validDraft, validDensity]);

  const handleDraftChange = (newDraft: number) => {
    setDraftInput(newDraft.toFixed(3));
  };

  const handleDensityChange = (newDensity: number) => {
    setDensityInput(newDensity.toFixed(3));
  };

  const handleResetDefaults = () => {
    setDraftInput('7.89');
    setDensityInput('1.010');
  };

  // Quick density presets
  const densityPresets = [
    { label: 'Fresh Water', value: 1.000, desc: 'Rivers & canals' },
    { label: 'Dock / Brackish', value: 1.010, desc: 'Estuaries' },
    { label: 'Standard Seawater', value: 1.025, desc: 'Open ocean' },
    { label: 'Red Sea Saline', value: 1.028, desc: 'High salinity' },
  ];

  // Quick draft presets
  const draftPresets = [
    { label: 'Lightship', value: 2.80 },
    { label: 'Ballast', value: 5.60 },
    { label: 'Part Laden', value: 7.20 },
    { label: 'Summer Draught', value: VESSEL_INFO.summerDraft },
    { label: 'Max Scantling', value: 10.00 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar adhering to §2 Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="flex items-center justify-between gap-8 px-6 lg:px-12 py-4 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
        {/* Zone 1: Single text element wordmark */}
        <a href="#overview" className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
            <Ship className="w-4 h-4" />
          </span>
          <span className="font-mono tracking-wider">MV HINDSHIP</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'calculator' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hydrostatic Console
          </button>
          <button
            onClick={() => setActiveTab('curves')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'curves' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Curves of Form
          </button>
          <button
            onClick={() => setActiveTab('trim')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'trim' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Trim & Stability Tools
          </button>
          <button
            onClick={() => setIsTableModalOpen(true)}
            className="whitespace-nowrap shrink-0 text-slate-400 hover:text-slate-200 transition-colors"
          >
            Baseline Table
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsParticularsModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-cyan-200 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5" />
            <span>General Particulars</span>
          </button>
        </div>
      </header>

      {/* Hero Header & Technical Authority Ribbon */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>Naval Architecture Hydrostatic Computing Suite</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Official Ship Stability Data</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              MV HINDSHIP Hydrostatic Calculator
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Precision vessel hydrostatic analyzer and dynamic stability model created by{' '}
              <button
                onClick={() => setIsParticularsModalOpen(true)}
                className="text-cyan-300 font-semibold underline decoration-cyan-500/50 hover:decoration-cyan-300 transition-colors"
              >
                {VESSEL_INFO.creator}
              </button>
              . Real-time interpolation across 37 draft states for displacement, metacentric heights, and trimming moments.
            </p>
          </div>

          {/* Quick Technical Particulars Strip */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl shrink-0">
            <div>
              <span className="text-slate-500 block text-[10px]">LENGTH (LBP)</span>
              <span className="text-slate-200 font-bold">{VESSEL_INFO.lbp.toFixed(3)} m</span>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <span className="text-slate-500 block text-[10px]">BEAM (B)</span>
              <span className="text-slate-200 font-bold">{VESSEL_INFO.beam.toFixed(3)} m</span>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <span className="text-slate-500 block text-[10px]">SUMMER DRAUGHT</span>
              <span className="text-cyan-400 font-bold">{VESSEL_INFO.summerDraft.toFixed(3)} m</span>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <span className="text-slate-500 block text-[10px]">BLOCK COEFF (Cb)</span>
              <span className="text-emerald-400 font-bold">{VESSEL_INFO.blockCoefficient.toFixed(3)}</span>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <span className="text-slate-500 block text-[10px]">DEADWEIGHT</span>
              <span className="text-purple-400 font-bold">{VESSEL_INFO.summerDeadweight.toLocaleString()} t</span>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <span className="text-slate-500 block text-[10px]">CREATOR</span>
              <span className="text-amber-400 font-bold">{VESSEL_INFO.creator}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-8">
        {/* Navigation Tabs (Mobile & Quick-Switch) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'calculator'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hydrostatic Parameters
            </button>
            <button
              onClick={() => setActiveTab('curves')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'curves'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Curves of Form (Charts)
            </button>
            <button
              onClick={() => setActiveTab('trim')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'trim'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Trim & Stability Tools
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTableModalOpen(true)}
              className="text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Inspect Table</span>
            </button>
          </div>
        </div>

        {/* Dynamic Hull Cross-Section Visualizer (Always visible or primary anchor) */}
        <VesselCrossSection
          calc={calcResult}
          onDraftChange={handleDraftChange}
        />

        {/* Operational Parameters Input Console */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  Hydrostatic Calibration Parameters
                </h3>
                <p className="text-xs text-slate-400">
                  Specify mean draft and observed water density for MV HINDSHIP
                </p>
              </div>
            </div>

            <button
              onClick={handleResetDefaults}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 hover:bg-slate-800 px-2 py-1 rounded transition-colors"
              title="Reset to sample inputs (Draft 7.89m, Density 1.010)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Draft Input Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <span>Mean Draft (m)</span>
                  <span className="text-[11px] font-mono text-cyan-400">Range: 2.80 – 10.00 m</span>
                </label>
                {!isValidDraft && (
                  <span className="text-[11px] font-medium text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Must be 2.80 to 10.00 m</span>
                  </span>
                )}
              </div>

              <div className="relative">
                <input
                  type="number"
                  step="0.001"
                  min="2.8"
                  max="10.0"
                  value={draftInput}
                  onChange={(e) => setDraftInput(e.target.value)}
                  placeholder="e.g. 7.89"
                  className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-slate-100 font-mono text-lg transition-colors focus:outline-none ${
                    isValidDraft ? 'border-slate-700 focus:border-cyan-500' : 'border-rose-500/60 focus:border-rose-500'
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400">
                  METRES
                </span>
              </div>

              {/* Draft Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {draftPresets.map((preset) => {
                  const isActive = Math.abs(draftNum - preset.value) < 0.05;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => handleDraftChange(preset.value)}
                      className={`px-2.5 py-1 text-xs rounded-md transition-all font-mono ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                          : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {preset.label} ({preset.value.toFixed(preset.value === 9.233 ? 3 : 2)}m)
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Density Input Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <span>Water Density (ρ)</span>
                  <span className="text-[11px] font-mono text-cyan-400">Range: 1.000 – 1.025 t/m³</span>
                </label>
                {!isValidDensity && (
                  <span className="text-[11px] font-medium text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Standard range 1.000 - 1.025</span>
                  </span>
                )}
              </div>

              <div className="relative">
                <input
                  type="number"
                  step="0.001"
                  min="0.990"
                  max="1.035"
                  value={densityInput}
                  onChange={(e) => setDensityInput(e.target.value)}
                  placeholder="e.g. 1.010"
                  className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-slate-100 font-mono text-lg transition-colors focus:outline-none ${
                    isValidDensity ? 'border-slate-700 focus:border-cyan-500' : 'border-rose-500/60 focus:border-rose-500'
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400">
                  t / m³
                </span>
              </div>

              {/* Density Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {densityPresets.map((preset) => {
                  const isActive = Math.abs(densityNum - preset.value) < 0.001;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => handleDensityChange(preset.value)}
                      className={`px-2.5 py-1 text-xs rounded-md transition-all font-mono ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                          : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {preset.label} ({preset.value.toFixed(3)})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tab 1: Primary Hydrostatic Results Grid */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <HydrostaticResultsGrid calc={calcResult} />
          </div>
        )}

        {/* Tab 2: Hydrostatic Curves of Form */}
        {activeTab === 'curves' && (
          <div className="space-y-6">
            <HydrostaticCurves
              currentCalc={calcResult}
              onDraftSelect={handleDraftChange}
            />
          </div>
        )}

        {/* Tab 3: Trim & Stability Operational Tools */}
        {activeTab === 'trim' && (
          <div className="space-y-6">
            <TrimStabilityTools
              currentDensity={validDensity}
              onApplyTrueDraft={handleDraftChange}
            />
          </div>
        )}

        {/* Creator Attribution Section in Viewport (§1.H Anti-slop) */}
        <section className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Hydrostatic Architecture by {VESSEL_INFO.creator}</span>
                <span className="text-slate-500 font-mono text-xs">·</span>
                <span className="text-xs text-cyan-400 font-normal">Original MV HINDSHIP Calculation Suite</span>
              </h4>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                Authored by {VESSEL_INFO.creator} for maritime stability computations, hydrostatic tables, and ship trim analysis. 
                All algorithms utilize true linear interpolation between 0.2m draft steps with continuous density correction factors.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsTableModalOpen(true)}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            >
              View Full Table
            </button>
            <button
              onClick={() => setIsParticularsModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors shadow-sm"
            >
              Full Specifications
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-6 lg:px-12 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">MV HINDSHIP Hydrostatics</span>
            <span aria-hidden="true">·</span>
            <span>Created by <strong className="text-white">{VESSEL_INFO.creator}</strong></span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Handysize Cargo Series</span>
            <span aria-hidden="true">·</span>
            <span>Salt Water (1.025 t/m³) & Fresh Water Allowances</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <HydrostaticTableModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        calc={calcResult}
        onSelectDraft={handleDraftChange}
      />

      <VesselParticularsModal
        isOpen={isParticularsModalOpen}
        onClose={() => setIsParticularsModalOpen(false)}
      />
    </div>
  );
}
