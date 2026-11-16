export interface ServiceMetric {
  value: string;
  label: string;
  sublabel: string;
}

export interface ServiceMediaConfig {
  heroImage: string;
  spotlightImage: string;
  capabilityImages: string[];
  metrics: ServiceMetric[];
  techStack: string[];
  heroBadges: { icon: string; text: string }[];
  categoryTag: string;
}

export const defaultServiceMedia: ServiceMediaConfig = {
  heroImage: "/assets/services/services-hero-cinematic.jpg",
  spotlightImage: "/assets/services/custom-software.jpg",
  capabilityImages: [
    "/assets/services/delivery-phase-1.jpg",
    "/assets/services/delivery-phase-2.jpg",
    "/assets/services/delivery-phase-3.jpg",
    "/assets/services/delivery-phase-4.jpg",
  ],
  metrics: [
    { value: "50+", label: "Enterprise Projects", sublabel: "Built & deployed since 2017" },
    { value: "99.98%", label: "Operational Reliability", sublabel: "High-availability architecture" },
    { value: "3.4x", label: "Process Acceleration", sublabel: "Eliminates manual workflows" },
    { value: "100%", label: "Codebase Ownership", sublabel: "Zero vendor lock-in" },
  ],
  techStack: ["TypeScript", "Next.js", "Node.js / NestJS", "PostgreSQL", "Docker", "AWS / Cloud"],
  heroBadges: [
    { icon: "shield", text: "Enterprise Architecture" },
    { icon: "zap", text: "High Availability SLA" },
    { icon: "check", text: "Production Ready" },
  ],
  categoryTag: "Enterprise Solutions",
};

