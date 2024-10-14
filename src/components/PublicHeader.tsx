"use client";

import { useState } from "react";
import { Github, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PublicHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container max-w-[1200px] mx-auto py-4 px-4 flex justify-between items-center">
        {/* Logo */}
        <Image width={120} height={40} src="/images/logo-dark.svg" alt="Ulka" />

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-600 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Navigation for Desktop */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link
            href="#features"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="https://github.com/abura1han/ulka"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Github className="w-4 h-4 mr-2" /> GitHub
          </Link>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg rounded-md p-4 space-y-4">
            <Link
              href="#features"
              className="block text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="block text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="block text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="https://github.com/abura1han/ulka"
              className="inline-flex items-center w-full justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Github className="w-4 h-4 mr-2" /> GitHub
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;
