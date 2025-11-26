"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, User, Building, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Navigation as NavComponent } from "@/components/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    establishment: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulation d'envoi
    setTimeout(() => {
      console.log("Form data:", formData)
      setIsSubmitting(false)
      alert("تم إرسال رسالتك بنجاح! سنقوم بالرد عليك في أقرب وقت.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        establishment: "",
        message: ""
      })
    }, 2000)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "الهاتف الموحد",
      details: ["28 670 440 ", "53 334 828"],
      description: "متاح من الساعة 8:00 صباحاً إلى 4:00 مساءً",
      color: "bg-blue-500"
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      details: ["contact@services.ma", "support@services.ma"],
      description: "رد في غضون 24 ساعة",
      color: "bg-blue-500"
    },
    {
      icon: Clock,
      title: "أوقات العمل",
      details: ["من الإثنين إلى الجمعة", "8:00 ص - 4:00 م"],
      description: "مغلق أيام العطل الرسمية",
      color: "bg-blue-500"
    }
  ]

  const establishments = [
    { 
      value: "municipality", 
      label: "البلدية",
      color: "bg-purple-100 text-purple-800"
    },
    { 
      value: "cnss", 
      label: "الصندوق الوطني للضمان الاجتماعي (CNSS)",
      color: "bg-green-100 text-green-800"
    },
    { 
      value: "cnam", 
      label: "الوكالة الوطنية للتأمين الصحي (CNAM)",
      color: "bg-blue-100 text-blue-800"
    },
    { 
      value: "publicite", 
      label: "إدارة الإشهار العمومي",
      color: "bg-orange-100 text-orange-800"
    }
  ]

  // Données des établissements avec leurs localisations
  const establishmentData = [
    {
      id: "municipality",
      name: "البلدية المركزية",
      type: "البلدية",
      address: "شارع محمد الخامس، رقم 123، الرباط",
      phone: "2125 123 71 06+",
      email: "municipality@contact.ma",
      hours: "8:00 ص - 4:00 م",
      coordinates: "34.020882, -6.841650",
      services: ["الحالة المدنية", "رخص البناء", "الوثائق الإدارية"],
      color: "bg-blue-500",
      icon: "🏛️"
    },
    {
      id: "cnss",
      name: "الصندوق الوطني للضمان الاجتماعي",
      type: "CNSS",
      address: "شارع العلويين، أكدال، الرباط",
      phone: "2125 123 72 06+",
      email: "cnss@contact.ma",
      hours: "8:30 ص - 4:30 م",
      coordinates: "34.015882, -6.831650",
      services: ["التغطية الصحية", "معاشات التقاعد", "تعويضات البطالة"],
      color: "bg-blue-500",
      icon: "🛡️"
    },
    {
      id: "cnam",
      name: "الوكالة الوطنية للتأمين الصحي",
      type: "CNAM",
      address: "حي الرياض، الصخيرات",
      phone: "2125 123 73 06+",
      email: "cnam@contact.ma",
      hours: "8:00 ص - 4:00 م",
      coordinates: "33.990882, -6.771650",
      services: ["العلاجات الطبية", "الأدوية", "التحاليل المخبرية"],
      color: "bg-blue-500",
      icon: "🏥"
    },
    {
      id: "publicite",
      name: "إدارة الإشهار العمومي",
      type: "Publicité",
      address: "شارع الحسن الثاني، وسط المدينة، الرباط",
      phone: "2125 123 74 06+",
      email: "publicite@contact.ma",
      hours: "8:00 ص - 3:00 م",
      coordinates: "34.025882, -6.851650",
      services: ["رخص الإشهار", "اللوحات الإعلانية", "التصاريح التجارية"],
      color: "bg-blue-500",
      icon: "📢"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavComponent onLoginClick={() => {}} />      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">اتصل بنا</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                تواصل مع جميع المؤسسات العمومية من مكان واحد
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-0">
                  <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{method.title}</h3>
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 font-medium mb-1">{detail}</p>
                  ))}
                  <p className="text-sm text-gray-500 mt-2">{method.description}</p>
                </Card>
              ))}
            </div>

            {/* Establishment Cards */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">المؤسسات المتاحة</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  اختر المؤسسة التي ترغب في التواصل معها أو الاطلاع على معلوماتها
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {establishmentData.map((establishment) => (
                  <Card key={establishment.id} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-center mb-4">
                      
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{establishment.name}</h3>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${establishment.id === 'municipality' ? 'bg-purple-100 text-purple-800' : establishment.id === 'cnss' ? 'bg-green-100 text-green-800' : establishment.id === 'cnam' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                        {establishment.type}
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                        <span className="text-right">{establishment.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{establishment.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{establishment.hours}</span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">الخدمات المتاحة:</p>
                      <div className="flex flex-wrap gap-1">
                        {establishment.services.map((service, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4"
                      onClick={() => handleChange("establishment", establishment.id)}
                    >
                      <Navigation className="w-4 h-4 ml-2" />
                      تحديد الموقع
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <Card className="max-w-4xl mx-auto p-8 border-0 shadow-lg">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">أرسل رسالة</h2>
                </div>
                <p className="text-lg text-gray-600">
                  اختر المؤسسة واملأ النموذج لإرسال رسالتك مباشرة
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="الاسم الكامل"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="pr-12 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="pr-12 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder="رقم الهاتف"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="pr-12 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <Select 
                    value={formData.establishment} 
                    onValueChange={(value) => handleChange("establishment", value)}
                  >
                    <SelectTrigger className="pr-12 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors">
                      <SelectValue placeholder="اختر المؤسسة" />
                    </SelectTrigger>
                    <SelectContent>
                      {establishments.map((est) => (
                        <SelectItem key={est.value} value={est.value}>
                          {est.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder="موضوع الرسالة"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    className="pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <Textarea
                    placeholder="رسالتك..."
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="min-h-[150px] resize-none text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full primary hover:primary text-white py-3 text-lg rounded-xl transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      جاري الإرسال...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      إرسال الرسالة
                    </div>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">أسئلة متكررة</h2>
            <p className="text-lg text-gray-600 mb-8">
              هل لديك استفسار؟ ربما تجد الإجابة هنا
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
              {[
                {
                  question: "كم تستغرق مدة معالجة الطلبات؟",
                  answer: "تتراوح بين 24 ساعة إلى 5 أيام عمل حسب نوع الطلب والمؤسسة"
                },
                {
                  question: "هل يمكنني التواصل مع عدة مؤسسات في نفس الوقت؟",
                  answer: "نعم، يمكنك إرسال رسائل منفصلة لكل مؤسسة حسب احتياجك"
                },
                {
                  question: "ما هي أوقات استقبال المراجعين؟",
                  answer: "تختلف حسب المؤسسة، ولكن معظمها يعمل من 8:00 صباحاً إلى 4:00 مساءً"
                },
                {
                  question: "هل الخدمة الإلكترونية متاحة لجميع المؤسسات؟",
                  answer: "نعم، جميع المؤسسات المذكورة تقدم خدمات إلكترونية عبر هذا الموقع"
                }
              ].map((faq, index) => (
                <Card key={index} className="p-6 text-right border-0 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 المنصة الموحدة للخدمات العمومية. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}