export const serviceMediaRegistry: Record<string, ServiceMediaConfig> = {
  "dedicated-teams": {
    heroImage: "/assets/services/service-dedicated-teams-hero-3d.jpg",
    spotlightImage: "/assets/services/service-dedicated-teams-collaboration.jpg",
    capabilityImages: [
      "/assets/services/service-dedicated-teams-hero-3d.jpg",
      "/assets/services/service-dedicated-teams-collaboration.jpg",
      "/assets/services/dedicated-team-collaboration.webp",
      "/assets/about/workspace-placeholder.jpg",
    ],
    metrics: [
      { value: "Top 1%", label: "Vetted Senior Engineers", sublabel: "Architectural & production battle-tested" },
      { value: "48h", label: "Rapid Squad Deployment", sublabel: "Zero ramp-up delay to Day-1 commit" },
      { value: "100%", label: "Direct Git & Slack Sync", sublabel: "Embedded inside your daily standups" },
      { value: "0%", label: "Vendor Overhead & Lock-in", sublabel: "Transparent hourly & monthly sprints" },
    ],
    techStack: ["React / Next.js", "Node.js / Go / Python", "Flutter & Mobile", "AWS / Docker / K8s", "PostgreSQL / Redis", "CI/CD & QA Automation"],
    heroBadges: [
      { icon: "users", text: "Top 1% Senior Engineers" },
      { icon: "zap", text: "48-Hour Squad Match" },
      { icon: "shield", text: "100% Code IP Ownership" },
    ],
    categoryTag: "Staff Augmentation & Dedicated Squads",
  },
  "web-ecommerce": {
    heroImage: "/assets/services/service-ecommerce-hero-3d.jpg",
    spotlightImage: "/assets/services/service-ecommerce-conversion-architecture.jpg",
    capabilityImages: [
      "/assets/services/service-ecommerce-hero-3d.jpg",
      "/assets/services/service-ecommerce-conversion-architecture.jpg",
      "/assets/services/service-ecommerce-integration-ecosystem.jpg",
      "/assets/services/web-ecommerce.jpg",
    ],
    metrics: [
      { value: "24+", label: "Commerce Deployments", sublabel: "B2B & D2C online storefronts" },
      { value: "+32%", label: "Average Conversion Lift", sublabel: "Streamlined checkout journeys" },
      { value: "< 0.8s", label: "Core Web Vitals Index", sublabel: "Sub-second product page load" },
      { value: "10+", label: "Payment & ERP Connectors", sublabel: "bKash, Nagad, Visa & ERP sync" },
    ],
    techStack: ["Next.js 15", "Tailwind CSS", "bKash & Nagad APIs", "PostgreSQL", "Redis Cache", "Docker"],
    heroBadges: [
      { icon: "zap", text: "< 0.8s Speed Index" },
      { icon: "credit-card", text: "bKash, Nagad & Cards" },
      { icon: "box", text: "Multi-Warehouse Stock Sync" },
    ],
    categoryTag: "Omnichannel Web & Commerce",
  },
  "custom-software": {
    heroImage: "/assets/services/core-custom-software.jpg",
    spotlightImage: "/assets/services/custom-software.jpg",
    capabilityImages: [
      "/assets/services/core-custom-software.jpg",
      "/assets/services/custom-software.jpg",
      "/assets/services/delivery-phase-2.jpg",
      "/assets/services/delivery-phase-3.jpg",
    ],
    metrics: [
      { value: "50+", label: "Bespoke Enterprise Systems", sublabel: "Built around precise business workflows" },
      { value: "99.98%", label: "System Availability SLA", sublabel: "Fault-tolerant microservice core" },
      { value: "3.4x", label: "Operational Speed", sublabel: "Eliminates spreadsheets & handoffs" },
      { value: "100%", label: "IP & Codebase Ownership", sublabel: "Full source code handover" },
    ],
    techStack: ["TypeScript", "NestJS", "React / Next.js", "PostgreSQL", "RabbitMQ", "Kubernetes"],
    heroBadges: [
      { icon: "shield", text: "Role-Based Audit Trail" },
      { icon: "zap", text: "3.4x Faster Operations" },
      { icon: "layers", text: "Multi-System API Sync" },
    ],
    categoryTag: "Core Enterprise Backbone",
  },
  "mobile-apps": {
    heroImage: "/assets/services/core-mobile-apps.jpg",
    spotlightImage: "/assets/services/mobile-apps.jpg",
    capabilityImages: [
      "/assets/services/core-mobile-apps.jpg",
      "/assets/services/mobile-apps.jpg",
      "/assets/services/delivery-phase-2.jpg",
      "/assets/services/delivery-phase-4.jpg",
    ],
    metrics: [
      { value: "40+", label: "Production Mobile Apps", sublabel: "Native iOS & Android apps deployed" },
      { value: "99.2%", label: "GPS Telemetry Accuracy", sublabel: "Geofenced tracking across 64 districts" },
      { value: "100%", label: "Offline-First Reliability", sublabel: "Local SQLite caching & auto-sync" },
      { value: "< 16ms", label: "60 FPS Render Speed", sublabel: "Hardware-accelerated native Flutter" },
    ],
    techStack: ["Flutter 3", "Dart", "Native Swift / Kotlin", "SQLite", "Firebase FCM", "GraphQL / REST"],
    heroBadges: [
      { icon: "map-pin", text: "99.2% GPS Geofencing" },
      { icon: "database", text: "Full Offline SQLite Sync" },
      { icon: "smartphone", text: "60 FPS Native Performance" },
    ],
    categoryTag: "Field & Consumer Mobility",
  },
  "cloud-hosting": {
    heroImage: "/assets/services/cloud-hosting.jpg",
    spotlightImage: "/assets/services/services-hero-cinematic.jpg",
    capabilityImages: [
      "/assets/services/cloud-hosting.jpg",
      "/assets/services/services-hero-cinematic.jpg",
      "/assets/services/delivery-phase-1.jpg",
      "/assets/services/delivery-phase-4.jpg",
    ],
    metrics: [
      { value: "99.99%", label: "Guaranteed Infrastructure SLA", sublabel: "Tier-3 certified data centers" },
      { value: "15 Min", label: "RTO Recovery Objective", sublabel: "Geo-replicated automatic snapshots" },
      { value: "256-bit", label: "Bank-Grade Encryption", sublabel: "PCI-DSS & ISO 27001 compliant" },
      { value: "24/7/365", label: "Dedicated NOC Center", sublabel: "Instant detection & auto failover" },
    ],
    techStack: ["AWS / GCP / Bare Metal", "Docker & Kubernetes", "Terraform", "Cloudflare Enterprise", "Prometheus & Grafana"],
    heroBadges: [
      { icon: "cloud", text: "Tier-3 Enterprise SLA" },
      { icon: "shield", text: "Automated Geo-Snapshots" },
      { icon: "zap", text: "24/7 Dedicated NOC Support" },
    ],
    categoryTag: "Cloud Architecture & Hosting",
  },
  "storage-backup": {
    heroImage: "/assets/services/core-storage-backup.jpg",
    spotlightImage: "/assets/services/storage-backup.jpg",
    capabilityImages: [
      "/assets/services/core-storage-backup.jpg",
      "/assets/services/storage-backup.jpg",
      "/assets/services/delivery-phase-2.jpg",
      "/assets/services/delivery-phase-4.jpg",
    ],
    metrics: [
      { value: "100%", label: "Data Restoration Audit", sublabel: "Immutable WORM backup retention" },
      { value: "15 Min", label: "Point-in-Time Restore", sublabel: "Zero operational downtime" },
      { value: "3-2-1", label: "Gold Standard Strategy", sublabel: "3 copies, 2 media, 1 offsite vault" },
      { value: "Zero", label: "Ransomware Vulnerability", sublabel: "Cryptographically air-gapped" },
    ],
    techStack: ["Veeam Enterprise", "TrueNAS ZFS", "AWS S3 Glacier", "Automated Hash Validation", "Encrypted Tunnel"],
    heroBadges: [
      { icon: "database", text: "Immutable 3-2-1 Vault" },
      { icon: "clock", text: "15-Min Point-in-Time Restore" },
      { icon: "shield", text: "Air-Gapped Disaster Vault" },
    ],
    categoryTag: "Enterprise Data Protection",
  },
  "erp-consulting": {
    heroImage: "/assets/services/core-erp-consulting.jpg",
    spotlightImage: "/assets/services/erp-consulting.jpg",
    capabilityImages: [
      "/assets/services/core-erp-consulting.jpg",
      "/assets/services/erp-consulting.jpg",
      "/assets/services/delivery-phase-1.jpg",
      "/assets/services/delivery-phase-3.jpg",
    ],
    metrics: [
      { value: "100%", label: "NBR VAT 9.1 Compliant", sublabel: "Automated auditable tax engine" },
      { value: "99.98%", label: "Inventory Stock Accuracy", sublabel: "Multi-warehouse real-time sync" },
      { value: "3x", label: "Faster Financial Closing", sublabel: "Unified double-entry general ledger" },
      { value: "15+", label: "Connected Core Modules", sublabel: "Procurement, HR, POS & Billing" },
    ],
    techStack: ["Rupantar ERP Core", "PostgreSQL", "NBR Mushak API", "Redis Queue", "Power BI / Tableau"],
    heroBadges: [
      { icon: "file-text", text: "NBR VAT 9.1 Compliant" },
      { icon: "box", text: "Multi-Warehouse Stock Sync" },
      { icon: "layers", text: "Automated Double-Entry GL" },
    ],
    categoryTag: "Enterprise ERP & Operations",
  },
  "it-ot-security": {
    heroImage: "/assets/services/core-it-ot-security.jpg",
    spotlightImage: "/assets/services/services-hero-cinematic.jpg",
    capabilityImages: [
      "/assets/services/core-it-ot-security.jpg",
      "/assets/services/services-hero-cinematic.jpg",
      "/assets/services/delivery-phase-2.jpg",
      "/assets/services/delivery-phase-4.jpg",
    ],
    metrics: [
      { value: "Zero-Trust", label: "Micro-Segmentation", sublabel: "Perimeter defense for SCADA & IT" },
      { value: "< 15 Sec", label: "Threat Detection MTTR", sublabel: "Real-time SIEM/SOC anomaly mitigation" },
      { value: "100%", label: "VAPT Audit Pass Rate", sublabel: "Penetration testing & system hardening" },
      { value: "ISO 27001", label: "Framework Compliance", sublabel: "Enterprise risk & governance" },
    ],
    techStack: ["Fortinet / Cisco", "Wazuh SIEM", "WireGuard / IPsec", "Snort IDS/IPS", "EDR Agents"],
    heroBadges: [
      { icon: "shield", text: "Zero-Trust Architecture" },
      { icon: "zap", text: "Real-time Threat Mitigation" },
      { icon: "lock", text: "SCADA & OT Isolation" },
    ],
    categoryTag: "Cybersecurity & Infrastructure",
  },
  "iot-solutions": {
    heroImage: "/assets/services/iot-solutions.jpg",
    spotlightImage: "/assets/services/services-hero-cinematic.jpg",
    capabilityImages: [
      "/assets/services/iot-solutions.jpg",
      "/assets/services/services-hero-cinematic.jpg",
      "/assets/services/delivery-phase-1.jpg",
      "/assets/services/delivery-phase-3.jpg",
    ],
    metrics: [
      { value: "50,000+", label: "Connected Sensor Nodes", sublabel: "Transformers, gensets & meters" },
      { value: "Sub-Second", label: "Telemetry Processing", sublabel: "MQTT over TLS edge broker" },
      { value: "99.9%", label: "Industrial Site Uptime", sublabel: "Cellular 4G/NB-IoT & RS485 Modbus" },
      { value: "-18%", label: "Energy Waste Reduction", sublabel: "Automated power factor alerts" },
    ],
    techStack: ["MQTT / Modbus RTU", "TimescaleDB", "Node.js Microservices", "Next.js Dashboard", "Grafana"],
    heroBadges: [
      { icon: "cpu", text: "Sub-Second Telemetry" },
      { icon: "wifi", text: "4G / NB-IoT / Modbus RS485" },
      { icon: "zap", text: "-18% Energy Waste Reduction" },
    ],
    categoryTag: "Smart Industrial Telemetry",
  },
};

export function getServiceMedia(slug: string): ServiceMediaConfig {
  return serviceMediaRegistry[slug] || defaultServiceMedia;
}
