'use client';

import SectionHeader from "./SectionHeader";
import StackingCard, { ProjectData } from "@/components/ui/stacking-card";

const processCards: ProjectData[] = [
  {
    stepNumber: "STEP 01",
    title: "Understand",
    subtitle: "Discovery & Architecture Strategy",
    description:
      "We dive deep into your operational workflows, user journeys, and technical dependencies to eliminate blind spots and craft a predictable engineering roadmap.",
    items: [
      {
        title: "Strategic Discovery Workshop",
        desc: "In-depth sessions with stakeholders to align business KPIs, operational goals, and core user roles.",
      },
      {
        title: "Architecture & Feasibility Matrix",
        desc: "Selecting the optimal database, framework, and cloud stack tailored for high concurrency and scalability.",
      },
      {
        title: "Crystal-Clear Scope & Milestone Plan",
        desc: "Comprehensive SRS document and sprint breakdown with predictable timelines and zero surprise costs.",
      },
    ],
    deliverable: "SRS Specification · Tech Architecture · Sprint Roadmap",
    link: "/assets/process/understand.jpg",
    color: "#e8f3fc",
    accentColor: "#0072bc",
  },
  {
    stepNumber: "STEP 02",
    title: "Design",
    subtitle: "UI/UX & Interactive Prototyping",
    description:
      "Before writing a line of code, we sculpt high-converting interfaces and tangible prototypes that your stakeholders and end-users can test, review, and validate.",
    items: [
      {
        title: "User Journeys & Wireframing",
        desc: "Mapping intuitive navigation flows, clear information hierarchies, and responsive screen structures.",
      },
      {
        title: "Design System & Polished UI",
        desc: "Crafting modern, brand-aligned interfaces with consistent design tokens, sleek typography, and components.",
      },
      {
        title: "Clickable Interactive Prototypes",
        desc: "Live Figma prototypes that let your team experience real user interactions and refine UX before development.",
      },
    ],
    deliverable: "Figma Prototype · Component Library · UX Validation Report",
    link: "/assets/process/design.jpg",
    color: "#ede8fa",
    accentColor: "#7c3aed",
  },
  {
    stepNumber: "STEP 03",
    title: "Build",
    subtitle: "Agile Engineering & Rigorous QA",
    description:
      "Our dedicated squads build scalable, enterprise-grade software through focused two-week sprints, paired with automated testing and continuous client demonstrations.",
    items: [
      {
        title: "Focused Two-Week Agile Sprints",
        desc: "Rapid incremental development with working software delivered at every milestone for your continuous feedback.",
      },
      {
        title: "Scalable Clean Architecture",
        desc: "Enterprise frontend and backend engineering following clean code practices, microservices, and secure APIs.",
      },
      {
        title: "Automated Testing & Multi-Device QA",
        desc: "Rigorous unit, integration, and security checks guaranteeing bulletproof stability across web, iOS, and Android.",
      },
    ],
    deliverable: "Production Codebase · Test Coverage Reports · Staging Environment",
    link: "/assets/process/build.jpg",
    color: "#def2eb",
    accentColor: "#0d9488",
  },
  {
    stepNumber: "STEP 04",
    title: "Launch & Support",
    subtitle: "Production Release & 24/7 Operations",
    description:
      "We guarantee a seamless zero-downtime go-live, thorough operational team training, cloud infrastructure scaling, and proactive SLA-backed maintenance.",
    items: [
      {
        title: "Zero-Downtime Deployment",
        desc: "Automated CI/CD pipeline rollout to AWS, cloud clusters, or on-premise servers with instant rollback safety.",
      },
      {
        title: "Hands-On Training & Documentation",
        desc: "Comprehensive operational documentation, user manuals, and admin walk-through sessions for smooth team adoption.",
      },
      {
        title: "Proactive 24/7 Monitoring & SLA",
        desc: "Continuous uptime tracking, automated backups, security patching, and dedicated long-term technical evolution.",
      },
    ],
    deliverable: "Live Production Release · User & Admin Manuals · Ongoing SLA Support",
    link: "/assets/process/launch.jpg",
    color: "#def0fb",
    accentColor: "#0284c7",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 relative overflow-visible">
      <div className="w mb-8">
        <SectionHeader eyebrow="How we work">
          From idea to <em>launch</em>, step by step
        </SectionHeader>
      </div>

      <div className="w-full">
        <StackingCard projects={processCards} />
      </div>
    </section>
  );
}

