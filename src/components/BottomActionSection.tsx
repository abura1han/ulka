import Link from "next/link";
import React from "react";

const BottomActionSection = () => {
  return (
    <section className="py-20 bg-blue-600 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">
          Ready to Supercharge Your App Links?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of developers and marketers who are already using Ulka
          to improve their app ecosystem.
        </p>
        <Link
          href="/signup"
          className="inline-block font-medium bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Get Started for Free
        </Link>
      </div>
    </section>
  );
};

export default BottomActionSection;
