/**
 * MV HINDSHIP Hydrostatic Dataset & Naval Architecture Calculations
 * Original Dataset & Computation Formulation by HASHITH
 */

export interface HydrostaticPoint {
  draft: number;       // Draft in metres (2.8m to 10.0m)
  displacement: number;// Displacement in salt water (1.025 t/m³) in metric tonnes
  tpc: number;         // Tonnes Per Centimetre immersion (t/cm)
  mctc: number;        // Moment to Change Trim 1cm (t-m/cm)
  lcb: number;         // Longitudinal Centre of Buoyancy forward of AP (m)
  lcf: number;         // Longitudinal Centre of Flotation forward of AP (m)
  vcb: number;         // Vertical Centre of Buoyancy above Base/Keel (m)
  kmt: number;         // Transverse Metacentre above Keel (m)
  kml: number;         // Longitudinal Metacentre above Keel (m)
}

export const STANDARD_SW_DENSITY = 1.025; // Salt Water (t/m³)
export const FRESH_WATER_DENSITY = 1.000; // Fresh Water (t/m³)

export const VESSEL_INFO = {
  name: "MV HINDSHIP",
  type: "Handysize Bulk Carrier / Multipurpose Cargo",
  creator: "HASHITH",
  loaBulb: 153.965, // Length overall to extreme point on bulb (mts)
  loaStem: 153.475, // Length overall to extreme point on stem (mts)
  loa: 153.965,     // Standard LOA (mts)
  lbp: 143.160,     // Length between perpendiculars (mts)
  midships: 71.580, // Midships position fwd of AP = LBP / 2 (mts)
  beam: 20.000,     // Breadth moulded (mts)
  depthUpperDeck: 11.818, // Depth moulded to upper deck (mts)
  depthSecondDeck: 8.819, // Depth moulded to second deck (mts)
  depth: 11.818,    // Moulded depth (mts)
  summerDraft: 9.233, // Summer load draught (mts)
  blockCoefficient: 0.722, // Block coefficient Cb
  summerDisplacement: 19617.0, // Displacement at summer load draught (tonnes)
  summerDeadweight: 14117.0,   // Deadweight at summer load draught (tonnes)
  lightshipDisplacement: 5500.0, // Lightship = 19617 - 14117 (tonnes)
  lightshipDraft: 2.80, // Baseline lightship draft (mts)
  grossTonnage: 10015.80, // Gross tonnage (tons)
  netTonnage: 5494.76,    // Net tonnage (tons)
  scantlingDraft: 10.00,  // Maximum scantling draft (mts)
  maxDisplacement: 21498.0, // Max displacement at 10.0m (tonnes)
  maxDeadweight: 21498.0 - 5500.0, // 15998 tonnes
};

export const DRAFTS: number[] = [
  2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0, 4.2, 4.4, 4.6,
  4.8, 5.0, 5.2, 5.4, 5.6, 5.8, 6.0, 6.2, 6.4, 6.6,
  6.8, 7.0, 7.2, 7.4, 7.6, 7.8, 8.0, 8.2, 8.4, 8.6,
  8.8, 9.0, 9.2, 9.4, 9.6, 9.8, 10.0
];

export const DISPLACEMENT_SW: number[] = [
  5063, 5478, 5897, 6320, 6746, 7174, 7605, 8038, 8473, 8910,
  9348, 9788, 10230, 10674, 11120, 11569, 12019, 12472, 12927, 13383,
  13840, 14299, 14761, 15226, 15693, 16161, 16635, 17116, 17598, 18081,
  18565, 19051, 19537, 20024, 20514, 21006, 21498
];

export const TPC_SW: number[] = [
  20.72, 20.90, 21.09, 21.24, 21.38, 21.50, 21.62, 21.72, 21.82,
  21.91, 21.99, 22.08, 22.16, 22.24, 22.32, 22.39, 22.47, 22.56,
  22.66, 22.75, 22.85, 22.95, 23.07, 23.19, 23.29, 23.41, 23.54,
  23.66, 23.78, 23.90, 24.02, 24.14, 24.26, 24.36, 24.46, 24.57, 24.69
];

