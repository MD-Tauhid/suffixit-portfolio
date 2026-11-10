import type { ServiceTone } from "./service-palette";

export type ServiceKind = "software" | "web" | "mobile" | "iot" | "cloud" | "backup" | "erp" | "seo" | "team";
export type Service = {
  slug: string; name: string; icon: string; kind: ServiceKind; tone: ServiceTone;
  headline: [string, string]; summary: string; introduction: string;
  outcome: string; benefits: string[];
  capabilities: { title: string; text: string; deliverables: string[] }[];
  questions: { q: string; a: string }[];
};
const additionalServiceDefinitions: { slug: string; name: string; icon: string; kind: ServiceKind; tone: ServiceTone; headline: [string, string]; summary: string; areas: string[] }[] = [
  { slug: "learning-management", name: "Learning Management System", icon: "monitor", kind: "software", tone: "lavender", headline: ["Learning, organised.", "Progress, connected."], summary: "Explore learning management software around course content, learners and the training workflows your organisation needs.", areas: ["Course & content requirements", "Learner access", "Training workflows", "Progress & reporting"] },
  { slug: "video-conferencing", name: "Suffix Video Conferencing", icon: "video", kind: "team", tone: "sky", headline: ["Bring your people", "into the conversation."], summary: "Discuss video conferencing and online collaboration around the way your team, customers or learners meet.", areas: ["Meeting requirements", "Participant experience", "Online collaboration", "System connections"] },
  { slug: "system-integration", name: "Consultancy & System Integration", icon: "layers", kind: "cloud", tone: "blue", headline: ["Separate systems.", "A connected approach."], summary: "Bring applications and infrastructure into a considered integration plan, grounded in your business requirements.", areas: ["Current-system assessment", "Integration planning", "Data & access requirements", "Implementation coordination"] },
  { slug: "power-cooling", name: "Infrastructure Power & Cooling", icon: "settings", kind: "cloud", tone: "mint", headline: ["Support the systems", "your business runs on."], summary: "Discuss power and cooling requirements as part of planning and maintaining your IT infrastructure.", areas: ["Site & environment review", "Power requirements", "Cooling requirements", "Operational handover"] },
  { slug: "hospital-management", name: "Hospital Management", icon: "building-2", kind: "software", tone: "blue", headline: ["Connected information.", "Clearer hospital workflows."], summary: "Explore hospital management requirements around patient information, appointments and everyday administration.", areas: ["Patient information requirements", "Appointment workflows", "Billing requirements", "Operational reporting"] },
  { slug: "bulk-sms", name: "Bulk SMS", icon: "message-square", kind: "team", tone: "lavender", headline: ["Your message.", "A clearer way to reach people."], summary: "Discuss business messaging requirements and a suitable approach to communicating with your audience by SMS.", areas: ["Audience & message planning", "Delivery requirements", "Application integration", "Reporting requirements"] },
  { slug: "it-infrastructure", name: "IT Infrastructure", icon: "cloud", kind: "cloud", tone: "sky", headline: ["A practical foundation", "for everyday operations."], summary: "Plan networks, servers and the IT environment behind your applications and business operations.", areas: ["Infrastructure assessment", "Network & server planning", "Deployment requirements", "Maintenance & support"] },
  { slug: "it-ot-security", name: "IT & OT Security Solutions", icon: "shield-check", kind: "backup", tone: "blue", headline: ["Understand your environment.", "Plan its protection."], summary: "Discuss information and operational technology security needs in the context of your infrastructure and workflows.", areas: ["Environment review", "Access & network requirements", "Protection requirements", "Monitoring & response planning"] },
  { slug: "industrial-energy-monitoring", name: "Industrial Energy Monitoring", icon: "cpu", kind: "iot", tone: "mint", headline: ["Bring energy use", "into a clearer view."], summary: "Explore connected monitoring around the energy information your industrial operations need.", areas: ["Meter & device requirements", "Energy data requirements", "Monitoring views", "Alerts & reporting"] },
];
const additionalServices: Service[] = additionalServiceDefinitions.map(item => ({
  ...item,
  introduction: "Start with the people, environment and workflows involved. We review your requirements together and shape a practical scope before moving into implementation.",
  outcome: "The right solution starts with understanding your requirements.",
  benefits: ["Define the operational requirements", "Review the available technical approach", "Agree the delivery and support scope"],
  capabilities: item.areas.map(title => ({ title, text: "We review " + title.toLowerCase() + " with your team and define the relevant work within the agreed project scope.", deliverables: ["Requirements review", "A practical approach", "Agreed next steps"] })),
  questions: [
    { q: "What does this service cover?", a: item.summary + " The exact scope is agreed after reviewing your requirements." },
    { q: "Can this work with our existing environment?", a: "We review your current tools, infrastructure and access requirements before confirming suitable options." },
    { q: "How do we get started?", a: "Share your requirements and the challenge you want to address. We will discuss the information needed to prepare a practical proposal." },
  ],
}));

