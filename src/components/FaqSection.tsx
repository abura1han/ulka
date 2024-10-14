import React from "react";

const FaqSection = () => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-12 text-center text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              q: "What happens if I exceed my monthly clicks?",
              a: "We won't cut you off. Your links will continue to work, but we'll reach out to discuss upgrading your plan to better suit your needs.",
            },
            {
              q: "Can I switch plans at any time?",
              a: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of the next billing cycle.",
            },
            {
              q: "Do you offer a free trial of the Pro plan?",
              a: "Yes, we offer a 14-day free trial of the Pro plan. No credit card is required to start.",
            },
            {
              q: "Is Ulka compatible with my app's tech stack?",
              a: "Ulka is designed to be compatible with a wide range of technologies. Our documentation covers integration with popular frameworks and platforms.",
            },
            {
              q: "How does Ulka handle user privacy and data protection?",
              a: "We take privacy seriously. Ulka complies with GDPR and CCPA, and we never sell user data. We only collect necessary information to provide our service.",
            },
            {
              q: "Can I use Ulka for marketing campaigns?",
              a: "Absolutely! Ulka is perfect for marketing campaigns. You can create custom links for different channels and track their performance in our analytics dashboard.",
            },
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{item.q}</h3>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
