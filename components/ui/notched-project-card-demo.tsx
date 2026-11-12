import { NotchedProjectCard } from "@/components/ui/notched-project-card";

/* Three cards, one per device (desktop, phone, tablet), and three
   confessions from a designer who would rather not build her own cards. */

export default function Demo() {
  return (
    <div className="grid w-full max-w-6xl gap-x-5 gap-y-12 p-6 min-[700px]:grid-cols-3 lg:gap-x-8 lg:p-8">
      {/* desktop: the window runs off the bottom-right corner */}
      <NotchedProjectCard
        href="#"
        title="Ctrl+C, Ctrl+V, Ship"
        description="A landing page built in the time it took my coffee to cool. Searched 21st.dev, found a card, pasted it. Nobody needs to know."
        image="https://cdn.21st.dev/assets/mirror/c5/c5c57791868384517fc58d770bd31ef697db8f20d82c2472fcdfbca4746cd9c9.jpg"
        badge="2026"
        tags={["Copy-paste", "Speedrun"]}
        monochrome
        accent="#DA8956"
      />
      {/* phone: rises out of the bottom edge, its foot cropped */}
      <NotchedProjectCard
        href="#"
        title="The Button I Didn't Design"
        description="Three weeks agonising over a border radius. Then I found one on 21st.dev that was already perfect. Therapy is expensive, components are free."
        image="https://cdn.21st.dev/assets/mirror/41/419cedf31b174aecd64085fa834ce51a307f65ab5245408c5fe988c3f8c42eb5.jpg"
        badge="2025"
        tags={["Self-care", "Zero effort"]}
        monochrome
        accent="#DA8956"
      />
      {/* tablet: stands in the bottom-right corner, running off both edges */}
      <NotchedProjectCard
        href="#"
        title="Dashboard, Eventually"
        description="Planned to build it from scratch this weekend. Installed it from 21st.dev in one command instead, then took a well-deserved nap."
        image="https://cdn.21st.dev/assets/mirror/da/da6e06827db10c0af8f419f8eca7041264c487235b31f8302cced094c16e657a.jpg"
        badge="2024"
        tags={["Nap-driven", "With AI"]}
        monochrome
        accent="#DA8956"
      />
    </div>
  );
}

