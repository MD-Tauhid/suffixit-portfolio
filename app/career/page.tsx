import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Compass,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Mail,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import ServiceShell, {
  ServiceCTA,
  serviceButton,
  serviceContainer,
  serviceHeading,
} from "@/components/services/ServiceShell";
import { servicePalette } from "@/lib/service-palette";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers & Open Positions | Suffix IT Limited",
  description:
    "Join Suffix IT Limited in Dhaka, Bangladesh. Explore open engineering, mobile development, ERP consulting, and cloud roles.",
  alternates: { canonical: "/career" },
};

const openRoles = [
  {
    title: "Senior Full-Stack Engineer (Next.js & Node.js)",
    department: "Software Engineering",
    type: "Full-time",
    location: "Dhaka (Hybrid)",
    experience: "4+ years",
    description:
      "Architect high-throughput enterprise web applications, ERP dashboards, and microservices for large-scale operations.",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    title: "Senior Flutter / Mobile App Developer",
    department: "Mobile Engineering",
    type: "Full-time",
    location: "Dhaka (Hybrid)",
    experience: "3+ years",
    description:
      "Build butter-smooth 60fps cross-platform mobile apps for field force management, GPS telemetry, and retail POS.",
    skills: ["Flutter", "Dart", "SQLite Offline Sync", "REST APIs", "Native Android/iOS"],
  },
  {
    title: "DevOps & Cloud Infrastructure Engineer",
    department: "Cloud Architecture",
    type: "Full-time",
    location: "Dhaka (On-site / Hybrid)",
    experience: "3+ years",
    description:
      "Manage AWS/GCP multi-AZ clusters, automated Kubernetes deployments, CI/CD pipelines, and 24/7 SRE telemetry.",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD", "Prometheus"],
  },
  {
    title: "ERP & Business Systems Consultant",
    department: "Enterprise Consulting",
    type: "Full-time",
    location: "Dhaka",
    experience: "3+ years",
    description:
      "Work directly with enterprise clients to audit supply chain workflows, general ledger accounts, and NBR VAT compliance.",
    skills: ["ERP Systems", "Supply Chain", "Financial Accounting", "VAT/Tax Audit"],
  },
];

const perks = [
  {
    icon: Laptop,
    title: "Modern Tech Stack",
    desc: "Work with modern frameworks, high-end hardware, and cutting-edge cloud tooling.",
  },
  {
    icon: Rocket,
    title: "Rapid Career Growth",
    desc: "Transparent promotion pathways, leadership mentorship, and technical ownership.",
  },
  {
    icon: GraduationCap,
    title: "Learning & Certifications",
    desc: "Dedicated allowances for professional certifications (AWS, Kubernetes, Scrum).",
  },
  {
    icon: HeartHandshake,
    title: "Inclusive Culture",
    desc: "Collaborative, ego-free engineering environment where your ideas take center stage.",
  },
  {
    icon: Clock,
    title: "Work-Life Harmony",
    desc: "Flexible hybrid working arrangements, supportive sick leave, and paid vacations.",
  },
  {
    icon: ShieldCheck,
    title: "Provident Fund & Festival Bonuses",
    desc: "Company-contributed provident fund, bi-annual festival bonuses, and health coverage.",
  },
];

