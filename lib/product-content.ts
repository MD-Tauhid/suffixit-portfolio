import type { Product } from "./products";
export type ProductModule = { title: string; text: string };
type ProductContent = { lead: string; audience: string[]; modules: ProductModule[]; source?: string };
const content: Record<string, ProductContent> = {
  "payroll-system": {
    lead: "Bring the details of payroll into one connected workflow.",
    audience: ["HR & payroll teams", "Finance teams", "Multi-branch businesses"],
    source: "https://www.suffixit.com/product/payroll-system",
    modules: [
      { title: "Flexible pay components", text: "Configure earnings, benefits and deductions around your organisation's payroll requirements." },
      { title: "Pay periods & departments", text: "Manage multiple pay periods, departments and branch requirements within the payroll workflow." },
      { title: "Pay runs & payslips", text: "Calculate payroll, review pay runs and use configurable payslips. The published module supports cancelling and recalculating a pay run." },
      { title: "Financial integration", text: "Connect payroll with General Ledger expense distribution and bank reconciliation workflows in Rupantor ERP." },
      { title: "Audit trails", text: "Review the history of master-data and financial changes through the payroll module's audit trails." },
      { title: "Time & attendance add-on", text: "Discuss the optional Employee Tracker Plus module for time collection, approval rules and attendance information." },
    ],
  },
  "provident-fund": {
    lead: "A clearer picture of employee funds, contributions and administration.",
    audience: ["Provident fund administrators", "HR teams", "Finance teams"],
    source: "https://www.suffixit.com/product/provident-fund",
    modules: [
      { title: "Employee information", text: "Maintain account-holder profiles with the employee information needed for fund administration." },
      { title: "Configurable accounts", text: "Set up the chart of accounts to reflect the accounting structure used by your organisation." },
      { title: "Payroll connections", text: "Discuss integration with your payroll system so provident fund information can fit into the wider workflow." },
      { title: "Refund policies", text: "Configure refund policies around service and month-based rules supported by the product." },
      { title: "PF loan management", text: "Manage provident fund loans, recovery schedules and interest calculations." },
      { title: "Investment & profit", text: "Manage fund investments and calculate and distribute investment profit to employee accounts." },
    ],
  },
  "rupantar-erp": {
    lead: "Connect the information behind finance, people and operations.",
    audience: ["Finance & accounts", "Operations teams", "Multi-branch organisations"],
    source: "https://www.suffixit.com/product/rupantor-erp",
    modules: [
      { title: "General Ledger", text: "Bring financial accounts, journals and reporting into a multi-company, division and branch-capable ledger." },
      { title: "Accounts payable", text: "Organise supplier invoices, accruals and payments with connected financial workflows." },
      { title: "HR & payroll", text: "Manage earnings, benefits and deductions alongside the system's financial modules." },
      { title: "Inventory control", text: "Keep product, quantity and valuation information connected to the wider business." },
      { title: "Sales orders & invoicing", text: "Support quotations, orders, invoices and different sales workflows through the sales order module." },
      { title: "Connected reporting", text: "Review financial information across modules and export data for further reporting and analysis." },
    ],
  },
  "rupantor-inventory": {
    lead: "Keep the right stock information close to every operational decision.",
    audience: ["Warehouse teams", "Distribution businesses", "Manufacturing operations"],
    source: "https://www.suffixit.com/product/rupantor-inventory",
    modules: [
      { title: "Multiple warehouses", text: "Manage inventory information across warehouses with visibility into quantities and stock value." },
      { title: "Product organisation", text: "Use product classes, categories and groups to organise different types of stock." },
      { title: "Inventory counts", text: "Support stock counting with the inventory module's flexible count workflow." },
      { title: "History & tracking", text: "Review inventory history and audit trails for quantity, master-data and financial changes." },
      { title: "Units of measure", text: "Work with multiple units of measure and user-defined product information." },
      { title: "Connected operations", text: "Link inventory with sales orders, purchasing and relevant manufacturing workflows in Rupantor ERP." },
    ],
  },
  "field-force": {
    lead: "Know what is happening beyond the office.",
    audience: ["Field operations", "Sales & distribution", "Service teams"],
    source: "https://www.suffixit.com/product/field-force-management",
    modules: [
      { title: "Job scheduling", text: "Schedule field jobs and share the appointment information your agents need." },
      { title: "Live tracking", text: "Bring field activity and workforce location into an operational view." },
      { title: "Offline synchronisation", text: "Keep supported field workflows available during connection gaps and synchronise when connectivity returns." },
      { title: "Attendance & tasks", text: "Manage attendance, task assignments and roster information for your field team." },
      { title: "Orders, invoices & payments", text: "Connect activity in the field with order, invoice and payment workflows." },
      { title: "Collaboration & reporting", text: "Support team communication, expense management and performance analysis." },
    ],
  },
  "ecommerce": {
    lead: "Bring the storefront and the work behind every order together.",
    audience: ["Online retailers", "Growing brands", "Businesses selling online"],
    source: "https://www.suffixit.com/product/e-commerce",
    modules: [
      { title: "Content & catalogue", text: "Manage storefront content and organise the products your customers browse." },
      { title: "Inventory management", text: "Connect stock information with your online selling workflow." },
      { title: "Order management", text: "Keep order information, history and tracking accessible to your team." },
      { title: "Pricing & promotions", text: "Discuss multi-pricing, gift certificates and discount coupon requirements." },
      { title: "Payments", text: "Review available payment integrations against the gateways and markets your business needs." },
      { title: "Shipping options", text: "Plan suitable shipping choices alongside the order and checkout experience." },
    ],
  },
  "hotel-booking": {
    lead: "A clearer reservation journey for guests and your team.",
    audience: ["Hotel administrators", "Reservation teams", "Hospitality businesses"],
    source: "https://www.suffixit.com/product/hotel-booking-system",
    modules: [
      { title: "Multiple-room reservations", text: "Allow guests to select more than one room within a single reservation." },
      { title: "Room availability", text: "Present available rooms for the selected period and number of guests." },
      { title: "Reservation management", text: "Manage booking information and create reservations manually when needed." },
      { title: "Guest information", text: "Keep customer details associated with the relevant booking." },
      { title: "Booking calendar", text: "Review bookings by date and status using the room availability calendar." },
    ],
  },
  "interconnect-billing": {
    lead: "Bring clarity to complex telecom billing and partner settlement.",
    audience: ["Telecom operators", "Wholesale teams", "Billing & finance"],
    source: "https://www.suffixit.com/product/interconnect-billing",
    modules: [
      { title: "Rating & billing", text: "Support interconnect billing and rating across wholesale service arrangements." },
      { title: "Partner settlement", text: "Manage charges with network and content partners through settlement workflows." },
      { title: "Revenue sharing", text: "Support complex revenue-sharing agreements and partner business models." },
      { title: "Wholesale information", text: "Review information about agreements, costs and revenues to support operational decisions." },
    ],
  },
  "transformer-monitoring": {
    lead: "Keep operational status visible, wherever your team is.",
    audience: ["Operations teams", "Maintenance teams", "Electrical infrastructure teams"],
    source: "https://www.suffixit.com/product/transformer-monitoring",
    modules: [
      { title: "Transformer status", text: "View the operational status of multiple transformers through a connected system." },
      { title: "Monitoring history", text: "Review historical information to better understand transformer activity over time." },
      { title: "Remote notifications", text: "Receive the remote alarms and notifications supported by the monitoring system." },
      { title: "Mobile & desktop access", text: "Access monitoring information from a mobile device or computer." },
    ],
  },
};
export function getProductContent(product: Product): ProductContent {
  return content[product.slug] ?? {
    lead: product.summary,
    audience: product.category === "ERP & people" ? ["HR teams", "Business administrators", "Operations teams"] : product.category === "Communication" ? ["Customer-facing teams", "Business administrators", "Distributed teams"] : ["Business owners", "Operations teams", "Retail teams"],
    modules: product.features.map(title => ({ title, text: "Explore how " + title.toLowerCase() + " fits your business requirements in a product walkthrough with our team." })),
  };
}
