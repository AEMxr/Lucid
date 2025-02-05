export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah",
      quote: "Finally, a dating platform that prioritizes real connections.",
    },
    { name: "Daniel", quote: "Lucid’s AI understands me better than I do." },
    { name: "Emily", quote: "No scams, no games—just real people." },
  ];

  return (
    <section className="py-20 bg-purple-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-cyan-400 mb-8">
          What Users Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-indigo-800 rounded-lg">
              <p className="text-gray-200 mb-4">"{testimonial.quote}"</p>
              <p className="text-cyan-400 font-bold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
