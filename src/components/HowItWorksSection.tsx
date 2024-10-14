import { ArrowRight } from "lucide-react";
import React from "react";

// Define the types for the props that the StepCard will accept
interface StepCardProps {
  step: number;
  text: string;
  description: string;
  showArrow: boolean;
}

// StepCard component with TypeScript
const StepCard: React.FC<StepCardProps> = ({
  step,
  text,
  description,
  showArrow,
}) => {
  return (
    <div className="flex flex-col items-center max-w-xs text-center">
      <div
        className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4"
        aria-label={`Step ${step}`}
      >
        <span className="text-2xl font-bold">{step}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{text}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {showArrow && (
        <ArrowRight
          className="hidden md:block text-blue-600 mt-8"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

// Define the type for the steps
interface Step {
  step: number;
  text: string;
  description: string;
}

const HowItWorksSection: React.FC = () => {
  const steps: Step[] = [
    {
      step: 1,
      text: "Create a custom URL",
      description:
        "Use our intuitive dashboard or api to generate smart, customized links for your app.",
    },
    {
      step: 2,
      text: "Share your link",
      description:
        "Distribute your Ulka link across various marketing channels and platforms.",
    },
    {
      step: 3,
      text: "Ulka works its magic",
      description:
        "When a user clicks, Ulka intelligently routes them to the right destination.",
    },
    {
      step: 4,
      text: "Analyze and optimize",
      description:
        "Track link performance and user behavior to refine your app marketing strategy.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-100">
      <div className="container max-w-[1200px] mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center text-gray-800">
          How Ulka Works
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
          {steps.map((item, index) => (
            <StepCard
              key={index}
              step={item.step}
              text={item.text}
              description={item.description}
              showArrow={index < steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
