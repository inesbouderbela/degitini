"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const services = [
    {
      id: 1,
      name: "شهادة سلوك حسن",
      category: "مستندات",
      status: "متاح",
      icon: "📄",
    },
    {
      id: 2,
      name: "تسجيل الشركات",
      category: "تجاري",
      status: "متاح",
      icon: "🏢",
    },
    {
      id: 3,
      name: "تجديد جواز السفر",
      category: "وثائق",
      status: "متاح",
      icon: "🛂",
    },
    {
      id: 4,
      name: "الحصول على رقم ضريبي",
      category: "ضرائب",
      status: "متاح",
      icon: "💼",
    },
    {
      id: 5,
      name: "تصريح البناء",
      category: "عمراني",
      status: "متاح",
      icon: "🏗️",
    },
    {
      id: 6,
      name: "تجديد الرخصة",
      category: "مركبات",
      status: "متاح",
      icon: "🚗",
    },
  ]

  const filtered = services.filter((s) => s.name.includes(searchTerm) || s.category.includes(searchTerm))

  return (
    <div className="min-h-screen bg-background">
      <Navigation onLoginClick={() => {}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">الخدمات الإدارية</h1>
          <p className="text-muted-foreground">جميع الخدمات الحكومية في مكان واحد</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <Input
            type="search"
            placeholder="ابحث عن خدمة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <Link key={service.id} href={`/services/${service.id}`}>
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.category}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {service.status}
                  </span>
                  <Button size="sm" variant="outline">
                    التفاصيل
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">لم يتم العثور على خدمات</p>
          </div>
        )}
      </main>
    </div>
  )
}