export const MCTC_SW: number[] = [
  145.2, 148.0, 150.7, 153.2, 155.2, 157.1, 158.9, 160.7, 162.4,
  163.8, 165.4, 166.8, 168.2, 169.6, 171.0, 172.4, 174.0, 175.7,
  177.5, 179.3, 181.4, 183.8, 186.4, 189.0, 191.8, 194.6, 197.4,
  200.2, 203.1, 206.0, 209.0, 211.8, 214.5, 217.4, 220.0, 222.6, 225.0
];

export const LCB_DATA: number[] = [
  72.946, 72.958, 72.970, 72.981, 72.992, 73.000, 73.010, 73.014,
  73.017, 73.019, 73.018, 73.016, 73.013, 73.005, 72.992, 72.979,
  72.962, 72.941, 72.916, 72.889, 72.858, 72.821, 72.781, 72.737,
  72.690, 72.641, 72.588, 72.532, 72.473, 72.413, 72.351, 72.288,
  72.223, 72.159, 72.093, 72.027, 71.962
];

export const LCF_DATA: number[] = [
  73.117, 73.131, 73.145, 73.145, 73.145, 73.145, 73.131, 73.103,
  73.060, 73.017, 72.974, 72.917, 72.846, 72.761, 72.675, 72.590,
  72.476, 72.333, 72.176, 72.005, 71.806, 71.606, 71.393, 71.193,
  70.979, 70.780, 70.595, 70.409, 70.238, 70.067, 69.911, 69.768,
  69.611, 69.483, 69.355, 69.241, 69.127
];

export const VCB_DATA: number[] = [
  1.496, 1.604, 1.712, 1.822, 1.930, 2.038, 2.146, 2.256, 2.366,
  2.472, 2.576, 2.684, 2.788, 2.892, 2.998, 3.102, 3.204, 3.308,
  3.412, 3.516, 3.620, 3.724, 3.828, 3.934, 4.040, 4.144, 4.252,
  4.356, 4.460, 4.566, 4.674, 4.782, 4.892, 5.000, 5.108, 5.216, 5.324
];

// Exact 37 values matching the 37 draft increments (2.8m to 10.0m) from user's extracted MV Hindship data
export const KMT_DATA: number[] = [
  12.152, 11.674, 11.234, 10.834, 10.478, 10.154, 9.864, 9.610,
  9.386, 9.196, 9.032, 8.890, 8.770, 8.664, 8.578, 8.502,
  8.438, 8.384, 8.340, 8.304, 8.280, 8.258, 8.244, 8.238,
  8.238, 8.240, 8.250, 8.270, 8.292, 8.318, 8.352, 8.388, 8.428,
  8.468, 8.514, 8.562, 8.618
];

export const KML_DATA: number[] = [
  415.4, 391.3, 369.2, 349.5, 332.5, 317.0, 303.3, 290.1,
  278.4, 267.5, 257.3, 247.7, 238.8, 230.9, 223.3, 216.4,
  210.6, 205.0, 200.0, 195.8, 191.6, 188.0, 184.7, 181.7,
  178.9, 176.6, 174.1, 172.0, 170.2, 168.2, 166.3, 164.6,
  162.9, 161.1, 159.2, 157.4, 155.8
];

/**
 * Robust piecewise linear interpolation matching maritime hydrostatic tables
 */
export function interpolate(array: number[], d: number): number {
  const minDraft = DRAFTS[0];
  const maxDraft = DRAFTS[DRAFTS.length - 1];

  if (d <= minDraft) return array[0];
  if (d >= maxDraft) return array[array.length - 1];

  for (let i = 0; i < DRAFTS.length - 1; i++) {
    if (d >= DRAFTS[i] && d <= DRAFTS[i + 1]) {
      const ratio = (d - DRAFTS[i]) / (DRAFTS[i + 1] - DRAFTS[i]);
      const nextVal = array[i + 1] !== undefined ? array[i + 1] : array[i];
      return array[i] + ratio * (nextVal - array[i]);
    }
  }
  return array[array.length - 1];
}

