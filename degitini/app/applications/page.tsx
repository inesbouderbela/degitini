"use client"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"

export default function ApplicationsPage() {
  const applications = [
    {
      id: 1,
      name: "الصندوق الوطني للشغل الاجتماعي",
      date: "2025-01-15",
      status: "مقبولة",
      category: "اجتماعي",
      icon: "✓",
    },
    {
      id: 2,
      name: "القائمة الانتخابية",
      date: "2025-01-10",
      status: "قيد المراجعة",
      category: "انتخابي",
      icon: "⏳",
    },
    {
      id: 3,
      name: "شهادة الصحة",
      date: "2025-01-08",
      status: "معلقة",
      category: "صحي",
      icon: "!",
    },
    {
      id: 4,
      name: "الصندوق الوطني للشغل الاجتماعي",
      date: "2025-01-05",
      status: "مقبولة",
      category: "اجتماعي",
      icon: "✓",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مقبولة":
        return "bg-green-100 text-green-800"
      case "قيد المراجعة":
        return "bg-blue-100 text-blue-800"
      case "معلقة":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onLoginClick={() => {}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">طلباتي</h1>
          <p className="text-muted-foreground">تابع حالة جميع طلباتك والتطبيقات</p>
        </div>

        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-card border border-border rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-lg">
                  {app.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{app.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(app.date).toLocaleDateString("ar-MA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
