import { guardingServices, products, jobs, testimonials, faqs, areas, safetyTips } from "./data.js";
import { renderGuarding, renderProducts, renderJobs, renderTestimonials, renderFAQs } from "./render.js";
import { formatMoney, calculateGuardingTotal, calculateFenceTotal, calculateFenceSections, calculateRecruitmentScore, generateRef } from "./utils.js";
import { getRequests, saveRequest, deleteRequest, clearRequests } from "./inquiries.js";

renderGuarding(guardingServices); renderProducts(products); renderJobs(jobs); renderTestimonials(testimonials); renderFAQs(faqs);
let guardingDraftTotal = 0; let guardingDraftText = "";
let selectedProductId = null;

// Dark mode
const darkBtn = document.querySelector("#darkModeBtn");
if (localStorage.getItem("shieldGuardTheme") === "dark") document.documentElement.classList.add("dark");
darkBtn.addEventListener("click", () => { const d = document.documentElement.classList.toggle("dark"); localStorage.setItem("shieldGuardTheme", d ? "dark" : "light"); darkBtn.textContent = d ? "☀️ Light" : "🌙 Dark"; });

// Weather + Tips
async function loadWeather() { const el = document.querySelector("#weatherWidget"); if (!el) return; try { const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-17.8252&longitude=31.0335&current=temperature_2m&timezone=Africa%2FHarare"); const d = await r.json(); el.textContent = `Harare now: ${d.current.temperature_2m}°C - Control Room Open 24/7`; } catch { el.textContent = "Harare weather unavailable - Control Room Open 24/7"; } }
loadWeather();
function showTip() { const t = safetyTips[Math.floor(Math.random() * safetyTips.length)]; document.querySelector("#safetyTipWidget").innerHTML = `Safety Tip: ${t} - <button id="newTipBtn" class="underline font-bold">New Tip ↻</button>`; document.querySelector("#newTipBtn").addEventListener("click", showTip); }
showTip();

// Filters - Guarding
let t1; document.querySelector("#guardSearch").addEventListener("input", (e) => { clearTimeout(t1); t1 = setTimeout(() => applyGuardFilters(), 300); });
document.querySelector("#guardFilterShift").addEventListener("change", applyGuardFilters);
function applyGuardFilters() { let f = [...guardingServices]; const q = document.querySelector("#guardSearch").value.toLowerCase().trim(); if (q) f = f.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)); const sh = document.querySelector("#guardFilterShift").value; if (sh !== "All") f = f.filter(s => s.shifts === sh || s.shifts.includes(sh)); renderGuarding(f); }

// Filters - Products
let t2; document.querySelector("#productSearch").addEventListener("input", () => { clearTimeout(t2); t2 = setTimeout(applyProductFilters, 300); });
document.querySelector("#productFilterCategory").addEventListener("change", applyProductFilters);
function applyProductFilters() { let f = [...products]; const q = document.querySelector("#productSearch").value.toLowerCase().trim(); if (q) f = f.filter(p => p.name.toLowerCase().includes(q)); const c = document.querySelector("#productFilterCategory").value; if (c !== "All") f = f.filter(p => p.category === c); renderProducts(f); }

// Filters - Jobs
function applyJobFilters() { let f = [...jobs]; const loc = document.querySelector("#jobFilterLocation").value; const typ = document.querySelector("#jobFilterType").value; if (loc !== "All") f = f.filter(j => j.location === loc); if (typ !== "All") f = f.filter(j => j.type === typ); renderJobs(f); }
document.querySelector("#jobFilterLocation").addEventListener("change", applyJobFilters);
document.querySelector("#jobFilterType").addEventListener("change", applyJobFilters);

