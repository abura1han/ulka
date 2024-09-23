import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const PricingPage = () => {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "1,000 monthly link clicks",
        "Basic analytics",
        "Android & iOS support",
        "Web fallback",
        "Community support",
      ],
      notIncluded: [
        "Custom domains",
        "Advanced analytics",
        "Priority support",
        "API access",
        "White-labeling",
      ],
    },
    {
      name: "Pro",
      price: "$49",
      period: "per month",
      features: [
        "50,000 monthly link clicks",
        "Advanced analytics",
        "Android & iOS support",
        "Web fallback",
        "Custom domains",
        "API access",
        "Priority email support",
        "Team collaboration (up to 5 members)",
      ],
      notIncluded: ["White-labeling", "Unlimited team members"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      features: [
        "Unlimited monthly link clicks",
        "Advanced analytics with custom reports",
        "Android & iOS support",
        "Web fallback",
        "Multiple custom domains",
        "Full API access",
        "24/7 priority support",
        "White-labeling",
        "Unlimited team members",
        "Dedicated account manager",
        "Custom integration support",
      ],
      notIncluded: [],
    },
  ];

  const FeatureItem = ({
    text,
    included,
  }: {
    text: string;
    included: boolean;
  }) => (
    <li className="flex items-center space-x-2">
      {included ? (
        <Check className="text-green-500" />
      ) : (
        <X className="text-red-500" />
      )}
      <span>{text}</span>
    </li>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-700 text-white">
      <header className="container mx-auto py-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Ulka Pricing</h1>
        <p className="text-xl">
          Choose the perfect plan for your deeplinking needs
        </p>
      </header>

      <main className="container mx-auto py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-lg border-none text-white"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {tier.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-sm ml-2">/ {tier.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, i) => (
                    <FeatureItem key={i} text={feature} included={true} />
                  ))}
                  {tier.notIncluded.map((feature, i) => (
                    <FeatureItem key={i} text={feature} included={false} />
                  ))}
                </ul>
                <Button className="w-full bg-white text-purple-700 hover:bg-purple-100">
                  {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                What happens if I exceed my monthly clicks?
              </h3>
              <p>
                We won{"'"}t cut you off. Your links will continue to work, but
                we{"'"}ll reach out to discuss upgrading your plan.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Can I switch plans at any time?
              </h3>
              <p>
                Yes, you can upgrade, downgrade, or cancel your plan at any
                time. Changes take effect at the start of the next billing
                cycle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Do you offer a free trial of the Pro plan?
              </h3>
              <p>
                Yes, we offer a 14-day free trial of the Pro plan. No credit
                card required to start.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                What kind of support do you offer?
              </h3>
              <p>
                Free users get community support. Pro users receive priority
                email support. Enterprise clients enjoy 24/7 dedicated support.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto py-8 text-center">
        <p>&copy; 2024 Ulka. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PricingPage;
