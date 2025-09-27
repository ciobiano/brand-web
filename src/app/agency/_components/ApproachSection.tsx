const steps = [
  {
    title: "Discover",
    description:
      "We surface the insight, guardrails, and success metrics we need to move quickly and make confident bets.",
  },
  {
    title: "Design",
    description:
      "Collaborative sprints turn strategy into tangible journeys, states, and systems ready for handoff.",
  },
  {
    title: "Develop",
    description:
      "Multidisciplinary squads bring the experience to life with production-ready code and automated QA.",
  },
  {
    title: "Evolve",
    description:
      "We stay close after launch, iterating with data, experiments, and growth-minded enhancements.",
  },
];

export default function ApproachSection() {
  return (
    <section className="bg-[#09090A] py-24 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">
            How we work
          </p>
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            A proven rhythm that keeps momentum high from kickoff to iteration.
          </h2>
        </div>
        <div className="mt-12 space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-white/[0.04] p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-base font-semibold text-white/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
              </div>
              <p className="text-base text-white/70 sm:max-w-3xl">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