export const serviceDetails: Service[] = [
  {
    slug: "custom-software", name: "Custom Software", icon: "code", kind: "software", tone: "blue",
    headline: ["Your workflow.", "Your software."],
    summary: "Replace disconnected tools with business software designed around the people and processes that make your company work.",
    introduction: "Off-the-shelf tools do not always fit the way a business operates. We connect requirements, user experience and engineering to build applications that fit your day-to-day work.",
    outcome: "Less work around the system. More work getting done.",
    benefits: ["Bring business workflows into one place", "Give every user the right access", "Connect the tools you already depend on"],
    capabilities: [
      { title: "Business applications", text: "Turn spreadsheets and manual handovers into structured workflows for your team.", deliverables: ["Workflow mapping", "Role-based screens", "Business reporting"] },
      { title: "Web platforms & portals", text: "Give customers, employees and partners a clear place to manage their tasks.", deliverables: ["Customer portals", "Admin tools", "Responsive interfaces"] },
      { title: "Integrations", text: "Connect the applications and data sources involved in your operations.", deliverables: ["API integration", "Data mapping", "Integration testing"] },
      { title: "Modernisation & support", text: "Improve existing applications with a practical migration and maintenance plan.", deliverables: ["Application review", "Migration planning", "Ongoing improvements"] },
    ],
    questions: [
      { q: "Can you improve our existing software?", a: "We can review the current application, identify constraints and discuss whether extending, integrating or rebuilding it makes sense." },
      { q: "How do you estimate a custom application?", a: "We start with your users, workflows and integrations. The agreed scope determines the delivery plan and estimate." },
      { q: "Can you support the application after launch?", a: "Maintenance, upgrades and technical support can be included in the engagement. We agree the scope of support with you." },
    ],
  },
  {
    slug: "web-ecommerce", name: "Web & E-commerce", icon: "globe", kind: "web", tone: "mint",
    headline: ["A better website.", "A clearer path to buy."],
    summary: "Business websites and online stores that make your offer easy to understand and the next step easy to take.",
    introduction: "Your website should work for both your customers and your business. We bring content, navigation and development together so visitors can find what they need on any screen.",
    outcome: "From the first visit to the next order.",
    benefits: ["Help visitors understand your offer", "Make browsing and checkout straightforward", "Manage content and orders with confidence"],
    capabilities: [
      { title: "Business websites", text: "Present your company, services and expertise through clear, responsive pages.", deliverables: ["Content structure", "Responsive pages", "Contact journeys"] },
      { title: "Online stores", text: "Build product browsing and checkout around your catalogue and operations.", deliverables: ["Product catalogue", "Cart & checkout", "Order management"] },
      { title: "Business integrations", text: "Connect your storefront with the payment and operational systems you need.", deliverables: ["Payment integration", "Stock workflows", "Delivery requirements"] },
      { title: "Website improvement", text: "Refine an existing site for usability, maintainability and content management.", deliverables: ["Website review", "CMS improvements", "Maintenance plan"] },
    ],
    questions: [
      { q: "Can our team update the website?", a: "We can include content management for agreed page types, products and other content, with training for your team." },
      { q: "Can you connect local payment methods?", a: "We review the gateways you need and their technical requirements before including an integration in the project scope." },
      { q: "Will the website work on phones?", a: "Responsive layouts and device checks are part of planning a website or store." },
    ],
  },
  {
    slug: "mobile-apps", name: "Mobile Apps", icon: "smartphone", kind: "mobile", tone: "lavender",
    headline: ["Useful in the office.", "Essential in the field."],
    summary: "Mobile applications that put the right tools in the hands of your customers, employees and field teams.",
    introduction: "A useful app starts with the context in which people use it. We consider the user journey, device requirements and connection conditions before shaping the application.",
    outcome: "The right information, wherever work happens.",
    benefits: ["Support customers and field teams", "Connect mobile activity to your business systems", "Design around real device usage"],
    capabilities: [
      { title: "Customer applications", text: "Make your service accessible through a focused mobile experience.", deliverables: ["User journeys", "App screens", "Account flows"] },
      { title: "Employee & field apps", text: "Support business activity away from the desk.", deliverables: ["Task workflows", "Data capture", "Operational reporting"] },
      { title: "Connected applications", text: "Bring mobile interfaces and backend systems together.", deliverables: ["API integration", "Access controls", "Data synchronisation planning"] },
      { title: "App evolution", text: "Improve the experience as your users and business needs develop.", deliverables: ["Usability review", "Release planning", "Ongoing updates"] },
    ],
    questions: [
      { q: "Do you build for Android and iOS?", a: "We discuss the devices and platforms your audience uses, then recommend a suitable approach for the agreed scope." },
      { q: "Can an app work with limited connectivity?", a: "Offline behaviour and synchronisation can be designed for suitable workflows. We define those requirements during discovery." },
      { q: "Can you connect an app to our current system?", a: "We review the available APIs, authentication and data structures to plan the integration." },
    ],
  },
  {
    slug: "iot-solutions", name: "IoT Solutions", icon: "cpu", kind: "iot", tone: "sky",
    headline: ["Connect your devices.", "Understand your operations."],
    summary: "Bring connected hardware, monitoring and business software together for a clearer view of what is happening.",
    introduction: "Device data becomes useful when it reaches the people making decisions. We connect industrial IoT requirements with practical dashboards and operational workflows.",
    outcome: "From a sensor reading to a useful decision.",
    benefits: ["Bring device activity into view", "Make monitoring easier to understand", "Connect operational data with business workflows"],
    capabilities: [
      { title: "Device connectivity", text: "Plan how the hardware in your environment communicates with your software.", deliverables: ["Device requirements", "Connectivity planning", "Data interfaces"] },
      { title: "Monitoring dashboards", text: "Present readings and activity in a way your operators can use.", deliverables: ["Operational views", "Status reporting", "Data visualisation"] },
      { title: "Alerts & workflows", text: "Define how teams respond when readings or conditions need attention.", deliverables: ["Alert rules", "Notification flows", "Response requirements"] },
      { title: "System integration", text: "Connect monitoring with the wider systems your organisation uses.", deliverables: ["API connections", "Data storage planning", "Integration checks"] },
    ],
    questions: [
      { q: "Can you work with our existing devices?", a: "We first review their protocols, connectivity and access to data before proposing a technical approach." },
      { q: "Can you create a monitoring dashboard?", a: "Dashboards can be designed around the readings, history and operational decisions your team needs." },
      { q: "Where do we start with an IoT project?", a: "Start with the operational problem, site conditions and available hardware. That helps us define a useful pilot scope." },
    ],
  },
  {
    slug: "cloud-hosting", name: "Cloud & Hosting", icon: "cloud", kind: "cloud", tone: "blue",
    headline: ["A stronger home", "for your digital business."],
    summary: "Domain, hosting and cloud services planned around your applications, users and operational requirements.",
    introduction: "Infrastructure should support your application as it grows. We help you choose a hosting approach, plan the setup and understand the ongoing support your environment needs.",
    outcome: "Infrastructure that supports the work behind the screen.",
    benefits: ["Choose infrastructure around your workload", "Keep ownership and access organised", "Plan maintenance before problems arise"],
    capabilities: [
      { title: "Domain & hosting", text: "Organise the foundations for your website and business applications.", deliverables: ["Domain requirements", "Hosting setup", "Access handover"] },
      { title: "Cloud environments", text: "Plan resources and environments to match your application needs.", deliverables: ["Resource planning", "Environment configuration", "Deployment support"] },
      { title: "Migration planning", text: "Move applications with a clear view of dependencies and risks.", deliverables: ["Environment review", "Migration checklist", "Post-move checks"] },
      { title: "Managed support", text: "Agree how monitoring, maintenance and assistance will work.", deliverables: ["Support scope", "Maintenance planning", "Operational documentation"] },
    ],
    questions: [
      { q: "Can you move our existing website?", a: "We review the current hosting, application dependencies and data before preparing a migration plan." },
      { q: "What hosting plan do we need?", a: "Traffic, storage, application architecture and operational needs determine the recommendation." },
      { q: "Do you offer ongoing technical support?", a: "Yes. We discuss the environment, responsibilities, coverage and service expectations before agreeing support." },
    ],
  },
  {
    slug: "storage-backup", name: "Storage & Backup", icon: "database", kind: "backup", tone: "mint",
    headline: ["Keep your data.", "Plan your recovery."],
    summary: "Storage and backup services that help your team protect business information and prepare for recovery.",
    introduction: "A backup matters when it can be used. We help you think through what needs protecting, where it belongs and how your business would restore it.",
    outcome: "Data protection with a recovery plan behind it.",
    benefits: ["Understand what needs to be backed up", "Organise retention and access requirements", "Plan and review the restore process"],
    capabilities: [
      { title: "Storage planning", text: "Match capacity, access and protection to the data your business uses.", deliverables: ["Data inventory", "Storage requirements", "Access planning"] },
      { title: "Backup workflows", text: "Define how important business data is copied and retained.", deliverables: ["Backup schedules", "Retention rules", "Responsibility mapping"] },
      { title: "Recovery preparation", text: "Prepare the steps your team would follow to restore operations.", deliverables: ["Recovery priorities", "Restore procedures", "Validation planning"] },
      { title: "Review & maintenance", text: "Keep the approach relevant as your applications and data change.", deliverables: ["Backup reviews", "Configuration checks", "Documentation updates"] },
    ],
    questions: [
      { q: "What information should we back up?", a: "We review your applications and business priorities to identify data, configurations and other assets that need protection." },
      { q: "Can you help us plan disaster recovery?", a: "We can discuss recovery priorities, dependencies and restore requirements as part of a defined engagement." },
      { q: "How often should backups run?", a: "Frequency depends on how often information changes and how much data loss your business can tolerate." },
    ],
  },
  {
    slug: "erp-consulting", name: "ERP Consulting", icon: "target", kind: "erp", tone: "lavender",
    headline: ["Connect your processes.", "Move forward together."],
    summary: "Practical ERP guidance that connects business requirements, people and the systems behind your operations.",
    introduction: "Choosing an ERP starts with understanding the business. We map how departments work together and help turn those needs into a realistic implementation plan.",
    outcome: "A business system your teams can work with.",
    benefits: ["See how departments and data connect", "Choose modules around actual requirements", "Plan adoption alongside implementation"],
    capabilities: [
      { title: "Business process review", text: "Understand the workflows and handovers an ERP needs to support.", deliverables: ["Process mapping", "Requirement gathering", "Gap analysis"] },
      { title: "ERP selection & planning", text: "Compare requirements with a suitable solution and implementation scope.", deliverables: ["Module planning", "Solution discussions", "Implementation roadmap"] },
      { title: "Data & integration", text: "Prepare the information and connections needed for a move.", deliverables: ["Data mapping", "Migration preparation", "Integration requirements"] },
      { title: "Training & improvement", text: "Support the people using the system and refine it as needs evolve.", deliverables: ["User training", "Operational guidance", "Improvement planning"] },
    ],
    questions: [
      { q: "Can you help us evaluate Rupantar ERP?", a: "We can discuss your departments, workflows and reporting needs to assess the relevant product capabilities." },
      { q: "Can we implement in phases?", a: "A phased approach can be planned around priorities, dependencies and your team's capacity for change." },
      { q: "What should we prepare before an ERP discussion?", a: "A list of departments, key workflows, current tools and reporting challenges is a useful starting point." },
    ],
  },
  {
    slug: "seo", name: "SEO & Growth", icon: "megaphone", kind: "seo", tone: "sky",
    headline: ["Make your website", "easier to discover."],
    summary: "A practical approach to technical SEO, website content and organic visibility for your business.",
    introduction: "Search visibility starts with a website that people and search engines can understand. We review the foundations and identify improvements that fit your audience and business goals.",
    outcome: "Be clearer about what you do. Be easier to find.",
    benefits: ["Understand your website's search foundations", "Align pages with the needs of your audience", "Track relevant changes over time"],
    capabilities: [
      { title: "SEO review", text: "Identify technical and content issues that affect discoverability.", deliverables: ["Website review", "Issue prioritisation", "Improvement roadmap"] },
      { title: "Technical foundations", text: "Improve the way your website is structured and accessed.", deliverables: ["Indexing checks", "Page structure", "Performance recommendations"] },
      { title: "Content direction", text: "Shape useful pages around the services and topics your audience needs.", deliverables: ["Topic planning", "On-page recommendations", "Content structure"] },
      { title: "Measurement & iteration", text: "Review meaningful indicators and decide what to improve next.", deliverables: ["Measurement planning", "Progress reviews", "Next-step recommendations"] },
    ],
    questions: [
      { q: "Can you guarantee a first-place ranking?", a: "No. Search rankings depend on many factors outside an agency's control. We focus on appropriate improvements and useful measurement." },
      { q: "Can you improve an existing website?", a: "We can review the website and prioritise changes based on the current technical setup and content." },
      { q: "How quickly will SEO show results?", a: "It varies with the site, competition and scope of work. We discuss expectations after reviewing your starting point." },
    ],
  },
  {
    slug: "dedicated-teams", name: "Dedicated Teams", icon: "handshake", kind: "team", tone: "mint",
    headline: ["More expertise.", "One connected team."],
    summary: "Extend your delivery capacity with people and technical support aligned to your business needs.",
    introduction: "Different projects need different skills. We help define the expertise, responsibilities and communication needed for a useful working relationship.",
    outcome: "The right people, with a clear way to work together.",
    benefits: ["Define the skills your project needs", "Agree responsibilities from the start", "Keep communication connected to delivery"],
    capabilities: [
      { title: "Technical capacity", text: "Discuss the engineering and technical skills your project needs.", deliverables: ["Skill requirements", "Role definition", "Engagement planning"] },
      { title: "Business process support", text: "Explore support for suitable operational and customer-facing workflows.", deliverables: ["Workflow review", "Support requirements", "Responsibility mapping"] },
      { title: "Team collaboration", text: "Agree how the team will communicate, review work and share progress.", deliverables: ["Communication plan", "Review cadence", "Handover requirements"] },
      { title: "Flexible engagement", text: "Shape an engagement around priorities and a realistic scope.", deliverables: ["Scope definition", "Working arrangements", "Progress reviews"] },
    ],
    questions: [
      { q: "What roles can we discuss?", a: "Share the technical or operational skills you need. We will discuss availability and the suitability of an engagement." },
      { q: "Can a team work with our existing staff?", a: "We can agree collaboration tools, responsibilities and a communication rhythm that fits your organisation." },
      { q: "How is the engagement priced?", a: "The roles, responsibilities, duration and scope of work determine the proposal." },
    ],
  },
  ...additionalServices,
];
export const getService = (slug: string) => serviceDetails.find((service) => service.slug === slug);
