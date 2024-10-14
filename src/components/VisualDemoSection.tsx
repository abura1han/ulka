import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { Rocket, BarChart2, Globe } from "lucide-react"; // Import Lucide icons

const VisualDemoSection = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
        {/* Video or Image */}
        <div className="w-full md:w-1/2">
          <AspectRatio ratio={16 / 9}>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/Un5SEJ8MyPc"
              title="Ulka Platform Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </AspectRatio>
        </div>

        {/* Description */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Experience Ulka in Action
          </h2>
          <p className="text-lg mb-6 text-gray-600">
            Ulka empowers you to seamlessly integrate deep links, simplify user
            journeys, and optimize marketing campaigns. Watch how you can bridge
            the gap between your app and users across every platform.
          </p>
          <ul className="space-y-3 text-left">
            <li className="flex items-center">
              <span className="inline-block bg-blue-600 text-white rounded-full p-3 mr-3">
                <Rocket className="w-5 h-5" />
              </span>
              <span className="text-gray-700">
                Effortless integration across all major platforms.
              </span>
            </li>
            <li className="flex items-center">
              <span className="inline-block bg-blue-600 text-white rounded-full p-3 mr-3">
                <BarChart2 className="w-5 h-5" />
              </span>
              <span className="text-gray-700">
                Real-time analytics for deeper insights and optimization.
              </span>
            </li>
            <li className="flex items-center">
              <span className="inline-block bg-blue-600 text-white rounded-full p-3 mr-3">
                <Globe className="w-5 h-5" />
              </span>
              <span className="text-gray-700">
                Global reach for maximum engagement across all channels.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VisualDemoSection;

