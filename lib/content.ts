/** Page copy, kept exactly as in the original index.html. */

export type Link = { label: string; href: string; icon?: string };

export const serviceMenu: Link[] = [
  { icon: "🌐", label: "Web & E-commerce", href: "#services" },
  { icon: "💻", label: "Custom Software", href: "#services" },
  { icon: "📱", label: "Mobile Apps", href: "#services" },
  { icon: "📡", label: "IoT Solutions", href: "#services" },
  { icon: "☁️", label: "Domain & Cloud Hosting", href: "#services" },
  { icon: "💾", label: "Storage & Backup", href: "#services" },
  { icon: "🎯", label: "ERP Consulting", href: "#services" },
  { icon: "📣", label: "SEO & Social Media", href: "#services" },
];

export const productMenu: Link[] = [
  { icon: "🧭", label: "Field Force (FFMS)", href: "#fieldforce" },
  { icon: "👥", label: "Rupantar HCM", href: "#products" },
  { icon: "🧩", label: "Rupantar ERP", href: "#products" },
  { icon: "🏦", label: "Provident Fund", href: "#products" },
  { icon: "🛒", label: "E-commerce", href: "#products" },
  { icon: "🧾", label: "Smart POS", href: "#products" },
  { icon: "🏨", label: "Hotel Booking", href: "#products" },
  { icon: "📡", label: "Interconnect Billing", href: "#products" },
  { icon: "💬", label: "Bulk SMS", href: "#products" },
  { icon: "🎥", label: "Web Meeting", href: "#products" },
];

export const mobileMenu: Link[] = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#why" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Field Force", href: "#fieldforce" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: 2017, suffix: "", label: "Building software since" },
  { value: 50, suffix: "+", label: "Professionals on the team" },
  { value: 10, suffix: "+", label: "Ready-made products" },
  { value: 20, suffix: "+", label: "Notable clients" },
];

export const whyPoints = [
  "Ready products and fully custom development under one roof",
  "Web, mobile, cloud hosting, storage and backup in one place",
  "A local team that understands how businesses in Bangladesh work",
  "Clear communication and long-term support after launch",
];

export type Card = { icon: string; bg: string; title: string; text: string; cta?: string; tags?: string[]; core?: boolean };

export const products: Card[] = [
  { icon: "🧭", bg: "#e2eefb", title: "Field Force Management (FFMS)", text: "Live tracking, attendance, visits, orders and reports for your field team, on web and mobile.", core: true },
  { icon: "👥", bg: "#e2eefb", title: "Rupantar HCM", text: "HR, payroll and employee data in one platform." },
  { icon: "🧩", bg: "#ebe4ff", title: "Rupantar ERP", text: "Inventory, sales orders, procurement, invoicing and accounting." },
  { icon: "🏦", bg: "#e2eefb", title: "Suffix Provident Fund", text: "Transparent provident fund management for organizations." },
  { icon: "🛒", bg: "#d6f5e8", title: "Suffix E-commerce", text: "A complete online store with orders, inventory and payments." },
  { icon: "🧾", bg: "#fff0d3", title: "Smart POS & Billing", text: "Fast checkout with stock tracking and clear sales reports." },
  { icon: "🏨", bg: "#ffeadf", title: "Hotel Booking System", text: "Rooms, reservations and guests, simply managed." },
  { icon: "📡", bg: "#e2eefb", title: "Interconnect Billing", text: "Accurate billing for telecom interconnect traffic." },
  { icon: "💬", bg: "#d6f5e8", title: "Bulk SMS & Web Meeting", text: "Reach customers by SMS and meet teams from anywhere." },
];

export const industries: Card[] = [
  { icon: "🏪", bg: "#e2eefb", title: "Retail & Distribution", text: "Manage outlets, orders and field teams.", tags: ["Field Force", "POS"] },
  { icon: "🏢", bg: "#dbe6ff", title: "Enterprise", text: "Run HR, payroll, finance and operations.", tags: ["Rupantar HCM", "ERP"] },
  { icon: "🏨", bg: "#fff0d3", title: "Hospitality", text: "Rooms, bookings and guests under control.", tags: ["Hotel Booking"] },
  { icon: "📡", bg: "#ebe4ff", title: "Telecom", text: "Accurate billing for interconnect traffic.", tags: ["Interconnect Billing"] },
  { icon: "🛍️", bg: "#d6f5e8", title: "E-commerce", text: "Sell online with orders and inventory.", tags: ["E-commerce", "Hosting"] },
  { icon: "🏦", bg: "#e2eefb", title: "Finance & HR", text: "Provident fund and payroll made transparent.", tags: ["Suffix PF", "Payroll"] },
  { icon: "📣", bg: "#dbe6ff", title: "Marketing & Comms", text: "Reach customers and meet teams anywhere.", tags: ["Bulk SMS", "Web Meeting"] },
  { icon: "🚀", bg: "#fff0d3", title: "Startups & SMEs", text: "Custom web and mobile apps, built fast.", tags: ["Custom Software", "Mobile"] },
];

