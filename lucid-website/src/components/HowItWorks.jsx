import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      title: "AI Personality Test",
      description: "Answer deep-learning-driven questions.",
    },
    {
      title: "AI Avatar Training",
      description: "Lucid’s AI learns your preferences.",
    },
    {
      title: "Blockchain Verification",
      description: "Eliminate catfishing and fake accounts.",
    },
    {
      title: "AI Predicts Your Match",
      description: "Find partners who match your lifestyle.",
    },
  ];

  return (
    <section className="py-20 bg-purple-900">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-cyan-400 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="p-6 bg-indigo-800 rounded-lg">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-200">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
