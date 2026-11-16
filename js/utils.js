export const formatMoney = (n) => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export function calculateGuardingTotal(servicePrice, guards, months, addons = {}) {
  const base = servicePrice * Number(guards) * Number(months);
  let rate = 0, savingText = "No discount";
  if (Number(months) >= 12) { rate = 0.10; savingText = "You save 10% for 12 months!"; }
  else if (Number(months) >= 6) { rate = 0.05; savingText = "You save 5% for 6+ months!"; }
  const discount = base * rate;
  const addonRates = { k9: 150, supervisor: 50, cctvMonitoring: 30 };
  let addonsTotal = 0;
  if (addons.k9) addonsTotal += addonRates.k9 * Number(months);
  if (addons.supervisor) addonsTotal += addonRates.supervisor * Number(months);
  if (addons.cctvMonitoring) addonsTotal += addonRates.cctvMonitoring * Number(months);
  const total = base - discount + addonsTotal;
  return { base, discount, addonsTotal, total, savingText, rate };
}
export const calculateFenceTotal = (length) => Math.ceil(Number(length) / 20) * 450;
export const calculateFenceSections = (length) => Math.ceil(Number(length) / 20);
export function calculateRecruitmentScore(a) {
  if (Number(a.age) < 21) return { score: 0, status: "REJECTED", rejectReason: "Must be 21+ years." };
  if (Number(a.age) > 50) return { score: 0, status: "REJECTED", rejectReason: "Must be 50 or younger." };
  if (a.hasRecord) return { score: 0, status: "REJECTED", rejectReason: "Criminal record - cannot be guard." };
  let score = 0;
  if (Number(a.oLevels) >= 5) score += 20;
  if (a.exPolice) score += 20;
  if (a.psaCert) score += 15;
  if (Number(a.heightCm) >= 170) score += 15;
  else if (Number(a.heightCm) >= 165) score += 5;
  if (a.canRun) score += 10;
  if (a.licence) score += 10;
  if (a.firstAid) score += 10;
  let status = score >= 70 ? "HIGH - Interview Immediately" : score >= 50 ? "MEDIUM - Shortlist" : "LOW - Training Required";
  return { score, status, rejectReason: null };
}
export const getToday = () => new Date().toISOString().split("T")[0];
export const generateRef = () => `SG-${Date.now().toString().slice(-6)}`;
