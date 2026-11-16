export const guardingServices = [
  { id: 1, name: "Static Guard - Day", price: 350, per: "guard/month", minGuards: 1, shifts: "Day", description: "Gate, premises, access log. 06:00-18:00.", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600", popular: false, features: ["Access Control", "Daily Report", "Uniform + Radio"] },
  { id: 2, name: "Static Guard - Night", price: 420, per: "guard/month", minGuards: 1, shifts: "Night", description: "Night patrol, high vigilance. 18:00-06:00.", image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600", popular: false, features: ["Night Patrol", "Torch + Radio", "Alarm Check"] },
  { id: 3, name: "24 Hour Guard", price: 700, per: "guard/month", minGuards: 2, shifts: "Day+Night", description: "2 guards rotating, 24/7 cover. Most popular.", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600", popular: true, features: ["24/7 Cover", "2 Guards Rotating", "Supervisor Check"] },
  { id: 4, name: "Armed Response", price: 250, per: "site/month", minGuards: 0, shifts: "24/7", description: "Rapid response team, not stationed. 15 min Harare.", image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600", popular: false, features: ["15 Min Response", "Control Room Link", "Alarm Monitoring"] },
  { id: 5, name: "Event Security", price: 45, per: "guard/event", minGuards: 2, shifts: "Event", description: "Weddings, concerts, church events.", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600", popular: false, features: ["Crowd Control", "Gate Check", "VIP Escort"] },
  { id: 6, name: "Escort / VIP Protection", price: 80, per: "guard/day", minGuards: 1, shifts: "Day", description: "Cash, VIP, executives.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600", popular: false, features: ["Plain Clothes", "Driving", "Risk Assessment"] }
];
export const products = [
  { id: 1, name: "Electric Gate - Sliding", installPrice: 1200, monthly: 0, unit: "once", category: "Gates", description: "Motor, remote, battery backup.", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600", features: ["Motor + 2 Remotes", "Battery Backup", "1 Year Warranty"] },
  { id: 2, name: "Manual Gate - Steel", installPrice: 650, monthly: 0, unit: "once", category: "Gates", description: "Welded steel, lock, powder coat.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600", features: ["Heavy Steel", "Lock Included", "Painted"] },
  { id: 3, name: "Electric Fence", installPrice: 450, monthly: 0, unit: "per 20m", category: "Fencing", description: "Energizer, wires, alarm. Price per 20m.", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600", features: ["Energizer", "Alarm", "Warning Signs"] },
  { id: 4, name: "CCTV - 4 Cameras Kit", installPrice: 550, monthly: 20, unit: "once", category: "CCTV", description: "4 cameras, DVR, night vision.", image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=600", features: ["4 Cameras", "Night Vision", "App View"] },
  { id: 5, name: "CCTV - 8 Cameras Kit", installPrice: 950, monthly: 20, unit: "once", category: "CCTV", description: "8 cameras, DVR, app view.", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600", features: ["8 Cameras", "DVR 1TB", "App View"] },
  { id: 6, name: "Alarm System - House", installPrice: 380, monthly: 25, unit: "once", category: "Alarms", description: "Sensors, siren, control room link.", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600", features: ["Siren", "Control Room Link", "2 Sensors"] },
  { id: 7, name: "Motion Sensor", installPrice: 45, monthly: 0, unit: "per sensor", category: "Alarms", description: "Detects movement, triggers alarm.", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600", features: ["Pet Friendly", "Wireless"] },
  { id: 8, name: "Gate Motor Repair", installPrice: 80, monthly: 0, unit: "call-out", category: "Repairs", description: "Fix existing gate motor.", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600", features: ["Call-Out", "Diagnosis", "Parts Extra"] }
];
export const jobs = [
  { id: 1, title: "Static Guard - Day", location: "Harare", type: "Full-Time", salary: "$280 - $350 / month", requirements: ["5 O-Levels", "21-50 years", "Clean Record"], shifts: "06:00-18:00" },
  { id: 2, title: "Night Guard", location: "Harare", type: "Full-Time", salary: "$320 - $400 / month", requirements: ["5 O-Levels", "Fit", "Night Shift"], shifts: "18:00-06:00" },
  { id: 3, title: "Response Officer", location: "Harare", type: "Full-Time", salary: "$380 - $450 / month", requirements: ["Driving Licence", "Ex-Police Preferred", "PSA Cert"], shifts: "24/7 Rotating" },
  { id: 4, title: "Control Room Operator", location: "Harare", type: "Full-Time", salary: "$300 - $380 / month", requirements: ["Computer Literate", "Good English", "Night Shift"], shifts: "Rotating" },
  { id: 5, title: "K9 Handler", location: "Norton", type: "Full-Time", salary: "$350 - $420 / month", requirements: ["Dog Experience", "Fit", "No Fear of Dogs"], shifts: "Day / Night" },
  { id: 6, title: "Event Guard - Part Time", location: "Chitungwiza", type: "Part-Time", salary: "$45 / event", requirements: ["18+ Years", "Smart", "Available Weekends"], shifts: "Events" }
];
export const testimonials = [
  { name: "Mrs. Chigumba - Highlands Primary School", business: "School", text: "ShieldGuard guards are punctual, polite. Absent guard replaced in 1 hour.", rating: 5, service: "24 Hour Guard" },
  { name: "Mr. Moyo - Moyo Hardware, Msasa", business: "Shop", text: "Electric fence + CCTV stopped break-ins. Response team arrived in 12 mins.", rating: 5, service: "CCTV + Fence" },
  { name: "Pastor Nyathi - Grace Church", business: "Church", text: "Event security for 500 people, no issues. Professional.", rating: 5, service: "Event Security" },
  { name: "Mrs. Dube - Borrowdale House", business: "House", text: "Alarm + electric gate installed in 2 days. App view works.", rating: 4, service: "Alarm + Gate" }
];
export const faqs = [
  { q: "How fast is response?", a: "Harare: 15 mins average. Chitungwiza/Norton: 20-25 mins. Control room dispatches nearest team." },
  { q: "What if my guard is absent?", a: "We replace within 2 hours, free. You never pay for absent guard days." },
  { q: "Are guards vetted?", a: "Yes. Police clearance, PSA check, references, 2 weeks training." },
  { q: "Do you install for houses or only businesses?", a: "Both. Houses, schools, shops, warehouses, farms." },
  { q: "What is minimum contract?", a: "Guarding: 1 month. Installations: No contract, 1 year warranty." },
  { q: "Do you cover Chitungwiza / Norton?", a: "Yes. Harare, Chitungwiza, Norton, Ruwa, Borrowdale, Avondale." }
];
export const areas = [
  { name: "Harare CBD", responseMins: 12 },
  { name: "Borrowdale", responseMins: 15 },
  { name: "Avondale", responseMins: 15 },
  { name: "Chitungwiza", responseMins: 25 },
  { name: "Norton", responseMins: 25 },
  { name: "Ruwa", responseMins: 20 }
];
export const safetyTips = [
  "Lock gates at 18:00 and test alarm weekly.",
  "Never share gate code with strangers. Change code every 3 months.",
  "Trim trees near fence - thieves hide behind them.",
  "Keep outside lights on at night. Dark = easy target.",
  "If alarm triggers, stay inside and call control room 0800 123 456."
];
