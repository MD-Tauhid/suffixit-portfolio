import SectionHeader from "./SectionHeader";
import Icon from "@/components/ui/Icon";

const industries = [
  {
    icon: "store",
    title: "Retail & Distribution",
    desc: "Manage outlets, inventory tracking, orders and field sales teams with real-time mobile sync.",
    tags: ["Field Force", "POS"],
    gradientFrom: "#0284c7",
    gradientTo: "#0072bc",
    href: "#fieldforce",
  },
  {
    icon: "building-2",
    title: "Enterprise",
    desc: "End-to-end HR lifecycle, biometric payroll, automated finance, and multi-branch operations.",
    tags: ["Rupantar HCM", "ERP"],
    gradientFrom: "#8b5cf6",
    gradientTo: "#6366f1",
    href: "#products",
  },
  {
    icon: "hotel",
    title: "Hospitality",
    desc: "Interactive room inventory, online reservations, front-desk check-in, and guest workflows.",
    tags: ["Hotel Booking"],
    gradientFrom: "#f59e0b",
    gradientTo: "#ea580c",
    href: "#products",
  },
  {
    icon: "radio-tower",
    title: "Telecom",
    desc: "Carrier-grade CDR rating engine, interconnect voice & SMS settlements at telco scale.",
    tags: ["Interconnect Billing"],
    gradientFrom: "#06b6d4",
    gradientTo: "#0284c7",
    href: "#products",
  },
  {
    icon: "shopping-bag",
    title: "E-commerce",
    desc: "High-converting online storefront with multi-currency cart, payment gateways & stock sync.",
    tags: ["E-commerce", "Hosting"],
    gradientFrom: "#10b981",
    gradientTo: "#059669",
    href: "#products",
  },
  {
    icon: "coins",
    title: "Finance & HR",
    desc: "Statutory provident fund ledgers, interest accrual, loan approvals and statutory audit ready.",
    tags: ["Suffix PF", "Payroll"],
    gradientFrom: "#3b82f6",
    gradientTo: "#4f46e5",
    href: "#products",
  },
  {
    icon: "megaphone",
    title: "Marketing & Comms",
    desc: "High-throughput transactional SMS gateway paired with WebRTC team conference rooms.",
    tags: ["Bulk SMS", "Web Meeting"],
    gradientFrom: "#ec4899",
    gradientTo: "#8b5cf6",
    href: "#products",
  },
  {
    icon: "rocket",
    title: "Startups & SMEs",
    desc: "Rapid MVPs, custom web platforms and mobile apps built to scale with your business traction.",
    tags: ["Custom Software", "Mobile"],
    gradientFrom: "#f97316",
    gradientTo: "#e11d48",
    href: "#services",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="py-20 md:py-28 relative bg-[#f8fbfe] overflow-hidden">
      {/* Ambient soft background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-[#0072bc]/5 to-[#7c3aed]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Industries"
            text="Find the Suffix product that fits the way your industry works."
          >
            Solutions for every <em>kind of business</em>
          </SectionHeader>
        </div>

        {/* ========================================================
            SKEWED GRADIENT GLASS CARD SHOWCASE GRID (LIGHT LUXURY)
            Features:
            - 15-degree skewed vibrant gradient backdrops
            - Soft 28px glowing colorful aura
            - Floating glossy glass blob animation on hover
            - Backdrop-blur white frosted card with soft border lighting
            - Tailored gradient palettes for each industry
           ======================================================== */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-8"
          style={{
            rowGap: "clamp(64px, 6.5vw, 92px)",
            columnGap: "clamp(24px, 2.8vw, 42px)",
          }}
        >
          {industries.map((item) => (
            <div
              key={item.title}
              className="group relative w-full min-h-[390px] transition-all duration-500"
            >
              {/* Skewed gradient panel 1 (Sharp Base) */}
              <span
                className="absolute top-0 left-[35px] w-1/2 h-full rounded-2xl transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)] pointer-events-none"
                style={{
                  background: `linear-gradient(315deg, ${item.gradientFrom}, ${item.gradientTo})`,
                }}
              />

              {/* Skewed gradient panel 2 (Glowing Atmosphere Blur) */}
              <span
                className="absolute top-0 left-[35px] w-1/2 h-full rounded-2xl transform skew-x-[15deg] blur-[28px] opacity-40 transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)] group-hover:opacity-70 pointer-events-none"
                style={{
                  background: `linear-gradient(315deg, ${item.gradientFrom}, ${item.gradientTo})`,
                }}
              />

              {/* Animated Floating Glossy Glass Blobs */}
              <span className="pointer-events-none absolute inset-0 z-10">
                <span className="absolute top-0 left-0 w-0 h-0 rounded-2xl opacity-0 bg-white/85 backdrop-blur-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-white transition-all duration-300 animate-blob group-hover:top-[-26px] group-hover:left-[18px] group-hover:w-[65px] group-hover:h-[65px] group-hover:opacity-100" />
                <span className="absolute bottom-0 right-0 w-0 h-0 rounded-2xl opacity-0 bg-white/85 backdrop-blur-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-white transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-26px] group-hover:right-[18px] group-hover:w-[65px] group-hover:h-[65px] group-hover:opacity-100" />
              </span>

              {/* Frosted Glass Content Card (Light Luxury) */}
              <div className="relative z-20 h-full p-6 sm:p-7 bg-white/90 backdrop-blur-[16px] border border-white/80 rounded-2xl text-[#17162a] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] flex flex-col justify-between transition-all duration-500 group-hover:translate-x-[-10px] group-hover:-translate-y-2 group-hover:border-white group-hover:bg-white/95 group-hover:shadow-[0_22px_45px_-10px_rgba(0,0,0,0.12)]">
                <div>
                  {/* Top: Icon + Tags */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                      }}
                    >
                      <Icon name={item.icon} size={22} />
                    </div>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#f0f6fd] text-[#0072bc] border border-[#d2e4f7]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#17162a] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-[#515978] text-sm leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-4 border-t border-[#f0f4f9] flex items-center justify-between">
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0072bc] bg-[#f0f6fd] hover:bg-[#0072bc] hover:text-white px-4 py-2 rounded-xl border border-[#d2e4f7] transition-all duration-300 shadow-sm group-hover:shadow-md"
                  >
                    <span>Explore Solutions</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                  <span className="text-[11px] text-[#838fa6] font-semibold">Enterprise ready</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
