"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    {
      title: "الحالة المدنية",
      description: "طلبات وثائق الحالة المدنية",
      icon: "👨‍👩‍👧‍👦",
      subcategories: ["شهادة ميلاد", "شهادة وفاة", "عقد زواج"],
    },
    {
      title: "الضريبة على القيمة المضافة",
      description: "خدمات ضريبية متعددة",
      icon: "💰",
      subcategories: ["تسجيل ضريبي", "استرجاع ضرائب", "استعلام حسابي"],
    },
    {
      title: "العمل والتشغيل",
      description: "خدمات العمل والتوظيف",
      icon: "💼",
      subcategories: ["البحث عن عمل", "التدريب المهني", "تصاريح العمل"],
    },
    {
      title: "الصحة والسلامة",
      description: "الخدمات الصحية والطبية",
      icon: "⚕️",
      subcategories: ["استشارات طبية", "شهادات صحية", "البرامج الصحية"],
    },
    {
      title: "النقل والمرور",
      description: "خدمات النقل والرخص",
      icon: "🚗",
      subcategories: ["رخصة السياقة", "استخراج وثيقة المركبة", "المخالفات"],
    },
    {
      title: "التعليم والتكوين",
      description: "خدمات التعليم والتكوين",
      icon: "🎓",
      subcategories: ["القبول الجامعي", "شهادات تقدير", "برامج تدريب"],
    },
  ]

  const filtered = categories.filter((c) => c.title.includes(searchTerm) || c.description.includes(searchTerm))

  return (
    <div className="min-h-screen bg-background">
      <Navigation onLoginClick={() => {}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg overflow-hidden">
            <img
              src="/moroccan-government-building.jpg"
              alt="Government Services"
              className="w-full h-48 object-cover opacity-40"
            />
            <div className="relative px-8 py-8 bg-gradient-to-t from-primary/80">
              <h1 className="text-4xl font-bold text-primary-foreground mb-2">الخدمات الإدارية الحكومية</h1>
              <p className="text-primary-foreground/90">جميع الخدمات الحكومية منظمة ومرتبة حسب المجالات</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <Input
            type="search"
            placeholder="ابحث عن الخدمة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((category, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-secondary/20 border-b border-border p-6">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
              </div>

              <div className="p-6">
                <p className="text-muted-foreground mb-4">{category.description}</p>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">الخدمات المتاحة:</p>
                  <ul className="space-y-1">
                    {category.subcategories.map((sub, i) => (
                      <li key={i} className="flex items-center text-sm text-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
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
