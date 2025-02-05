export default function AIAvatars() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-4xl font-bold text-cyan-400 mb-4">
            Your AI Companion
          </h2>
          <p className="text-gray-200 mb-6">
            Lucid’s AI learns your engagement style, humor, and conversation
            preferences.
          </p>
          <button className="bg-cyan-500 text-white px-8 py-3 rounded-full hover:bg-cyan-600 transition">
            See AI in Action
          </button>
        </div>
        <div className="md:w-1/2">
          <img src="/images/ai-avatar.png" alt="AI Avatar" className="w-full" />
        </div>
      </div>
    </section>
  );
}
