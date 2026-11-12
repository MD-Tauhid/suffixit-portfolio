import {
  Building2,
  Code2,
  Database,
  Globe,
  GraduationCap,
  Layers,
  MessageSquare,
  Server,
  ShieldCheck,
  Smartphone,
  Video,
  Zap,
} from "lucide-react";

export type CategoryFilter = "all" | "software-apps" | "enterprise-systems" | "cloud-infra";

export interface ServiceItem {
  id: string;
  slug: string;
  index: string;
  name: string;
  category: CategoryFilter;
  categoryLabel: string;
  badge: string;
  summary: string;
  image: string;
  icon: typeof Code2;
  capabilities: string[];
  metric: { value: string; label: string };
  highlights: string[];
  color?: string;
  accentColor?: string;
  items?: { title: string; desc: string }[];
  deliverable?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5 PRIMARY CORE PRACTICES (Featured in the Interactive 5-Card Stacking Deck)
// 1. Custom Software
// 2. Mobile Apps
// 3. IT & OT Security
// 4. Storage & Backup
// 5. ERP Consulting
// ─────────────────────────────────────────────────────────────────────────────
export const coreServicesList: ServiceItem[] = [
  {
    id: "custom-applications",
    slug: "custom-software",
    index: "01",
    name: "Custom Enterprise Software",
    category: "software-apps",
    categoryLabel: "Software Engineering",
    badge: "Microservices Architecture",
    summary:
      "Eliminate operational silos with purpose-built enterprise software platforms. Engineered with high-throughput microservices, sub-second API latency, resilient relational database schemas, and zero vendor lock-in.",
    image: "/assets/services/core-custom-software.jpg",
    icon: Code2,
    color: "#e8f3fc",
    accentColor: "#0072bc",
    capabilities: ["Workflow Automation", "Role-Based Screens", "Microservices API", "Relational Database"],
    metric: { value: "< 28ms", label: "p99 API Latency" },
    highlights: ["Event-driven microservices", "Zero vendor lock-in", "Automated CI/CD pipelines"],
    deliverable: "High-Throughput Microservices · Sub-Second API · Zero Vendor Lock-in",
    items: [
      {
        title: "Workflow Automation & Core Logic",
        desc: "End-to-end operational pipelines tailored for complex approval chains and zero manual bottlenecks.",
      },
      {
        title: "Granular RBAC Security",
        desc: "Role-based screens, audit trails, and multi-tenant authorization for strict compliance.",
      },
      {
        title: "Scalable Microservices Architecture",
        desc: "Decoupled APIs engineered in Node.js, Go, or Python with sub-second p99 latency benchmarks.",
      },
      {
        title: "Optimized Relational Database Schemas",
        desc: "ACID-compliant PostgreSQL/MySQL storage with automated indexing and partitioned query caches.",
      },
    ],
  },
  {
    id: "mobile-apps",
    slug: "mobile-apps",
    index: "02",
    name: "Native & Flutter Mobile Apps",
    category: "software-apps",
    categoryLabel: "Mobile Engineering",
    badge: "60 FPS Native UI",
    summary:
      "Consumer and enterprise iOS & Android mobile applications engineered with Flutter and native Swift/Kotlin for butter-smooth 60fps frame rates, biometric security, offline-first SQLite sync, and real-time push notifications.",
    image: "/assets/services/core-mobile-apps.jpg",
    icon: Smartphone,
    color: "#ede8fa",
    accentColor: "#7c3aed",
    capabilities: ["Flutter & Native iOS", "Offline SQLite Sync", "Biometric Touch/Face", "Live Push Alerts"],
    metric: { value: "60 FPS", label: "Ultra-Smooth UI" },
    highlights: ["Offline-first local DB", "Real-time GPS breadcrumbs", "Battery-optimized telemetry"],
    deliverable: "Dual iOS & Android Binaries · Offline SQLite Sync · 60fps Fluid UI",
    items: [
      {
        title: "Cross-Platform Flutter & Native Core",
        desc: "Single codebase efficiency paired with native Swift/Kotlin bridges for maximum raw device speed.",
      },
      {
        title: "Offline-First Local Sync",
        desc: "Seamless local SQLite caching that syncs automatically when network connectivity is restored.",
      },
      {
        title: "Biometric & Hardware Integration",
        desc: "FaceID/Fingerprint authentication, background GPS telematics, and Bluetooth device pairing.",
      },
      {
        title: "High-Volume Push Notification Engine",
        desc: "Targeted customer engagement notifications powered by Firebase Cloud Messaging & WebSockets.",
      },
    ],
  },
  {
    id: "it-ot-security",
    slug: "it-ot-security",
    index: "03",
    name: "IT & OT Cybersecurity Solutions",
    category: "cloud-infra",
    categoryLabel: "Cybersecurity & OT",
    badge: "Zero-Trust Architecture",
    summary:
      "Defensive zero-trust security engineering: next-generation perimeter firewalls (NGFW), industrial OT / SCADA network isolation, endpoint detection & response (EDR), penetration testing audits, and ISO 27001 compliance.",
    image: "/assets/services/core-it-ot-security.jpg",
    icon: ShieldCheck,
    color: "#def2eb",
    accentColor: "#0d9488",
    capabilities: ["Next-Gen Firewalls (NGFW)", "Industrial OT / SCADA Security", "Vulnerability Assessments", "ISO 27001 Governance"],
    metric: { value: "24/7", label: "SOC Threat Defense" },
    highlights: ["SOC incident response", "Zero-day protection", "Penetration testing audits"],
    deliverable: "Zero-Trust Architecture · Next-Gen Firewalls · ISO 27001 Governance",
    items: [
      {
        title: "Next-Gen Perimeter Firewalls (NGFW)",
        desc: "Hardware appliance configuration (Fortinet, Sophos, Cisco) with deep packet inspection & IPS.",
      },
      {
        title: "Industrial OT & SCADA Segmentation",
        desc: "Air-gapped industrial demilitarized zones (IDMZ) preventing plant floor telemetry intrusion.",
      },
      {
        title: "Proactive Penetration Testing (VAPT)",
        desc: "Rigorous white-hat offensive audits uncovering zero-day vulnerabilities across web, APIs, and networks.",
      },
      {
        title: "ISO 27001 & Compliance Hardening",
        desc: "Complete enterprise security policy documentation, employee audits, and statutory audit compliance.",
      },
    ],
  },
  {
    id: "storage-backup",
    slug: "storage-backup",
    index: "04",
    name: "Enterprise Storage & Backup",
    category: "cloud-infra",
    categoryLabel: "Data Protection",
    badge: "Disaster Recovery",
    summary:
      "Mission-critical enterprise data vault architecture with hardware-level AES-256 at-rest encryption, automated hourly snapshot mirroring across off-site locations, and certified RPO < 15 min disaster recovery protocols.",
    image: "/assets/services/core-storage-backup.jpg",
    icon: Database,
    color: "#def0fb",
    accentColor: "#0284c7",
    capabilities: ["AES-256 Encryption", "Hourly Snapshots", "Point-in-Time Restore", "Compliance Audits"],
    metric: { value: "RPO < 15m", label: "Disaster Recovery" },
    highlights: ["Ransomware immutable backups", "Multi-region mirroring", "Instant failover drills"],
    deliverable: "RPO < 15m Vault · AES-256 Encryption · Ransomware-Proof Air-Gap",
    items: [
      {
        title: "Ransomware-Proof Immutable Backups",
        desc: "Write-Once-Read-Many (WORM) storage tiers that prevent malicious tampering or encryption.",
      },
      {
        title: "Multi-Region Cloud Mirroring",
        desc: "Continuous block-level replication across geographically isolated Tier-III cloud availability zones.",
      },
      {
        title: "Certified RPO < 15 Min Recovery",
        desc: "Near-zero data loss disaster recovery playbooks with scripted one-click failover drills.",
      },
      {
        title: "Hardware-Level AES-256 Encryption",
        desc: "Military-grade data protection in transit and at rest with automated hardware security modules (HSM).",
      },
    ],
  },
  {
    id: "erp-consulting",
    slug: "erp-consulting",
    index: "05",
    name: "ERP Consulting & Transformation",
    category: "enterprise-systems",
    categoryLabel: "Enterprise Systems",
    badge: "Statutory Tax Compliant",
    summary:
      "Full-lifecycle strategic consulting to configure, audit, and scale Rupantar ERP across enterprise supply chains, automated NBR VAT 9.1 & Mushak 6.3 tax reconciliation, and multi-branch general ledgers.",
    image: "/assets/services/core-erp-consulting.jpg",
    icon: Layers,
    color: "rgb(189, 211, 247)",
    accentColor: "#1e50b4",
    capabilities: ["Supply Chain Audits", "Rupantar ERP Modules", "NBR VAT Reconciliation", "Staff Enablement"],
    metric: { value: "100% Tax", label: "NBR VAT Compliant" },
    highlights: ["Mushak 6.3 auto-generation", "Multi-warehouse ledger", "Double-entry balance sheets"],
    deliverable: "NBR VAT 9.1 & Mushak 6.3 Engine · Multi-Branch GL · Supply Chain ERP",
    items: [
      {
        title: "Automated NBR VAT 9.1 & Mushak 6.3",
        desc: "Automated real-time tax invoice generation, sub-form reconciliation, and government audit readiness.",
      },
      {
        title: "Multi-Branch General Ledger",
        desc: "Consolidated financial accounting, real-time balance sheets, and automated inter-branch transfers.",
      },
      {
        title: "Real-Time Supply Chain & Warehouse",
        desc: "FIFO/LIFO automated inventory tracking, purchase orders, supplier management, and barcode auditing.",
      },
      {
        title: "Enterprise Change Management & Training",
        desc: "On-site employee enablement, standard operating procedures (SOP), and dedicated 24/7 technical support.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 9 EXTENDED SPECIALIZED DISCIPLINES (Featured in Circular Reveal Portal 06 – 14)
// ─────────────────────────────────────────────────────────────────────────────
export const extendedServicesList: ServiceItem[] = [
  {
    id: "domain-hosting",
    slug: "cloud-hosting",
    index: "06",
    name: "Domain, DNS & Cloud Hosting",
    category: "cloud-infra",
    categoryLabel: "Cloud & Infrastructure",
    badge: "99.98% Uptime SLA",
    summary:
      "Tier-III high-speed SSD cPanel and multi-AZ cloud hosting infrastructure with automated DNS zone routing, wildcard SSL/TLS certificates, DDoS mitigation, and 24/7 proactive hardware monitoring.",
    image: "/assets/colapsing-card/Glass_cloud_over_database_disks_20261027094458.jpg",
    icon: Globe,
    capabilities: ["cPanel & Cloud Hosting", "Automated SSL/TLS", "DNS Zone Management", "24/7 Proactive Support"],
    metric: { value: "99.98%", label: "Verified Network Uptime" },
    highlights: ["SSD RAID-10 storage", "Automated offsite backups", "DDoS mitigation matrix"],
  },
  {
    id: "web-ecommerce",
    slug: "web-ecommerce",
    index: "07",
    name: "Web & Headless E-Commerce",
    category: "software-apps",
    categoryLabel: "Digital Commerce",
    badge: "Headless Next.js",
    summary:
      "High-conversion corporate web applications and scalable multi-vendor e-commerce portals powered by headless Next.js, sub-second product search, multi-store stock reservations, and direct bKash, Nagad & card gateway integration.",
    image: "/assets/services/web-ecommerce.jpg",
    icon: Globe,
    capabilities: ["Headless Next.js", "bKash & Card Gateways", "Customer Portals", "Sub-second Search"],
    metric: { value: "99.9%", label: "Checkout Reliability" },
    highlights: ["Automated Cart Abandonment", "Split-payment checkout", "Instant stock reservations"],
  },
  {
    id: "it-infrastructure",
    slug: "it-infrastructure",
    index: "08",
    name: "IT Infrastructure & Networking",
    category: "cloud-infra",
    categoryLabel: "Enterprise Networking",
    badge: "Fiber Backbone",
    summary:
      "Turnkey corporate ICT network design: certified optical fiber backbones, managed Cisco/Mikrotik core routers, enterprise Wi-Fi 6 wireless access fabrics, and structured server rack cable management for enterprise headquarters.",
    image: "/assets/services/cloud-hosting.jpg",
    icon: Server,
    capabilities: ["Structured Cabling", "Managed Network Switches", "Enterprise Wi-Fi 6", "Server Rack Architecture"],
    metric: { value: "10 Gbps", label: "Backbone Core Capacity" },
    highlights: ["Fluke certified testing", "Firewall gateway policies", "VLAN traffic segmentation"],
  },
  {
    id: "bulk-sms",
    slug: "bulk-sms",
    index: "09",
    name: "Carrier-Grade Bulk SMS & OTP",
    category: "enterprise-systems",
    categoryLabel: "Telecom Messaging",
    badge: "Direct Telco Gateway",
    summary:
      "High-throughput telco-integrated messaging gateway connected directly to major Bangladesh mobile network operators (Grameenphone, Banglalink, Robi, Teletalk) for sub-3-second transactional OTP delivery, alerts, and marketing.",
    image: "/assets/colapsing-card/Smartphone_with_GPS_radar_map_20261027094412.jpg",
    icon: MessageSquare,
    capabilities: ["Direct Telco Gateway", "Instant OTP Dispatch", "Masking & Non-Masking", "Live Delivery Reports"],
    metric: { value: "< 3s", label: "OTP Delivery Velocity" },
    highlights: ["BTRC compliant routing", "REST API integration", "High throughput queue"],
  },
  {
    id: "consultancy-system-integrator",
    slug: "system-integration",
    index: "10",
    name: "Consultancy & System Integration",
    category: "enterprise-systems",
    categoryLabel: "Systems Integration",
    badge: "Unified Architecture",
    summary:
      "Architectural bridging connecting legacy mainframe systems, enterprise ERPs, biometric attendance hardware, and modern third-party cloud APIs into a unified, synchronized, transactionally safe data bus.",
    image: "/assets/colapsing-card/BPO_and_staffing_solutions_illus_246c3cd1_2K.jpg",
    icon: Layers,
    capabilities: ["Legacy Data Migration", "Enterprise Service Bus", "REST & GraphQL APIs", "Hardware Bridging"],
    metric: { value: "Zero Loss", label: "Data Integrity & Sync" },
    highlights: ["Transactional atomicity", "Automated webhook sync", "Comprehensive audit trails"],
  },
  {
    id: "hospital-management",
    slug: "hospital-management",
    index: "11",
    name: "Hospital Management System (HMS)",
    category: "software-apps",
    categoryLabel: "Healthcare Technology",
    badge: "Clinical Automation",
    summary:
      "Integrated digital hospital operating suite unifying OPD/IPD patient admissions, electronic medical health records (EMR), laboratory diagnostics, multi-counter pharmacy inventory, and automated insurance claims billing.",
    image: "/assets/colapsing-card/Hospital_workstation_displaying__20261027094755.jpg",
    icon: Building2,
    capabilities: ["OPD/IPD Patient Registry", "Electronic Health Records", "Pharmacy & Stock Sync", "Diagnostic Lab Reports"],
    metric: { value: "100%", label: "Patient Traceability" },
    highlights: ["Doctor scheduling portal", "Insurance claim tracking", "Bed occupancy matrix"],
  },
  {
    id: "learning-management",
    slug: "learning-management",
    index: "12",
    name: "Learning Management System (LMS)",
    category: "software-apps",
    categoryLabel: "Digital Applications",
    badge: "Education Technology",
    summary:
      "Next-generation digital academy platforms engineered for universities, corporate training institutes, and skill academies featuring live WebRTC classrooms, SCORM course authoring, automated grading, and secure certificate verification.",
    image: "/assets/services/custom-software.jpg",
    icon: GraduationCap,
    capabilities: ["Course Catalog Management", "Interactive Quizzes", "Student Progress Tracking", "Certificate Generator"],
    metric: { value: "50k+", label: "Concurrent Learners" },
    highlights: ["SCORM/xAPI compliant", "Mobile-ready video player", "Automated grading workflow"],
  },
  {
    id: "power-cooling",
    slug: "power-cooling",
    index: "13",
    name: "Infrastructure Power & Cooling",
    category: "cloud-infra",
    categoryLabel: "Facility Infrastructure",
    badge: "N+1 Power Redundancy",
    summary:
      "Data center and server room facility engineering: N+1 modular online UPS power backups, precision air conditioning (PAC), thermal heat-aisle containment, automated generator transfer switches, and environmental sensor alarms.",
    image: "/assets/services/storage-backup.jpg",
    icon: Zap,
    capabilities: ["Precision Cooling (PAC)", "Online Modular UPS", "Thermal Sensor Telemetry", "Power Redundancy N+1"],
    metric: { value: "N+1", label: "Electrical Redundancy" },
    highlights: ["Energy efficient cooling", "Automated generator switch", "Environment alarm system"],
  },
  {
    id: "video-conferencing",
    slug: "video-conferencing",
    index: "14",
    name: "Suffix Video Conferencing",
    category: "enterprise-systems",
    categoryLabel: "Enterprise Communication",
    badge: "Encrypted WebRTC",
    summary:
      "Sovereign, ultra-low-latency video conferencing infrastructure deployed on-premise or dedicated private cloud with end-to-end WebRTC encryption, interactive whiteboards, multi-speaker audio mixing, and meeting transcripts.",
    image: "/assets/about/collaboration-placeholder.jpg",
    icon: Video,
    capabilities: ["HD Video & Audio Streams", "Encrypted WebRTC", "Screen Sharing & Whiteboard", "Meeting Recordings"],
    metric: { value: "1080p60", label: "Crystal Clear Streams" },
    highlights: ["On-premise deployment", "End-to-end encrypted", "SIP/H.323 interoperable"],
  },
];

export const all14ServicesList: ServiceItem[] = [...coreServicesList, ...extendedServicesList];

