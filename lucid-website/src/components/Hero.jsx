export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-cyan-400 mb-4">
          Match. Connect. Own Your Future.
        </h1>
        <p className="text-xl text-gray-200 mb-8">
          AI-powered matchmaking, blockchain-backed trust, and tokenized
          relationships—welcome to Lucid.
        </p>
        <div className="space-x-4">
          <button className="bg-cyan-500 text-white px-8 py-3 rounded-full hover:bg-cyan-600 transition">
            Get Early Access
          </button>
          <button className="border border-cyan-500 text-cyan-500 px-8 py-3 rounded-full hover:bg-cyan-500 hover:text-white transition">
            See How It Works
          </button>
        </div>
      </div>
    </section>
  );
}
