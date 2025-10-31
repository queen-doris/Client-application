'use client';

import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Stats } from "@/components/stats"
import { CTA } from "@/components/cta"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/store/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated && user?.role === 'client') {
      router.push('/client/dashboard');
    }
  }, [loading, isAuthenticated, user, router]);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Get Started</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => router.push('/client/register')}
              className="px-8 py-3"
            >
              Register
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => router.push('/client/login')}
              className="px-8 py-3"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <CTA />
    </div>
  )
}
