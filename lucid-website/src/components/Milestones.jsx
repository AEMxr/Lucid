import React from "react";

export default function Milestones() {
  const milestones = [
    { title: "First Date NFT" },
    { title: "Official Relationship NFT" },
    { title: "Moving In Together NFT" },
    { title: "Marriage NFT" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-cyan-400 mb-8">
          Relationship Milestones
        </h2>
        <div className="flex justify-center space-x-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="p-6 bg-indigo-800 rounded-lg">
              <h3 className="text-xl font-bold text-cyan-400">
                {milestone.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