export default function CareerPage() {
  return (
    <ServiceShell>
      {/* 1. Hero Section */}
      <section
        className="relative overflow-hidden border-b border-[#0072bc]/10 !pt-20 !pb-16 md:!pt-24 md:!pb-20"
        style={{ backgroundColor: servicePalette.blue }}
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-[480px] rounded-full border-[50px] border-white/50 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 size-96 rounded-full bg-white/40 blur-3xl"
          aria-hidden="true"
        />

        <div className={serviceContainer}>
          <div className="mx-auto max-w-[850px] text-center" data-service-stagger>
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#0072bc]/15 bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <span className="size-2 rounded-full bg-[var(--br)] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--br)]">
                Careers at Suffix IT
              </span>
            </div>

            <h1 className="text-[clamp(36px,5.5vw,72px)] font-extrabold leading-[1.08] tracking-[-2px] text-[#062b43]">
              Build software.
              <br />
              Solve real problems.
              <br />
              <em className="font-normal italic text-[var(--br)] [font-family:var(--font-serif),Georgia,serif]">
                Grow with us.
              </em>
            </h1>

            <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.85] text-[#17162a]/75 md:text-base">
              Put your technical craft, curiosity, and product mindset to work on mission-critical business
              applications, high-impact IoT hardware, and digital infrastructure across Bangladesh and beyond.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#openings" className={serviceButton}>
                <span>Explore Open Positions</span>
                <ArrowRight size={17} />
              </a>
              <a
                href={`mailto:${site.email}?subject=General%20Career%20Application`}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[#0072bc]/20 bg-white px-6 py-3 text-[13px] font-semibold text-[#062b43] transition-all hover:border-[var(--br)] hover:text-[var(--br)]"
              >
                <Mail size={16} />
                <span>Send Open CV</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Perks & Culture */}
      <section className="bg-white !py-20 md:!py-28 border-b border-[#e2eaf4]">
        <div className={serviceContainer}>
          <div className="mb-14 text-center max-w-[700px] mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--br)]">
              Life at Suffix IT
            </span>
            <h2 className={serviceHeading}>
              Why engineers and builders
              <br />
              <span className="text-[var(--br)]">choose Suffix IT.</span>
            </h2>
            <p className="mt-4 text-sm leading-[1.8] text-[#557086]">
              We value clean engineering, clear architecture, autonomy, and continuous learning.
              Here is what you can look forward to.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="rounded-[24px] border border-[#dce8f5] bg-[#fbfdff] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--br)] hover:shadow-[0_15px_35px_-10px_rgba(0,114,188,0.15)]"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[#0072bc]/10 text-[var(--br)] mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#062b43]">{perk.title}</h3>
                  <p className="mt-2 text-xs leading-[1.8] text-[#557086]">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Open Roles */}
      <section id="openings" className="bg-[#f8fbfe] !py-20 md:!py-28 border-b border-[#e2eaf4]">
        <div className={serviceContainer}>
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--br)]">
                Current Opportunities
              </span>
              <h2 className={serviceHeading}>
                Open positions across
                <br />
                <span className="text-[var(--br)]">engineering &amp; product.</span>
              </h2>
            </div>
            <p className="max-w-[400px] text-xs text-[#557086] leading-[1.75]">
              Don&apos;t see your exact role? Send your resume to{" "}
              <a
                href={`mailto:${site.email}?subject=Open%20Application`}
                className="font-bold text-[var(--br)] hover:underline"
              >
                {site.email}
              </a>
              . We are always looking for curious talent.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="rounded-[24px] border border-[#dbe8f5] bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:border-[var(--br)] hover:shadow-md"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-[720px]">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#557086] mb-2">
                      <span className="font-bold text-[var(--br)]">{role.department}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Briefcase size={13} /> {role.type}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={13} /> {role.location}
                      </span>
                      <span>•</span>
                      <span>{role.experience}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#062b43]">{role.title}</h3>
                    <p className="mt-2 text-xs leading-[1.8] text-[#557086]">{role.description}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {role.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-[#f0f6fb] px-2.5 py-1 text-[11px] font-medium text-[#415a6e]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 pt-3 lg:pt-0">
                    <a
                      href={`mailto:${site.email}?subject=Application%20for%20${encodeURIComponent(
                        role.title
                      )}`}
                      className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[var(--br)] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#005a96]"
                    >
                      <span>Apply Now</span>
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <ServiceCTA
        title="Ready to build the next generation of enterprise software?"
      />
    </ServiceShell>
  );
}

