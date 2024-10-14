import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    features: [
      "1,000 monthly clicks",
      "Basic analytics",
      "Community support",
      "Android & iOS support",
      "Web fallback",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    features: [
      "50,000 monthly clicks",
      "Advanced analytics",
      "Priority email support",
      "Custom domains",
      "API access",
      "Team collaboration (up to 5 members)",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited clicks",
      "Advanced analytics with custom reports",
      "24/7 priority support",
      "Multiple custom domains",
      "Full API access",
      "White-labeling",
      "Dedicated account manager",
      "Custom integration support",
    ],
  },
];

// PlanCard component for reusability
const PlanCard = ({
  name,
  price,
  period,
  features,
  isEnterprise,
}: {
  name: string;
  price: string;
  period?: string;
  features: string[];
  isEnterprise: boolean;
}) => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg text-center flex flex-col justify-between">
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="text-4xl font-bold mb-1">{price}</div>
      {period && <div className="text-sm text-gray-500 mb-4">{period}</div>}
      <ul className="mb-6 space-y-3 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="w-5 h-5 mr-2 text-green-500" aria-hidden="true" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-md transition-colors duration-300"
        aria-label={isEnterprise ? "Contact Sales" : `Get Started with ${name}`}
      >
        {name === "Pro"
          ? "Coming soon"
          : isEnterprise
          ? "Coming soon"
          : "Get Started"}
      </button>
    </div>
  );
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center text-gray-800">
          Transparent Pricing for Every Need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((plan, index) => (
            <PlanCard
              key={index}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              isEnterprise={plan.name === "Enterprise"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
