"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Github, Globe, LinkIcon, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const HomePage = () => {
  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-700 text-white">
      <header className="container mx-auto py-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Ulka</h1>
          <p className="text-xl">The ultimate app deeplinking solution</p>
        </div>
        <nav className="flex items-center gap-x-3">
          <Button variant="ghost" className="mr-4 hover:bg-white/10">
            <Github className="mr-2" /> GitHub
          </Button>
          <Link
            href="/pricing"
            className={buttonVariants({
              variant: "secondary",
              className: "block",
            })}
          >
            Pricing
          </Link>
        </nav>
      </header>

      <main className="container mx-auto py-12">
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Supercharge Your App Links with{" "}
                <span className="text-yellow-300">Ulka</span>
              </h2>
              <p className="text-xl mb-8">
                Seamless deeplinking across platforms. Boost user engagement and
                simplify your app{"'"}s ecosystem.
              </p>
              <Button className="bg-yellow-300 text-purple-700 hover:bg-yellow-400 text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                Get Started with Ulka
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 h-[400px]">
              <Slider {...sliderSettings} adaptiveHeight>
                <div className="relative">
                  <Image
                    src="/images/butterfly.jpg"
                    alt="Ulka in action 1"
                    className="rounded-lg w-full h-[400px] object-contain"
                    width={300}
                    height={400}
                  />
                </div>
                <div>
                  <Image
                    src="/images/butterfly.jpg"
                    alt="Ulka in action 1"
                    className="rounded-lg w-full h-[400px] object-contain"
                    width={300}
                    height={400}
                  />
                </div>
                <div>
                  <Image
                    src="/images/butterfly.jpg"
                    alt="Ulka in action 1"
                    className="rounded-lg w-full h-[400px] object-contain"
                    width={300}
                    height={400}
                  />
                </div>
              </Slider>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Seamless App Linking for Every Scenario
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-lg border-none text-white hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2 text-yellow-300" />
                  Smart Routing
                </CardTitle>
              </CardHeader>
              <CardContent>
                Create custom URLs that intelligently route users to your app or
                app store.
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-none text-white hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 text-yellow-300" />
                  Cross-Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                Support for Android, iOS, and web fallback ensures a smooth
                experience for all users.
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-none text-white hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LinkIcon className="mr-2 text-yellow-300" />
                  Easy Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                Simple API and documentation make implementation a breeze for
                developers.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center mb-16 bg-white/10 backdrop-blur-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="bg-yellow-300 text-purple-700 rounded-full p-6 w-16 h-16 flex items-center justify-center">
              <span className="text-2xl font-bold">1</span>
            </div>
            <ArrowRight className="text-yellow-300" />
            <div className="bg-yellow-300 text-purple-700 rounded-full p-6 w-16 h-16 flex items-center justify-center">
              <span className="text-2xl font-bold">2</span>
            </div>
            <ArrowRight className="text-yellow-300" />
            <div className="bg-yellow-300 text-purple-700 rounded-full p-6 w-16 h-16 flex items-center justify-center">
              <span className="text-2xl font-bold">3</span>
            </div>
          </div>
          <div className="mt-8 space-y-4 text-lg">
            <p>Create a custom URL</p>
            <p>User clicks the link</p>
            <p>Ulka handles the magic, opening your app or fallback</p>
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-yellow-300 to-yellow-400 text-purple-700 py-16 rounded-lg shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Supercharge Your App Links?
          </h2>
          <Button className="bg-purple-700 text-yellow-300 hover:bg-purple-800 text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            Get Started with Ulka
          </Button>
        </section>
      </main>

      <footer className="container mx-auto py-8 text-center">
        <p>&copy; 2024 Ulka. Open-source and proud.</p>
      </footer>
    </div>
  );
};

export default HomePage;
