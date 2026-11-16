export interface ProductMetric {
  value: string;
  label: string;
  sub: string;
}

export interface ProductPersona {
  role: string;
  badge: string;
  summary: string;
  points: string[];
}

export interface ProductMediaConfig {
  heroImage: string;
  architectureImage: string;
  version: string;
  releaseBadge: string;
  tagline: string;
  telemetry: ProductMetric[];
  personas: ProductPersona[];
  deploymentSpecs: {
    cloud: string[];
    onPremise: string[];
  };
  hardwareIntegrations: string[];
}

export const defaultProductMedia: ProductMediaConfig = {
  heroImage: "/assets/products/card-payroll-system.jpg",
  architectureImage: "/assets/products/product-payroll-system-architecture.jpg",
  version: "v3.4 Enterprise Cloud",
  releaseBadge: "Production-Tested Architecture",
  tagline: "High-Performance Enterprise Software Built for Scalable Operations",
  telemetry: [
    { value: "< 50ms", label: "Query Execution", sub: "Hardware-accelerated processing" },
    { value: "99.99%", label: "Operational Reliability", sub: "Enterprise SLA guaranteed" },
    { value: "100%", label: "Audit Readiness", sub: "Immutable transaction logs" },
    { value: "Zero", label: "Data Discrepancy", sub: "Real-time automated reconciliation" },
  ],
  personas: [
    {
      role: "Operations & HR Leaders",
      badge: "Team Management",
      summary: "Streamline day-to-day employee lifecycle workflows, shift planning, and approvals without paperwork.",
      points: [
        "Automated biometric timeclock ingestion",
        "Configurable multi-tier approval chains",
        "Departmental shift scheduling & overtime limits",
      ],
    },
    {
      role: "Finance & Accounts Teams",
      badge: "Disbursement & General Ledger",
      summary: "Eliminate spreadsheet formula errors with instant salary disbursements and automated GL posting.",
      points: [
        "1-click BEFTN & electronic banking export",
        "Automated NBR tax slab deductions & allowances",
        "Direct journal auto-posting to Rupantar ERP",
      ],
    },
    {
      role: "Employees & Staff",
      badge: "Self-Service Portal",
      summary: "Empower staff with immediate transparency over their earnings, deductions, and tax withholdings.",
      points: [
        "Encrypted PDF payslip download via portal & email",
        "Live leave balance tracker & request submission",
        "Tax assessment certificates available on demand",
      ],
    },
  ],
  deploymentSpecs: {
    cloud: [
      "Fully managed high-availability cloud hosting",
      "Automatic hourly encrypted database backups",
      "Continuous rolling updates with zero downtime",
      "Multi-tenant data isolation & TLS 1.3 encryption",
    ],
    onPremise: [
      "Deploy directly on corporate bare-metal or private VM",
      "Air-gapped operation capability with offline SQLite sync",
      "Direct direct-access SQL queries & internal API hooks",
      "Complete in-house compliance with local data residency laws",
    ],
  },
  hardwareIntegrations: ["ZKTeco Biometric", "ESC/POS Thermal Printers", "Honeywell Barcode Scanners", "BEFTN Bank Gateways"],
};

