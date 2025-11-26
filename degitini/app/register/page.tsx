"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, Eye, EyeOff } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    nationalId: "",
    birthDate: "",
    phoneNumber: "",
    network: "اتصالات تونس",
    password: "",
    confirmPassword: "",
  })

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "يمكنك الآن تسجيل الدخول",
      })
      router.push("/")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push("/")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onLoginClick={() => {}} />

      <main className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Logo */}
        

        {/* Progress Steps - AVEC VERT #077f80 */}
        <div className="flex gap-6 mb-12 justify-center">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-semibold text-lg transition-colors ${
                  s === step
                    ? "border-primary bg-primary text-primary-foreground"
                    : s < step
                      ? "border-[#077f80] bg-[#077f80] text-white"
                      : "border-border bg-card text-foreground"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div 
                  className={`w-12 h-1.5 mx-3 transition-colors ${
                    s < step ? "bg-[#077f80]" : "bg-border"
                  }`} 
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">معلومات شخصية</h2>
          
          {step === 1 && (
            <>
              <p className="text-base text-muted-foreground text-center mb-8">
                لإنشاء حساب ادخل المعلومات التالية:
              </p>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="nationalId" className="text-right block mb-3 text-lg">
                    رقم بطاقة التعريف الوطنية *
                  </Label>
                  <Input
                    id="nationalId"
                    name="nationalId"
                    type="text"
                    value={formData.nationalId}
                    onChange={handleChange}
                    className="text-right h-12 text-lg"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate" className="text-right block mb-3 text-lg">
                    تاريخ الولادة *
                  </Label>
                  <div className="relative">
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="text-right pr-12 h-12 text-lg"
                      required
                    />
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-base text-muted-foreground text-center mb-8">
                ادخل رقم الهاتف الجوال المسجل عليه خدمة الانترنات*
              </p>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="phoneNumber" className="text-right block mb-3 text-lg">
                    رقم الهاتف *
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="text-right h-12 text-lg"
                    required
                  />
                </div>
                <div>
                  <Label className="text-right block mb-4 text-lg">
                    مشغل شبكة الإنترنات *
                  </Label>
                  <RadioGroup
                    value={formData.network}
                    onValueChange={(value) =>
                      setFormData({ ...formData, network: value })
                    }
                    className="flex gap-8 justify-center text-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Label htmlFor="tunisie-telecom" className="cursor-pointer text-lg">
                        اتصالات تونس
                      </Label>
                      <RadioGroupItem value="اتصالات تونس" id="tunisie-telecom" className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Label htmlFor="orange" className="cursor-pointer text-lg">
                        اورنج
                      </Label>
                      <RadioGroupItem value="اورنج" id="orange" className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Label htmlFor="ooredoo" className="cursor-pointer text-lg">
                        اورندو
                      </Label>
                      <RadioGroupItem value="اورندو" id="ooredoo" className="w-5 h-5" />
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-base text-muted-foreground text-center mb-8">
                تحذير: احتفظ بكلمة العبور وعد تنسقها
              </p>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="password" className="text-right block mb-3 text-lg">
                    كلمة العبور *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="text-right pr-12 h-12 text-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-6 h-6" />
                      ) : (
                        <Eye className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-right block mb-3 text-lg">
                    تأكيد كلمة العبور *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="text-right pr-12 h-12 text-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-6 h-6" />
                      ) : (
                        <Eye className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex gap-4 mt-10">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="flex-1 h-12 text-lg"
            >
              {step === 1 ? "إلغاء" : "الرجوع"}
            </Button>
            <Button 
              type="button" 
              onClick={handleNext} 
              className="flex-1 h-12 text-lg"
            >
              {step === 3 ? "إنشاء" : "التالي"}
            </Button>
          </div>
        </div>

        <p className="text-center text-base text-muted-foreground mt-8">
          لديك حساب؟{" "}
          <Link href="/" className="text-primary font-semibold hover:underline text-lg">
            العودة للرئيسية 
          </Link>
        </p>
      </main>
    </div>
  )
}