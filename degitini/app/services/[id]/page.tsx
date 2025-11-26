"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation onLoginClick={() => {}} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/services" className="text-primary hover:underline mb-6 inline-block">
          ← العودة للخدمات
        </Link>

        <div className="bg-card border border-border rounded-lg p-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">شهادة سلوك حسن</h1>

          <div className="mb-6 pb-6 border-b border-border">
            <p className="text-muted-foreground">
              الحالة: <span className="text-green-600 font-semibold">متاح</span>
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">الوصف</h2>
            <p className="text-foreground leading-relaxed">
              شهادة تثبت حسن السلوك والتصرف للمواطنين. تصدرها السلطات المختصة وتستخدم في عدة مجالات مثل الحصول على وظيفة
              أو السفر.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">المستندات المطلوبة</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span className="text-foreground">بطاقة التعريف الوطنية الأصلية أو صورة معتمدة</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span className="text-foreground">شهادة الإقامة أو عقد الإيجار</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span className="text-foreground">صورتان شمسيتان ملونتان 4×6</span>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">الرسوم والمدة</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded">
                <p className="text-muted-foreground text-sm">الرسم</p>
                <p className="text-foreground font-semibold">مجاني</p>
              </div>
              <div className="bg-muted p-4 rounded">
                <p className="text-muted-foreground text-sm">مدة الإنجاز</p>
                <p className="text-foreground font-semibold">3-5 أيام عمل</p>
              </div>
            </div>
          </div>

          <Button className="w-full py-6">التقدم بطلب</Button>
        </div>
      </main>
    </div>
  )
}
