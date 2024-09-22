import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Smartphone, Globe, Link } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-700 text-white">
      <header className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-2">Ulka</h1>
        <p className="text-xl">The ultimate app deeplinking solution</p>
      </header>

      <main className="container mx-auto py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">
            Seamless App Linking for Every Scenario
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2" />
                  Smart Routing
                </CardTitle>
              </CardHeader>
              <CardContent>
                Create custom URLs that intelligently route users to your app or
                app store.
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2" />
                  Cross-Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                Support for Android, iOS, and web fallback ensures a smooth
                experience for all users.
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Link className="mr-2" />
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

        <section className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="bg-white/20 rounded-full p-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <ArrowRight />
            <div className="bg-white/20 rounded-full p-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <ArrowRight />
            <div className="bg-white/20 rounded-full p-4">
              <span className="text-2xl font-bold">3</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <p>Create a custom URL</p>
            <p>User clicks the link</p>
            <p>Ulka handles the magic, opening your app or fallback</p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Ready to Supercharge Your App Links?
          </h2>
          <Button className="bg-white text-purple-700 hover:bg-purple-100">
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