export const productMediaRegistry: Record<string, ProductMediaConfig> = {
  "payroll-system": {
    heroImage: "/assets/products/product-payroll-system-hero-3d.jpg",
    architectureImage: "/assets/products/product-payroll-system-architecture.jpg",
    version: "v3.4 Statutory Cloud",
    releaseBadge: "NBR Tax 2024-25 Slabs Compliant",
    tagline: "Automated Salary Engine, Biometric Synchronization & BEFTN Bank Disbursement",
    telemetry: [
      { value: "10,000+", label: "Concurrent Employees", sub: "Full payroll computed in < 3 seconds" },
      { value: "1-Click", label: "BEFTN Bank Advice", sub: "Compatible with all 60+ scheduled banks" },
      { value: "100%", label: "NBR Tax Compliance", sub: "Automated withholding, slabs & certificates" },
      { value: "99.99%", label: "Ledger Accuracy", sub: "Zero manual spreadsheet formulas" },
    ],
    personas: [
      {
        role: "HR & People Operations",
        badge: "Workforce Administration",
        summary: "Ditch manual attendance books and complex overtime spreadsheets with automated device synchronization.",
        points: [
          "Direct TCP/IP sync with ZKTeco & biometric timeclocks across all branches",
          "Automated late-in, early-out penalty rules and weekend overtime multipliers",
          "Comprehensive employee lifecycle archive with salary revision history",
        ],
      },
      {
        role: "CFOs & Finance Controllers",
        badge: "Cash Flow & Audit Integrity",
        summary: "Disburse payroll in minutes while ensuring every single taka reconciles with your General Ledger.",
        points: [
          "Export bank advice files matching City Bank, EBL, BRAC, Dutch-Bangla formats",
          "Statutory tax calculation with female/male thresholds and investment tax credits",
          "Auto-create double-entry journal vouchers in Rupantar ERP or your accounting suite",
        ],
      },
      {
        role: "Employees & Field Staff",
        badge: "Self-Service Empowerment",
        summary: "Provide employees transparent access to digital payslips, tax deductions, and attendance records.",
        points: [
          "Secure digital payslips with QR verification delivered via SMS and email",
          "Transparent breakdown of basic pay, house rent, medical, and bonus components",
          "Employee tax deduction certificates generated instantly at fiscal year-end",
        ],
      },
      {
        role: "Internal & External Auditors",
        badge: "Governance & Compliance",
        summary: "Satisfy statutory labor regulations and external tax audits with immutable change ledgers.",
        points: [
          "Audit logs capturing user ID, timestamp, and previous vs updated salary values",
          "Provident Fund (PF) and Gratuity contribution schedules with interest calculation",
          "Ready-to-submit NBR withholding tax return summaries (Monthly & Annual)",
        ],
      },
    ],
    deploymentSpecs: {
      cloud: [
        "Secure cloud infrastructure on AWS / Suffix Cloud",
        "Automated hourly geo-replicated backups with disaster recovery",
        "Guaranteed 99.95% application uptime SLA",
        "Zero server maintenance: automatic statutory tax slab updates",
      ],
      onPremise: [
        "Deploy on your internal corporate servers or private data center",
        "Air-gapped operation support without continuous internet requirement",
        "Direct SQL access for custom Business Intelligence (PowerBI / Tableau)",
        "Permanent one-time perpetual license with dedicated local support",
      ],
    },
    hardwareIntegrations: [
      "ZKTeco Biometric Timeclocks",
      "Realtime & Virdi Fingerprint Devices",
      "BEFTN / NPSB Electronic Bank Systems",
      "Rupantar ERP Accounting Core",
    ],
  },
  "rupantar-hcm": {
    heroImage: "/assets/products/flagship-hcm.jpg",
    architectureImage: "/assets/products/product-payroll-system-architecture.jpg",
    version: "v4.1 Enterprise HCM",
    releaseBadge: "Full-Cycle HR & Talent Suite",
    tagline: "End-to-End Human Capital Management: Recruitment to Retirement",
    telemetry: [
      { value: "50,000+", label: "Active Profiles", sub: "High-density multi-branch workforce" },
      { value: "Realtime", label: "Biometric Ingestion", sub: "Live branch timeclock telemetry" },
      { value: "1-Click", label: "Multi-Entity Payroll", sub: "Unified payroll across group companies" },
      { value: "99.98%", label: "Attendance Accuracy", sub: "Geofenced mobile & biometric check-in" },
    ],
    personas: [
      {
        role: "Chief Human Resources Officer",
        badge: "Strategic HR",
        summary: "Align organizational talent with business goals through performance KPIs and retention tracking.",
        points: [
          "360-degree appraisal cycles and competency scorecards",
          "Organization hierarchy charts with real-time reporting trees",
          "Workforce turnover, attrition analytics and predictive hiring insights",
        ],
      },
      {
        role: "Payroll & Compensation Managers",
        badge: "Total Rewards",
        summary: "Execute complex salary structures with automated benefits, PF, gratuity and insurance administration.",
        points: [
          "Multi-branch compensation matrices with custom currency conversions",
          "Integrated Provident Fund trust accounting and loan advances",
          "Statutory tax withholding reports conforming to NBR directives",
        ],
      },
      {
        role: "Branch & Department Supervisors",
        badge: "Line Management",
        summary: "Manage roster shifts, approve overtime, and review leave requests with zero administrative friction.",
        points: [
          "Mobile-friendly leave and roster approval dashboard",
          "Real-time visibility into branch absenteeism and shift coverage",
          "Delegated approvals with automatic escalation triggers",
        ],
      },
    ],
    deploymentSpecs: {
      cloud: [
        "Dedicated isolated database instance on enterprise cloud",
        "Role-based SSO integration (Azure AD, Google Workspace)",
        "Continuous 24/7 telemetry monitoring & intrusion prevention",
        "Automated compliance patch releases",
      ],
      onPremise: [
        "Kubernetes containerized or bare-metal Linux installation",
        "Complete enterprise data sovereignty inside your own DMZ",
        "Active Directory & LDAP integration for internal corporate users",
        "Direct internal network bridge to biometric hardware controllers",
      ],
    },
    hardwareIntegrations: ["ZKTeco Biometric", "Facial Recognition Scanners", "RFID Proximity Cards", "Rupantar ERP Core"],
  },
  "rupantar-erp": {
    heroImage: "/assets/products/flagship-erp.jpg",
    architectureImage: "/assets/products/erp-bento.jpg",
    version: "v5.2 Unified Core",
    releaseBadge: "NBR-Compliant VAT & Supply Chain",
    tagline: "Unified Multi-Warehouse Inventory, Double-Entry General Ledger & NBR VAT",
    telemetry: [
      { value: "99.98%", label: "Inventory Accuracy", sub: "Real-time ledger & automated reorder" },
      { value: "3x", label: "Faster Reconciliation", sub: "Automated double-entry GL matching" },
      { value: "Unlimited", label: "Multi-Warehouse", sub: "Inter-branch stock transfer & routing" },
      { value: "100%", label: "NBR Mushak Compliant", sub: "Automated VAT 6.3, 6.7 & 9.1 generation" },
    ],
    personas: [
      {
        role: "Managing Directors & CEOs",
        badge: "Executive Control",
        summary: "Gain real-time visibility across all company branches, cash flow positions, and profit margins.",
        points: [
          "Consolidated multi-company balance sheets and profit & loss",
          "Automated executive dashboard on mobile with key business KPIs",
          "Granular role-based approval limits for purchases and disbursements",
        ],
      },
      {
        role: "Supply Chain & Warehouse Heads",
        badge: "Logistics Optimization",
        summary: "Eliminate stockouts, dead stock, and inventory loss across regional warehouses.",
        points: [
          "Real-time perpetual stock valuation (FIFO / Weighted Average)",
          "Barcode-driven goods receipt note (GRN) and dispatch verification",
          "Automated purchase order trigger on minimum threshold breach",
        ],
      },
    ],
    deploymentSpecs: {
      cloud: [
        "Tier-3 data center hosting with 99.98% uptime SLA",
        "Daily automated off-site encrypted backups",
        "Load-balanced application cluster with Redis caching",
        "Full web-browser access from anywhere with SSL encryption",
      ],
      onPremise: [
        "Host on your local server with direct Gigabit LAN connectivity",
        "Complete independence from external internet outages",
        "Direct connection to barcode printers, scales and POS terminals",
        "Full database access for internal IT and database administrators",
      ],
    },
    hardwareIntegrations: ["Barcode Scanners", "Zebra Thermal Label Printers", "Electronic Weighing Scales", "Touch POS Terminals"],
  },
};

export function getProductMedia(slug: string): ProductMediaConfig {
  return productMediaRegistry[slug] || defaultProductMedia;
}
