const KEY = "shieldGuardRequests";
export function getRequests() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }
export function saveRequest(r) { const u = [...getRequests(), r]; localStorage.setItem(KEY, JSON.stringify(u)); return u; }
export function deleteRequest(id) { const u = getRequests().filter(x => x.id !== id); localStorage.setItem(KEY, JSON.stringify(u)); return u; }
export function clearRequests() { localStorage.removeItem(KEY); }
