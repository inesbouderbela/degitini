"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface LoginModalProps {
  onClose: () => void
}

export function LoginModal({ onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-8 max-w-md w-full mx-4 shadow-xl relative">
        {/* Bouton X pour fermer */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-muted rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground text-center ">أهلا وسهلا</h2> 
          <p className="text-center text-muted-foreground mt-5 text-red-600">الدخول إلى حسابك</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-foreground mb-5">رقم بطاقة تعريف الوطنية</label>
            <Input
              type="text"
              placeholder="AB123456"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-5">كلمة المرور</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex gap-3 mt-10">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit" className="flex-1">
              دخول
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          ليس لديك حساب؟{" "}
          <a href="/register" className="text-primary font-semibold hover:underline">
            سجل الآن
          </a>
        </p>
      </div>
    </div>
  )
}