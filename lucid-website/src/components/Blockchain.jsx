import React from "react";

export default function Blockchain() {
  return (
    <section className="py-20 bg-purple-900">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-cyan-400 mb-8">
          Blockchain & Trust System
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-indigo-800 rounded-lg">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">
              Why Blockchain?
            </h3>
            <p className="text-gray-200">
              Prevents scams, ghosting, and manipulation.
            </p>
          </div>
          <div className="p-6 bg-indigo-800 rounded-lg">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">
              NFT Milestones
            </h3>
            <p className="text-gray-200">
              Track relationship progress as NFTs.
            </p>
          </div>
          <div className="p-6 bg-indigo-800 rounded-lg">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">
              Lucid Tokens (LCT)
            </h3>
            <p className="text-gray-200">
              Power identity verification and rewards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
