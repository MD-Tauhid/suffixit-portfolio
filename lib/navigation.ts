export type NavigationChild = { label: string; href: string; icon: string; description: string };
export type NavigationItem = {
  id: string; label: string; href: string; sectionHash?: string;
  children?: NavigationChild[]; description?: string;
};

/** One menu source for desktop and mobile. */
export const navigation: NavigationItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  {
    id: "products", label: "Products", href: "/products", sectionHash: "#products",
    description: "Ready-made software for your people, customers and everyday operations.",
    children: [
      { label: "Payroll System", href: "/products/payroll-system", icon: "receipt", description: "Earnings, deductions and pay runs" },
      { label: "Provident Fund", href: "/products/provident-fund", icon: "landmark", description: "Employee fund records and reporting" },
      { label: "Suffix E-commerce", href: "/products/ecommerce", icon: "shopping-cart", description: "Products, customers and orders" },
      { label: "Rupantar ERP", href: "/products/rupantar-erp", icon: "layers", description: "Connected business operations" },
      { label: "Hotel Booking", href: "/products/hotel-booking", icon: "hotel", description: "Rooms, reservations and guests" },
      { label: "Field Force Management", href: "/products/field-force", icon: "compass", description: "Visits, tasks and field operations" },
      { label: "Interconnect Billing", href: "/products/interconnect-billing", icon: "radio-tower", description: "Telecom rating and billing workflows" },
      { label: "Rupantor Inventory", href: "/products/rupantor-inventory", icon: "store", description: "Warehouses, stock and inventory" },
      { label: "Rupantar HCM", href: "/products/rupantar-hcm", icon: "users", description: "People, attendance and payroll" },
      { label: "Smart POS & Billing", href: "/products/smart-pos", icon: "receipt", description: "Retail checkout and stock visibility" },
      { label: "Bulk SMS & Meeting", href: "/products/bulk-sms-meeting", icon: "message-square", description: "Business messaging and collaboration" },
    ],
  },
  {
    id: "iot", label: "IoT", href: "/services/iot-solutions", sectionHash: "#iot",
    description: "Connected industrial devices, remote telemetry and automated monitoring.",
    children: [
      { label: "Smart Transformer Monitoring", href: "/products/transformer-monitoring", icon: "monitor", description: "Real-time transformer telemetry & protection" },
      { label: "Industrial Energy Monitoring", href: "/services/industrial-energy-monitoring", icon: "bolt", description: "Power quality, load telemetry & billing" },
      { label: "Automation & IoT", href: "/services/iot-solutions", icon: "bot", description: "Smart hardware, sensors & telematics" },
    ],
  },
  {
    id: "services", label: "Services", href: "/services", sectionHash: "#services",
    description: "Software, systems and support. Find the expertise your business needs.",
    children: [
      { label: "Custom Software", href: "/services/custom-software", icon: "code", description: "Applications around your workflows" },
      { label: "Web & E-commerce", href: "/services/web-ecommerce", icon: "globe", description: "Websites, portals and online stores" },
      { label: "Mobile Apps", href: "/services/mobile-apps", icon: "smartphone", description: "Tools for customers and field teams" },
      { label: "Cloud & Hosting", href: "/services/cloud-hosting", icon: "cloud", description: "A home for your applications" },
      { label: "Storage & Backup", href: "/services/storage-backup", icon: "database", description: "Data protection and recovery planning" },
      { label: "ERP Consulting", href: "/services/erp-consulting", icon: "target", description: "Connect your business processes" },
      { label: "SEO & Growth", href: "/services/seo", icon: "megaphone", description: "Make your business easier to find" },
      { label: "Dedicated Teams", href: "/services/dedicated-teams", icon: "handshake", description: "Expertise that works with your team" },
      { label: "Learning Management", href: "/services/learning-management", icon: "monitor", description: "Learning and training workflows" },
      { label: "Video Conferencing", href: "/services/video-conferencing", icon: "video", description: "Bring people into the conversation" },
      { label: "System Integration", href: "/services/system-integration", icon: "layers", description: "Connect applications and systems" },
      { label: "Power & Cooling", href: "/services/power-cooling", icon: "settings", description: "IT environment requirements" },
      { label: "Hospital Management", href: "/services/hospital-management", icon: "building-2", description: "Hospital software requirements" },
      { label: "Bulk SMS", href: "/services/bulk-sms", icon: "message-square", description: "Business messaging requirements" },
      { label: "IT Infrastructure", href: "/services/it-infrastructure", icon: "cloud", description: "Networks, servers and support" },
      { label: "IT & OT Security", href: "/services/it-ot-security", icon: "shield-check", description: "Plan protection for your environment" },
    ],
  },
  { id: "career", label: "Career", href: "/career" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export function isNavigationActive(item: NavigationItem, pathname: string, hash: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  if (item.id === "home") return path === "/" && !navigation.some(other => other.sectionHash === hash && hash !== "");
  if (item.sectionHash && path === "/" && hash === item.sectionHash) return true;
  if (item.href.startsWith("/#")) return false;
  return path === item.href || path.startsWith(item.href + "/");
}
export function isChildActive(child: NavigationChild, pathname: string, hash: string): boolean {
  const [path, anchor] = child.href.split("#");
  return pathname === path && (!anchor || hash === "#" + anchor);
}
