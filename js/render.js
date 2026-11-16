import { formatMoney } from "./utils.js";
export function renderGuarding(list) {
  const grid = document.querySelector("#guardingGrid"); if (!grid) return;
  if (!list.length) { grid.innerHTML = `<p class="text-gray-500 col-span-full">No services match.</p>`; return; }
  grid.innerHTML = list.map(s => `<div class="card group ${s.popular ? "ring-2 ring-yellow-400 relative" : ""}"><img src="${s.image}" alt="${s.name}" loading="lazy" class="w-full h-44 object-cover group-hover:scale-105 transition"><div class="p-5 flex flex-col gap-2 flex-1">${s.popular ? `<span class="badge bg-yellow-400 text-gray-900 absolute top-3 right-3">MOST POPULAR</span>` : ""}<h3 class="text-xl font-bold">${s.name}</h3><p class="text-sm text-gray-600 dark:text-gray-300">${s.description}</p><p><span class="text-2xl font-extrabold">${formatMoney(s.price)}</span> <span class="text-sm">/ ${s.per}</span></p><p class="text-sm">Shifts: <strong>${s.shifts}</strong> • Min Guards: ${s.minGuards}</p><ul class="text-sm space-y-1">${s.features.map(f => `<li>✓ ${f}</li>`).join("")}</ul><div class="flex gap-2 mt-auto"><button class="calcGuardBtn btn-primary flex-1" data-id="${s.id}">Calculate</button><button class="quoteGuardBtn btn-gold flex-1" data-id="${s.id}">Get Quote</button></div></div></div>`).join("");
}
export function renderProducts(list) {
  const grid = document.querySelector("#productsGrid"); if (!grid) return;
  if (!list.length) { grid.innerHTML = `<p class="text-gray-500 col-span-full">No products match.</p>`; return; }
  grid.innerHTML = list.map(p => `<div class="card group"><img src="${p.image}" alt="${p.name}" loading="lazy" class="w-full h-44 object-cover group-hover:scale-105 transition"><div class="p-5 flex flex-col gap-2 flex-1"><span class="badge bg-slate-100 text-slate-800 w-fit">${p.category}</span><h3 class="text-xl font-bold">${p.name}</h3><p class="text-sm text-gray-600 dark:text-gray-300">${p.description}</p><p><span class="text-2xl font-extrabold">${formatMoney(p.installPrice)}</span> <span class="text-sm">${p.unit === "per 20m" ? "per 20m" : p.unit === "per sensor" ? "per sensor" : p.unit === "call-out" ? "call-out" : "once"}</span></p>${p.monthly ? `<p class="text-sm text-green-700 font-bold">+ ${formatMoney(p.monthly)} / month monitoring</p>` : ""}<ul class="text-sm space-y-1">${p.features.map(f => `<li>✓ ${f}</li>`).join("")}</ul><button class="productQuoteBtn btn-primary mt-auto" data-id="${p.id}">Request Install Quote</button></div></div>`).join("");
}
export function renderJobs(list) {
  const grid = document.querySelector("#jobsGrid"); if (!grid) return;
  if (!list.length) { grid.innerHTML = `<p class="text-gray-500 col-span-full">No jobs match.</p>`; return; }
  grid.innerHTML = list.map(j => `<div class="card p-5 gap-2"><div class="flex justify-between"><h3 class="text-xl font-bold">${j.title}</h3><span class="badge bg-blue-100 text-blue-800">${j.type}</span></div><p class="text-sm">${j.location} • ${j.shifts}</p><p class="font-bold text-green-700">${j.salary}</p><ul class="text-sm space-y-1">${j.requirements.map(r => `<li>✓ ${r}</li>`).join("")}</ul><button class="applyJobBtn btn-gold mt-auto" data-id="${j.id}">Apply For This Role</button></div>`).join("");
}
export function renderTestimonials(list) {
  const grid = document.querySelector("#testimonialGrid"); if (!grid) return;
  grid.innerHTML = list.map(t => `<div class="card p-5 gap-2"><p class="text-amber-400">${"⭐".repeat(t.rating)}</p><p class="italic text-sm">"${t.text}"</p><p><strong>${t.name}</strong></p><p class="text-xs text-gray-500">${t.business} • ${t.service}</p></div>`).join("");
}
export function renderFAQs(list) {
  const wrap = document.querySelector("#faqList"); if (!wrap) return;
  wrap.innerHTML = list.map((f, i) => `<details class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" ${i === 0 ? "open" : ""}><summary class="font-bold cursor-pointer">${f.q}</summary><p class="text-sm mt-2 text-gray-600 dark:text-gray-300">${f.a}</p></details>`).join("");
}
