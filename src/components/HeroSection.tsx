import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Supercharge Your App Links with Ulka
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Boost engagement, simplify user journeys, and seamlessly connect users
          across platforms with intelligent deeplinking.
        </p>
        <Link
          href="/u/apps"
          className="inline-block font-medium bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Get Started for Free
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
