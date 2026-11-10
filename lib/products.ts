import type { ServiceKind } from "./services";
import type { ServiceTone } from "./service-palette";

export type Product = { slug: string; name: string; category: "ERP & people" | "Field & retail" | "Communication" | "Connected systems"; kind: ServiceKind; tone: ServiceTone; summary: string; features: string[]; };
export const productDetails: Product[] = [
  { slug: "field-force", name: "Field Force Management", category: "Field & retail", kind: "mobile", tone: "blue", summary: "Bring field visits, attendance, tasks and orders into a connected workflow for your teams.", features: ["Live location & visits", "Attendance & tasks", "Orders & reporting"] },
  { slug: "rupantar-hcm", name: "Rupantar HCM", category: "ERP & people", kind: "team", tone: "lavender", summary: "Keep people, attendance and payroll information organised in one business platform.", features: ["Employee information", "Attendance workflows", "Payroll management"] },
  { slug: "rupantar-erp", name: "Rupantar ERP", category: "ERP & people", kind: "erp", tone: "mint", summary: "Connect sales, inventory, procurement and finance across your day-to-day operations.", features: ["Inventory & procurement", "Sales & invoicing", "Financial workflows"] },
  { slug: "provident-fund", name: "Provident Fund", category: "ERP & people", kind: "software", tone: "sky", summary: "Organise employee contributions, fund records and reporting with a focused management system.", features: ["Contribution records", "Employee fund information", "Reporting workflows"] },
  { slug: "ecommerce", name: "Suffix E-commerce", category: "Field & retail", kind: "web", tone: "mint", summary: "Bring products, orders and customer journeys together in an online storefront.", features: ["Product catalogue", "Orders & inventory", "Checkout workflows"] },
  { slug: "smart-pos", name: "Smart POS & Billing", category: "Field & retail", kind: "software", tone: "blue", summary: "Support retail checkout, stock tracking and everyday sales reporting.", features: ["Checkout & billing", "Stock visibility", "Sales reports"] },
  { slug: "hotel-booking", name: "Hotel Booking System", category: "Field & retail", kind: "web", tone: "lavender", summary: "Keep room information, reservations and guest records easier to manage.", features: ["Room information", "Reservations", "Guest records"] },
  { slug: "interconnect-billing", name: "Interconnect Billing", category: "Communication", kind: "cloud", tone: "sky", summary: "Support telecom interconnect traffic records, rating and billing operations.", features: ["Traffic records", "Rating workflows", "Billing & reporting"] },
  { slug: "bulk-sms-meeting", name: "Bulk SMS & Web Meeting", category: "Communication", kind: "team", tone: "blue", summary: "Explore tools for customer messaging and online collaboration with your team.", features: ["Bulk messaging", "Online meetings", "Business communication"] },
  { slug: "payroll-system", name: "Payroll System", category: "ERP & people", kind: "software", tone: "lavender", summary: "Manage earnings, benefits, deductions and pay runs with HR and payroll tools connected to Rupantor ERP.", features: ["Configurable pay components", "Pay runs & payslips", "Financial integration"] },
  { slug: "rupantor-inventory", name: "Rupantor Inventory", category: "Field & retail", kind: "erp", tone: "mint", summary: "Manage stock quantities, product information and inventory activity across multiple warehouses.", features: ["Multiple warehouses", "Inventory counts & history", "Sales & purchasing integration"] },
  { slug: "transformer-monitoring", name: "Smart Transformer Monitoring", category: "Connected systems", kind: "iot", tone: "sky", summary: "Bring transformer status, historical information and remote notifications into a connected monitoring experience.", features: ["Transformer status", "Monitoring history", "Remote alarms & notifications"] },
];
export const getProduct = (slug: string) => productDetails.find(product => product.slug === slug);
export const legacyProductSlugs: Record<string, string> = {
  "payroll-system": "payroll-system", "provident-fund": "provident-fund",
  "e-commerce": "ecommerce", "rupantor-erp": "rupantar-erp",
  "hotel-booking-system": "hotel-booking", "field-force-management": "field-force",
  "interconnect-billing": "interconnect-billing", "rupantor-inventory": "rupantor-inventory",
  "transformer-monitoring": "transformer-monitoring",
};
