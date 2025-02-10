import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah",
      quote: "Finally, a dating platform that prioritizes real connections.",
      image: "/images/testimonial1.jpg",
      role: "Member since 2023",
    },
    {
      name: "Daniel",
      quote: "Lucid's AI understands me better than I do.",
      image: "/images/testimonial2.jpg",
      role: "Premium Member",
    },
    {
      name: "Emily",
      quote: "No scams, no games—just real people.",
      image: "/images/testimonial3.jpg",
      role: "Verified User",
    },
  ];

  return (
    <section
      className="py-20"
      style={{
        background: "black",
      }}
    >
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-white mb-16">
          What Users Are Saying
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-sm
                         border border-white/20 shadow-xl hover:shadow-white/20 
                         transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-8">
                <svg
                  className="w-8 h-8 text-white/40 mb-4 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-white mb-6 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-white/20 pt-4">
                  <p className="text-white font-bold text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-white/80 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
