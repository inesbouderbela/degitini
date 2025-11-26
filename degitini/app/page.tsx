"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { LoginModal } from "@/components/login-modal"
import { Users, Building, Landmark, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Home() {
  const [showLogin, setShowLogin] = useState(false)

  const services = [
    {
      icon: Users,
      title: "الصندوق الوطني",
      subtitle: "للضمان الإجتماعي",
      link: "/services",
    },
    {
      icon: Building,
      title: "الصندوق الوطني",
      subtitle: "للتأمين على المرض",
      link: "/services",
    },
    {
      icon: Landmark,
      title: "البلدية",
      subtitle: "",
      link: "/services",
    },
    {
      icon: FileText,
      title: "القباضة المالية",
      subtitle: "",
      link: "/services",
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

        {/* Section de présentation */}
        <div className="text-center mb-26">
          <h2 className="text-3xl font-bold text-primary mb-12">
            مرحباً بكم في منصة <span className="text-red-600">Digitini</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              منصة <strong>Digitini</strong> هي البوابة الرقمية الشاملة لخدمات الحكومة التونسية, 
              التي تهدف إلى تبسيط وتسهيل الوصول إلى جميع الخدمات الإدارية. 
              نحن نعمل على تحويل التجربة الإدارية التقليدية إلى رحلة رقمية سلسة وآمنة.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              من خلال منصتنا، يمكنك إتمام المعاملات الإدارية من أي مكان وفي أي وقت، 
              دون الحاجة إلى التنقل أو الانتظار في الطوابير. كل الخدمات بين يديك.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              انضم إلى آلاف المواطنين الذين يثقون بنا لإدارة معاملاتهم الإدارية بكل سهولة وأمان.
            </p>
          </div>
        </div>

        {/* Section Digitalisation de l'administration en arabe */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 mb-26 text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-10">رقمنة الإدارة التونسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-foreground">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">الخدمات الإلكترونية</h3>
              <p className="text-sm text-muted-foreground">وصول سهل إلى جميع الخدمات الحكومية</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">أمن وحماية</h3>
              <p className="text-sm text-muted-foreground">بياناتك محمية بأعلى معايير الأمان</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">موثوقية</h3>
              <p className="text-sm text-muted-foreground">خدمات معتمدة من الحكومة التونسية</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">سرعة وفعالية</h3>
              <p className="text-sm text-muted-foreground">إنجاز المعاملات في دقائق معدودة</p>
            </div>
          </div>
        </div>

       {/* Nouvelle Section Services Grid - Version Dashboard */}
       <h2 className="text-3xl text-center font-bold text-red-600 mb-6">الخدمات الإدارية الرقمية  </h2>
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

        {/* CTA Section */}
        <div className="bg-primary text-primary-foreground rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">ابدأ الآن</h2>
          <p className="text-lg mb-8 opacity-90">قم بإنشاء حسابك والوصول إلى جميع الخدمات الحكومية</p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="secondary">
              <Link href="/register">إنشاء حساب</Link>
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => setShowLogin(true)}
            >
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </main>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  )
}