export interface CalculationResult {
  draft: number;
  density: number;
  factor: number;
  displacement: number;     // tonnes
  deadweight: number;       // tonnes
  tpc: number;              // tonnes/cm
  mctc: number;             // t-m/cm
  lcb: number;              // m
  lcf: number;              // m
  vcb: number;              // m
  kmt: number;              // m
  kml: number;              // m
  bmt: number;              // transverse metacentric radius: KM_T - KB
  bml: number;              // longitudinal metacentric radius: KM_L - KB
  fwa: number;              // Fresh Water Allowance in cm: (Displacement) / (40 * TPC)
  dwa: number;              // Dock Water Allowance in cm: FWA * (1.025 - rho) / 0.025
  lowerIndex: number;
  upperIndex: number;
  intervalRatio: number;
}

export function computeHydrostatics(draft: number, density: number): CalculationResult {
  const clampedDraft = Math.max(2.8, Math.min(10.0, draft));
  const clampedDensity = Math.max(0.990, Math.min(1.035, density));
  const factor = clampedDensity / STANDARD_SW_DENSITY;

  // Find intervals
  let lowerIndex = 0;
  let upperIndex = 1;
  for (let i = 0; i < DRAFTS.length - 1; i++) {
    if (clampedDraft >= DRAFTS[i] && clampedDraft <= DRAFTS[i + 1]) {
      lowerIndex = i;
      upperIndex = i + 1;
      break;
    }
  }
  const intervalRatio = (clampedDraft - DRAFTS[lowerIndex]) / (DRAFTS[upperIndex] - DRAFTS[lowerIndex]);

  // Hydrostatic variables
  const disp = interpolate(DISPLACEMENT_SW, clampedDraft) * factor;
  const tpcVal = interpolate(TPC_SW, clampedDraft) * factor;
  const mctcVal = interpolate(MCTC_SW, clampedDraft) * factor;

  // Geometric coordinates (do not scale with density)
  const lcbVal = interpolate(LCB_DATA, clampedDraft);
  const lcfVal = interpolate(LCF_DATA, clampedDraft);
  const vcbVal = interpolate(VCB_DATA, clampedDraft);
  const kmtVal = interpolate(KMT_DATA, clampedDraft);
  const kmlVal = interpolate(KML_DATA, clampedDraft);

  // Derived stability values
  const bmtVal = Math.max(0, kmtVal - vcbVal);
  const bmlVal = Math.max(0, kmlVal - vcbVal);

  // Deadweight estimation (Displacement minus Lightship)
  const lightshipAtDensity = VESSEL_INFO.lightshipDisplacement * factor;
  const deadweightVal = Math.max(0, disp - lightshipAtDensity);

  // Fresh Water Allowance (FWA) = Displacement / (40 * TPC) in cm
  const fwaCm = tpcVal > 0 ? (disp / (40 * tpcVal)) : 0;
  // Dock Water Allowance (DWA) in cm
  const dwaCm = Math.max(0, fwaCm * ((STANDARD_SW_DENSITY - clampedDensity) / 0.025));

  return {
    draft: clampedDraft,
    density: clampedDensity,
    factor,
    displacement: disp,
    deadweight: deadweightVal,
    tpc: tpcVal,
    mctc: mctcVal,
    lcb: lcbVal,
    lcf: lcfVal,
    vcb: vcbVal,
    kmt: kmtVal,
    kml: kmlVal,
    bmt: bmtVal,
    bml: bmlVal,
    fwa: fwaCm,
    dwa: dwaCm,
    lowerIndex,
    upperIndex,
    intervalRatio,
  };
}

export const COMPLETE_TABLE: HydrostaticPoint[] = DRAFTS.map((draft, i) => ({
  draft,
  displacement: DISPLACEMENT_SW[i],
  tpc: TPC_SW[i],
  mctc: MCTC_SW[i],
  lcb: LCB_DATA[i],
  lcf: LCF_DATA[i],
  vcb: VCB_DATA[i],
  kmt: KMT_DATA[i],
  kml: KML_DATA[i],
}));