// Guard Calculator
const calcForm = document.querySelector("#guardCalculatorForm");
const serviceSelect = document.querySelector('[name="serviceId"]');
serviceSelect.innerHTML = guardingServices.map(s => `<option value="${s.id}">${s.name} - ${formatMoney(s.price)} / ${s.per}</option>`).join("");
function updateCalc() {
  const d = Object.fromEntries(new FormData(calcForm));
  const service = guardingServices.find(s => s.id === Number(d.serviceId)); if (!service) return;
  // For Response/Event, guards logic differs - simplify: use guards field, if minGuards 0, force 1
  let guards = Number(d.guards) || 1;
  if (service.minGuards > 0 && guards < service.minGuards) guards = service.minGuards;
  const { base, discount, addonsTotal, total, savingText } = calculateGuardingTotal(service.price, guards, Number(d.months), { k9: !!d.k9, supervisor: !!d.supervisor, cctvMonitoring: !!d.cctvMonitoring });
  document.querySelector("#guardCalcResult").innerHTML = `${service.name} - ${guards} guard(s) x ${d.months} month(s)<br>Base: ${formatMoney(base)} • Discount: ${formatMoney(discount)} • Add-ons: ${formatMoney(addonsTotal)}<br><span class="text-xl">Total: ${formatMoney(total)}</span> • ${savingText}`;
  guardingDraftTotal = total; guardingDraftText = `${service.name} - ${guards} guard(s) - ${d.months} mo - ${formatMoney(total)}`;
}
calcForm.addEventListener("input", updateCalc); calcForm.addEventListener("change", updateCalc); updateCalc();
document.querySelector("#addGuardingToQuoteBtn").addEventListener("click", () => { document.querySelector("#quotePreview").textContent = `Quote preview: ${guardingDraftText} - Fill form below to send.`; document.querySelector("#quote").scrollIntoView({ behavior: "smooth" }); });

// Fence Calculator
document.querySelector("#fenceLength").addEventListener("input", (e) => { const len = Number(e.target.value); if (!len) { document.querySelector("#fenceResult").textContent = "Enter length to calculate"; return; } const total = calculateFenceTotal(len); const sections = calculateFenceSections(len); document.querySelector("#fenceResult").textContent = `${len}m = ${sections} x 20m sections = ${formatMoney(total)} installation`; });

// Apply Form
const applyForm = document.querySelector("#applyForm");
document.querySelector('[name="jobId"]').innerHTML = jobs.map(j => `<option value="${j.id}">${j.title} - ${j.location}</option>`).join("");
applyForm.addEventListener("submit", (e) => {
  e.preventDefault(); const err = document.querySelector("#applyError"); err.textContent = "";
  const d = Object.fromEntries(new FormData(applyForm));
  if (!d.fullName?.trim()) return err.textContent = "Full name required";
  if (!d.phone?.startsWith("07") || d.phone.length !== 10) return err.textContent = "Phone must start 07 and be 10 digits";
  if (!d.age || Number(d.age) < 16 || Number(d.age) > 70) return err.textContent = "Enter valid age";
  if (!d.idNumber || d.idNumber.length < 8) return err.textContent = "Enter valid National ID";
  const applicant = { age: Number(d.age), oLevels: Number(d.oLevels), exPolice: !!d.exPolice, psaCert: !!d.psaCert, heightCm: Number(d.heightCm), canRun: !!d.canRun, licence: !!d.licence, firstAid: !!d.firstAid, hasRecord: !!d.hasRecord };
  const { score, status, rejectReason } = calculateRecruitmentScore(applicant);
  const resultEl = document.querySelector("#applyResult");
  if (rejectReason) { resultEl.className = "p-3 rounded-lg bg-red-100 text-red-800 text-sm font-bold"; resultEl.textContent = `REJECTED: ${rejectReason}`; }
  else { resultEl.className = `p-3 rounded-lg text-sm font-bold ${score >= 70 ? "bg-green-100 text-green-800" : score >= 50 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`; resultEl.textContent = `Score: ${score}/100 - ${status}`; }
  if (rejectReason) return; // Do not save rejected? We still save for audit - save with status REJECTED
  const job = jobs.find(j => j.id === Number(d.jobId));
  const req = { id: generateRef(), type: "Application", planName: job?.title, fullName: d.fullName.trim(), phone: d.phone, total: 0, createdAt: new Date().toLocaleString(), status: `${status} (Score ${score})`, score };
  saveRequest(req); renderRequests(); updateCount(); alert(`Application submitted! Ref: ${req.id}\nScore: ${score} - ${status}\nWe will call you on ${d.phone}.`);
});

