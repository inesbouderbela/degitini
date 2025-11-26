"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { LoginModal } from "@/components/login-modal"
import { Users, Building, Landmark, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function ServicesPage() {
  const [showLogin, setShowLogin] = useState(false)

  const services = [
    {
      icon: Users,
      title: "الصندوق الوطني",
      subtitle: "للضمان الإجتماعي",
      link: "/services/cnss",
    },
    {
      icon: Building,
      title: "الصندوق الوطني",
      subtitle: "للتأمين على المرض",
      link: "/services/cnam",
    },
    {
      icon: Landmark,
      title: "البلدية",
      subtitle: "",
      link: "/services/municipality",
    },
    {
      icon: FileText,
      title: "القباضة المالية",
      subtitle: "",
      link: "/services/treasury",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation onLoginClick={() => setShowLogin(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section avec image */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-black/30 z-10" />

          <img 
            src="/img/Municipalite_de_Tunis-Kassus.jpg" 
            alt="Digitini - Digitalisation de l'administration"
            className="w-full h-80 md:h-96 object-fill"
          />
          
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center text-white w-full">
              <div className="pl-8 mb-8 inline-block">
                <h1 className="text-6xl md:text-8xl font-black text-left tracking-wider">
                  DIGITINI
                </h1>
              </div>
              
              <div className="mb-6">
                <p className="text-3xl md:text-4xl font-bold mb-4">
                  رقمنة الإدارة التونسية
                </p>
                <div className="w-32 h-1 bg-red-600 mx-auto rounded-full"></div>
              </div>
              
              <p className="text-base md:text-lg font-semibold text-white pt-4 inline-block">
                نحو إدارة رقمية حديثة ومتطورة
              </p>
            </div>
          </div>
        </div>

        {/* Section Services Grid */}
        <h2 className="text-3xl text-center font-bold text-red-600 mb-6">الخدمات الإدارية الرقمية</h2>
        <div className="mb-24">
          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={index} href={service.link}>
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-50 flex flex-col items-center justify-center text-center border border-border">
                    <Icon className="w-12 h-12 mb-3 text-muted-foreground" />
                    <h3 className="text-base font-semibold text-primary mb-1">
                      {service.title}
                    </h3>
                    {service.subtitle && (
                      <p className="text-sm text-primary/80">
                        {service.subtitle}
                      </p>
                    )}
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  )
}