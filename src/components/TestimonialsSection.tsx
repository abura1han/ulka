import React from "react";

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-12 text-center text-gray-800">
          Trusted by Innovative Companies
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Sarah Johnson"
            role="Head of Marketing"
            company="TechStart Inc."
            content="Ulka has revolutionized our app marketing strategy. The ease of use and powerful analytics have helped us increase user engagement by 40%."
          />
          <TestimonialCard
            name="Michael Chen"
            role="Lead Developer"
            company="AppNova"
            content="As a developer, I appreciate how simple it is to integrate Ulka into our workflow. The documentation is clear, and the API is a dream to work with."
          />
          <TestimonialCard
            name="Emily Roberts"
            role="Product Manager"
            company="SocialConnect"
            content="The cross-platform support Ulka offers has been a game-changer for us. We can now provide a seamless experience for all our users, regardless of their device."
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

const TestimonialCard = ({
  name,
  role,
  company,
  content,
}: {
  name: string;
  role: string;
  company: string;
  content: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <p className="text-gray-600 mb-4">
      {'"'}
      {content}
      {'"'}
    </p>
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">
          {role}, {company}
        </p>
      </div>
    </div>
  </div>
);