// Quote Form
document.querySelector("#quoteForm").addEventListener("submit", (e) => {
  e.preventDefault(); const err = document.querySelector("#quoteError"); err.textContent = "";
  const d = Object.fromEntries(new FormData(e.target));
  if (!d.clientName?.trim()) return err.textContent = "Name required";
  if (!d.clientPhone?.startsWith("07") || d.clientPhone.length !== 10) return err.textContent = "Phone must start 07 and be 10 digits";
  if (!d.message?.trim() && !guardingDraftTotal) return err.textContent = "Describe what you need or use calculator above";
  if (d.urgency.includes("Emergency")) alert("EMERGENCY: Call Control Room 0800 123 456 NOW. We also saved your request.");
  const areaObj = areas.find(a => a.name === d.area);
  const req = { id: generateRef(), type: "Quote", planName: `${d.serviceNeeded} - ${d.clientType} in ${d.area}`, fullName: d.clientName.trim(), phone: d.clientPhone, total: guardingDraftTotal, createdAt: new Date().toLocaleString(), status: `${d.urgency} - Response in ${areaObj ? areaObj.responseMins : 15} mins` };
  saveRequest(req); renderRequests(); updateCount(); alert(`Quote request sent! Ref: ${req.id}\n${guardingDraftText || d.message}\nWe will call you within 2 hours.`); e.target.reset();
});

// Panic Modal
const panicModal = document.querySelector("#panicModal");
function openPanic() { panicModal.classList.remove("hidden"); document.body.style.overflow = "hidden"; }
function closePanic() { panicModal.classList.add("hidden"); document.body.style.overflow = ""; }
document.querySelector("#panicBtn").addEventListener("click", openPanic);
document.querySelector("#panicBtnHero").addEventListener("click", openPanic);
document.querySelector("#closePanicBtn").addEventListener("click", closePanic);
panicModal.addEventListener("click", (e) => { if (e.target === panicModal) closePanic(); });
document.querySelector("#panicForm").addEventListener("submit", (e) => {
  e.preventDefault(); const d = Object.fromEntries(new FormData(e.target));
  if (!d.panicName?.trim()) return alert("Name required");
  if (!d.panicPhone?.startsWith("07") || d.panicPhone.length !== 10) return alert("Phone must start 07 and be 10 digits");
  if (!d.panicLocation?.trim()) return alert("Location required");
  const req = { id: generateRef(), type: "Emergency", planName: `${d.panicType} - ${d.panicLocation}`, fullName: d.panicName.trim(), phone: d.panicPhone, total: 0, createdAt: new Date().toLocaleString(), status: "Response Team Dispatched" };
  saveRequest(req); renderRequests(); updateCount(); alert(`Response team dispatched! Ref: ${req.id}\nStay safe. Call 0800 123 456 if in danger.`); e.target.reset(); closePanic();
});

// Product Modal
const productModal = document.querySelector("#productModal");
function openProduct(id) { const p = products.find(x => x.id === Number(id)); if (!p) return; selectedProductId = p.id; document.querySelector("#modalProductName").textContent = p.name; document.querySelector("#modalProductInfo").textContent = `${p.description} - ${formatMoney(p.installPrice)} ${p.unit} ${p.monthly ? `+ ${formatMoney(p.monthly)}/mo` : ""}`; productModal.classList.remove("hidden"); document.body.style.overflow = "hidden"; }
function closeProduct() { productModal.classList.add("hidden"); document.body.style.overflow = ""; }
document.querySelector("#closeProductBtn").addEventListener("click", closeProduct);
productModal.addEventListener("click", (e) => { if (e.target === productModal) closeProduct(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closePanic(); closeProduct(); } });
document.querySelector("#productQuoteForm").addEventListener("submit", (e) => {
  e.preventDefault(); const d = Object.fromEntries(new FormData(e.target));
  if (!d.prodName?.trim()) return alert("Name required");
  if (!d.prodPhone?.startsWith("07") || d.prodPhone.length !== 10) return alert("Phone must start 07 and be 10 digits");
  const p = products.find(x => x.id === Number(selectedProductId)); const qty = Number(d.prodQuantity) || 1;
  let total = p.installPrice * qty; if (p.category === "Fencing") total = calculateFenceTotal(qty); // qty = metres for fence
  const req = { id: generateRef(), type: "Quote", planName: `${p.name} x ${qty}`, fullName: d.prodName.trim(), phone: d.prodPhone, total, createdAt: new Date().toLocaleString(), status: "Installation Quote Requested" };
  saveRequest(req); renderRequests(); updateCount(); alert(`Installation quote: ${p.name} - Total ${formatMoney(total)} - Ref ${req.id}`); e.target.reset(); closeProduct();
});

