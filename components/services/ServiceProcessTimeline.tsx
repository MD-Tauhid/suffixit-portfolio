import design from "./DetailPage.module.css";

type DeliveryStep = { title: string; text: string; output: string };
const deliverySteps: DeliveryStep[] = [
  { title: "Understand", text: "Discuss your goals, existing systems and the people who will use the solution.", output: "Shared requirements & scope" },
  { title: "Shape", text: "Review the approach, priorities and responsibilities before implementation begins.", output: "Agreed approach & delivery plan" },
  { title: "Build & review", text: "Work through implementation with regular progress reviews and validation.", output: "Reviewed & tested implementation" },
  { title: "Launch & support", text: "Prepare the handover, help your team get started and agree ongoing support.", output: "Handover & support arrangements" },
];
const teamSteps: DeliveryStep[] = [
  { title: "Define the need", text: "Share the skills, priorities and working arrangements your project needs.", output: "Role & skill requirements" },
  { title: "Shape the team", text: "Review suitable expertise, responsibilities and the scope of the engagement.", output: "Agreed roles & engagement" },
  { title: "Work together", text: "Connect the team to your tools, workflows and communication channels.", output: "A shared working rhythm" },
  { title: "Review & evolve", text: "Review progress together and adjust the engagement as priorities develop.", output: "Progress reviews & next steps" },
];

export default function ServiceProcessTimeline({ team = false }: { team?: boolean }) {
  const steps = team ? teamSteps : deliverySteps;
  return <div className={design.process} data-service-process>
    <span className={design.processLine} data-service-progress aria-hidden="true" />
    {steps.map((step, index) => <article key={step.title} className={design.processStep}>
      <span className={design.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
      <h3>{step.title}</h3><p>{step.text}</p><span className={design.stepOutput}>{step.output}</span>
    </article>)}
  </div>;
}
