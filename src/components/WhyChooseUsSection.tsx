import { BarChart, Globe, Shield, Smartphone, Users, Zap } from "lucide-react";
import { ReactNode } from "react";

const WhyChooseUsSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container max-w-[1200px] mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-12 text-center text-gray-800">
          Why Choose Ulka?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Smartphone className="w-8 h-8" />}
            title="Smart Routing"
            description="Intelligent links that direct users to your app or app store, providing a seamless experience across all platforms."
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8" />}
            title="Cross-Platform Support"
            description="Full support for Android, iOS, and web, ensuring no user is left behind, regardless of their device."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Easy Integration"
            description="Simple API and clear documentation make implementation a breeze for developers of all skill levels."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Robust Security"
            description="Advanced security measures to protect your links and user data from potential threats."
          />
          <FeatureCard
            icon={<BarChart className="w-8 h-8" />}
            title="Detailed Analytics"
            description="Gain valuable insights into user behavior with our comprehensive analytics dashboard."
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Team Collaboration"
            description="Effortlessly manage links and campaigns with multi-user access and role-based permissions."
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