// Delegation - Guarding, Products, Jobs
document.querySelector("#guardingGrid").addEventListener("click", (e) => {
  const calc = e.target.closest(".calcGuardBtn"); const quote = e.target.closest(".quoteGuardBtn");
  if (calc) { serviceSelect.value = calc.dataset.id; updateCalc(); document.querySelector("#calculator").scrollIntoView({ behavior: "smooth" }); }
  if (quote) { const s = guardingServices.find(x => x.id === Number(quote.dataset.id)); document.querySelector('[name="serviceNeeded"]').value = "Guarding"; document.querySelector("#quote").scrollIntoView({ behavior: "smooth" }); }
});
document.querySelector("#productsGrid").addEventListener("click", (e) => { const b = e.target.closest(".productQuoteBtn"); if (b) openProduct(b.dataset.id); });
document.querySelector("#jobsGrid").addEventListener("click", (e) => { const b = e.target.closest(".applyJobBtn"); if (!b) return; document.querySelector('[name="jobId"]').value = b.dataset.id; document.querySelector("#apply").scrollIntoView({ behavior: "smooth" }); });

// Requests
function renderRequests() {
  const list = document.querySelector("#requestsList"); const filter = document.querySelector("#requestFilter").value;
  let reqs = getRequests(); if (filter !== "All") reqs = reqs.filter(r => r.type === filter);
  if (!reqs.length) { list.innerHTML = `<p class="text-gray-500 col-span-full">No requests yet.</p>`; return; }
  list.innerHTML = reqs.map(r => `<div class="card p-5 gap-2"><div class="flex justify-between"><span class="badge ${r.type === "Emergency" ? "bg-red-100 text-red-800" : r.type === "Application" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}">${r.type}</span><span class="text-xs">${r.id}</span></div><h4 class="font-bold">${r.planName}</h4><p class="text-sm">${r.fullName} • ${r.phone}</p><p class="text-sm">${r.status}</p><p><strong>Total: ${formatMoney(r.total)}</strong></p><p class="text-xs text-gray-500">${r.createdAt}</p><button class="deleteReqBtn bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm mt-2" data-id="${r.id}">Delete</button></div>`).join("");
}
function updateCount() { document.querySelector("#requestCount").textContent = getRequests().length; }
renderRequests(); updateCount();
document.querySelector("#requestFilter").addEventListener("change", renderRequests);
document.querySelector("#requestsList").addEventListener("click", (e) => { const b = e.target.closest(".deleteReqBtn"); if (!b) return; if (!confirm("Delete?")) return; deleteRequest(b.dataset.id); renderRequests(); updateCount(); });
document.querySelector("#clearRequestsBtn").addEventListener("click", () => { if (!confirm("Clear all?")) return; clearRequests(); renderRequests(); updateCount(); });
document.querySelector("#myRequestsBtn").addEventListener("click", () => document.querySelector("#myRequests").scrollIntoView({ behavior: "smooth" }));

// Scroll Top
const scrollBtn = document.querySelector("#scrollTopBtn");
window.addEventListener("scroll", () => scrollBtn.classList.toggle("hidden", window.scrollY < 500));
scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
---
