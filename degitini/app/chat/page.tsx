"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "سلام، أنا مساعدك الذكي للخدمات العمومية. كيف يمكنني مساعدتك اليوم؟\n",
      sender: "bot",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simuler une réponse du bot
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes("شهادة") && message.includes("cnss")) {
      return `سلام
باقي نصل شهادة إنجازات CNSS، يزيغك تعني لخدمة CNSS → الطلبات → شهادة إنجازات.

الخدمات المتاحة في CNSS:
• شهادة إنجازات
• شهادة مرتب
• شهادة حقوق
• معاشات التقاعد

تحب نطولك نصل الطلب كلي؟`
    }
    
    if (message.includes("بلدية") || message.includes("municipality")) {
      return `خدمات البلدية المتاحة:

• شهادات ميلاد/زواج/وفاة
• رخص البناء
• وثائق الملكية
• رخص تجارية
• شهادات إقامة

يمكنك زيارة قسم البلدية في الطلبات الجديدة. أريد تصل خدمة معينة؟`
    }
    
    if (message.includes("cnam") || message.includes("صحي")) {
      return `الخدمات الصحية في CNAM:

• تغطية العلاجات الطبية
• استرجاع النفقات الصحية
• شهادات طبية
• أدوية وعلاجات
• تحاليل مخبرية

اختر CNAM من قائمة المؤسسات في الطلبات الجديدة.`
    }

    if (message.includes("طلب") || message.includes("طلبات")) {
      return `للتقديم على طلب جديد:

1. اذهب لصفحة "طلباتي"
2. اضغط على "طلب جديد"
3. اختر المؤسسة (CNSS، البلدية، CNAM)
4. اختر نوع الخدمة
5. املأ المعلومات المطلوبة

تحتاج مساعدة في نوع خدمة معينة؟`
    }

    if (message.includes("حالة") || message.includes("متابعة")) {
      return `لمتابعة حالة طلباتك:

1. اذهب لصفحة "طلباتي"
2. شوف لستة جميع طلباتك
3. اضغط على "التفاصيل" لكل طلب
4. تقدر تشوف حالة الطلب (قيد المعالجة، مقبول، مرفوض)

عندك طلب معين تبي تعرف حالته؟`
    }

    if (message.includes("مساعدة") || message.includes("مساعده") || message.includes("help")) {
      return `أنا هنا لمساعدتك! يمكنني:

1. 🎯 توجيهك للخدمات المناسبة
2. 📋 مساعدتك في إتمام الطلبات
3. ℹ️ إعطائك معلومات عن المؤسسات
4. 📞 مساعدتك في التواصل
5. 🔍 مساعدتك في متابعة الطلبات

ما الخدمة التي تحتاجها بالضبط؟`
    }

    if (message.includes("شكر") || message.includes("merci") || message.includes("thanks")) {
      return `العفو! 🎯

دايماً حاضر لخدمتك. إذا عندك أي استفسار تاني، لا تتردد في السؤال.

تحتاج مساعدة في شيء آخر؟`
    }
    
    return `شكراً على رسالتك! 🤖

أنا مساعد ذكي متخصص في الخدمات العمومية. يمكنني مساعدتك في:

• طلبات CNSS (شهادات، معاشات)
• خدمات البلدية (وثائق، رخص)
• خدمات CNAM الصحية
• متابعة الطلبات
• معلومات عن المؤسسات

كيف يمكنني خدمتك؟`
  }

  const quickReplies = [
    "أريد شهادة من CNSS",
    "خدمات البلدية",
    "التغطية الصحية CNAM",
    "كيف أقدم طلب جديد؟",
    "كيف أتابع حالة طلبي؟",
    "مساعدة عامة"
  ]

  return (
    <div className="min-h-screen min-h-screen bg-background flex flex-col  ">
      <Navigation onLoginClick={() => {}} />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-20"></div> {/* Spacer for balance */}
            
            

            <div className="w-20"></div> {/* Spacer for balance */}
          </div>

          {/* Chat Container */}
          <Card className="border-0 shadow-2xl h-[80vh] flex flex-col   p-0">
            {/* Header avec gradient directement */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-t-lg m-0">
                <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="font-bold text-xl">صاحبي بوت سالم</h3>
                    <p className="text-white/90">مساعد الخدمات العمومية</p>
                </div>
                </div>
            </div>

  {/* Messages Container - Pas d'espace blanc */}
  <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] rounded-2xl p-4 ${
              message.sender === "user"
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-white border border-gray-200 rounded-bl-none shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {message.sender === "bot" ? (
                <>
                  <Bot className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">سالم</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4 text-blue-100" />
                  <span className="text-xs font-medium text-blue-100">أنت</span>
                </>
              )}
              <span className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString("ar-MA", {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </span>
            </div>
            <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 max-w-[85%] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-gray-700">سالم</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
              <span className="text-sm">يكتب رد...</span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  </div>

  {/* Quick Replies */}
  <div className="p-4 border-t border-gray-200 bg-white">
    <div className="flex flex-wrap gap-2 mb-4">
      {quickReplies.map((reply, index) => (
        <button
          key={index}
          onClick={() => setInputMessage(reply)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-full text-sm transition-all hover:shadow-sm"
        >
          {reply}
        </button>
      ))}
    </div>

    {/* Input Form */}
    <form onSubmit={handleSendMessage} className="flex gap-3">
      <Input
        type="text"
        placeholder="اكتب سؤالك هنا..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        className="flex-1 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all py-3 text-lg"
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage(e)
          }
        }}
      />
      <Button
        type="submit"
        disabled={!inputMessage.trim() || isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl transition-all disabled:opacity-50 py-3 text-lg"
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  </div>
</Card>

          {/* Footer Note */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              💡 نصيحة: يمكنك السؤال عن خدمات CNSS، البلدية، CNAM، أو متابعة الطلبات
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}