export const services: Card[] = [
  { icon: "💻", bg: "#e2eefb", title: "Custom Software", text: "Business systems and web platforms built around your workflow." },
  { icon: "📱", bg: "#ebe4ff", title: "Mobile Apps", text: "Android and iOS applications with smooth, modern UX." },
  { icon: "🌐", bg: "#d6f5e8", title: "Web & E-commerce", text: "Fast websites and online stores that convert visitors." },
  { icon: "📡", bg: "#e2eefb", title: "IoT Solutions", text: "Connected devices and dashboards for smarter operations." },
  { icon: "☁️", bg: "#fff0d3", title: "Domain, Hosting & Cloud", text: "Reliable domain, hosting and cloud services." },
  { icon: "💾", bg: "#d6f5e8", title: "Storage & Backup", text: "Keep your data safe, backed up and recoverable." },
  { icon: "🎯", bg: "#ebe4ff", title: "ERP Consulting", text: "Expert guidance to choose, set up and grow your ERP." },
  { icon: "📣", bg: "#ffeadf", title: "SEO & Social Media", text: "Be found online and grow your audience." },
  { icon: "🤝", bg: "#e2eefb", title: "BPO & Freelancing", text: "Skilled people for outsourced and flexible work." },
];

export const models = [
  { n: "01", bg: "#e6f1fc", title: "Ready-made Products", text: "License proven products like Field Force, Rupantar HCM and ERP and go live quickly." },
  { n: "02", bg: "#e3ecff", title: "Custom Development", text: "Tell us your idea. We design and build web and mobile software around your workflow." },
  { n: "03", bg: "#dcf6ec", title: "Dedicated Team", text: "Extend your team with Suffix developers, designers and QA who work as part of your business." },
  { n: "04", bg: "#fff0d6", title: "Managed Hosting & Support", text: "Domain, cloud hosting, backup and long-term maintenance, handled for you." },
];

export const tech = ["Laravel", "PHP", "React", "Node.js", ".NET", "Flutter", "Android", "iOS", "MySQL", "PostgreSQL", "AWS", "Docker"];

export const steps = [
  { icon: "🔍", title: "Understand", items: ["Free discovery session", "Goals, users and workflow mapping", "Clear scope and estimate"] },
  { icon: "🎨", title: "Design", items: ["Wireframes and UI review", "Feedback before any code", "Brand-aligned interface"] },
  { icon: "⚙️", title: "Build", items: ["Agile sprints", "Regular demos and updates", "Testing at every step"] },
  { icon: "🚀", title: "Launch & Support", items: ["Smooth deployment", "Training for your team", "Ongoing maintenance"] },
];

export const faqs = [
  { q: "What does Suffix IT do?", a: "Suffix IT is a software and ICT solution company in Dhaka. We build ready products such as Field Force, Rupantar HCM and ERP, and develop custom web and mobile software." },
  { q: "Can I try Field Force before buying?", a: "Yes. Request a demo and our team will show you the web dashboard and mobile app with your own use case." },
  { q: "Do you build custom software?", a: "Yes. We build websites, mobile apps and business systems from scratch, or extend the products you already use." },
  { q: "Do you offer hosting and support after launch?", a: "Yes. We provide domain, cloud hosting, storage, backup and ongoing maintenance." },
];

export const certifications = [
  { heading: "Certifications", items: [["🛡️", "ISO 9001:2015", "Quality management"], ["🔐", "ISO 27001", "Information security"]] },
  { heading: "Memberships", items: [["🏛️", "BASIS", "Software & information services"], ["🛍️", "e-CAB", "E-commerce association"], ["💻", "BCS", "Bangladesh Computer Samity"]] },
  { heading: "Partnerships", items: [["☁️", "Cloud partner", "Hosting & infrastructure"], ["💬", "SMS & payment partner", "Gateways and telecom"]] },
];

export const footerColumns: { title: string; links: Link[] }[] = [
  { title: "Products", links: [{ label: "Field Force", href: "#fieldforce" }, { label: "Rupantar HCM", href: "#products" }, { label: "Rupantar ERP", href: "#products" }, { label: "E-commerce", href: "#products" }, { label: "Smart POS", href: "#products" }] },
  { title: "Services", links: [{ label: "Custom Software", href: "#services" }, { label: "Mobile Apps", href: "#services" }, { label: "IoT Solutions", href: "#services" }, { label: "Hosting & Cloud", href: "#services" }, { label: "SEO & Social", href: "#services" }] },
  { title: "Company", links: [{ label: "About Us", href: "#why" }, { label: "Clients", href: "#clients" }, { label: "How we work", href: "#process" }, { label: "FAQ", href: "#faq" }, { label: "Contact", href: "#contact" }] },
];

/** Social links are "#" placeholders in the original; real URLs are needed (see README). */
export const socials = [
  { glyph: "f", label: "Facebook", href: "#" },
  { glyph: "in", label: "LinkedIn", href: "#" },
  { glyph: "▶", label: "YouTube", href: "#" },
];

export const featureHeading = {
  eyebrow: "Core product",
  title: ["Field Force Management, ", "web and mobile", " in sync"],
  text: "Your office team watches everything on the web dashboard while field staff work from a simple mobile app.",
};
