"use client";

import Link from "next/link";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const HomePage = () => {
  return (
    <>
      <main className="container mx-auto py-12 px-4 lg:px-0 ">
        <section className="text-center bg-gradient-to-r from-yellow-300 to-yellow-400 text-purple-700 py-16 rounded-lg shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Supercharge Your App Links?
          </h2>
          <Link
            href={"/u/apps"}
            className="font-medium bg-purple-700 text-yellow-300 hover:bg-purple-800 text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Started with Ulka
          </Link>
        </section>
      </main>

      <footer className="container mx-auto py-8 text-center">
        <p>&copy; 2024 Ulka. Open-source and proud.</p>
      </footer>
    </>
  );
};

export default HomePage;
