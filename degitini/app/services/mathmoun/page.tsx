"use client";

import { useState } from "react";
import { ArrowRight, Upload, FileText, User, Calendar, MapPin, IdCard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const CivilStatusForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    birthPlace: "",
    cinFile: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier le type de fichier (images et PDF)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (allowedTypes.includes(file.type)) {
        setFormData(prev => ({
          ...prev,
          cinFile: file
        }));
      } else {
        alert("يرجى تحميل صورة أو ملف PDF فقط");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi de formulaire
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">تم إرسال الطلب بنجاح</h2>
          <p className="text-gray-600 mb-6">
            تم استلام طلبك بنجاح وسيتم معالجته في أقرب وقت ممكن. رقم المرجع: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <div className="space-y-3">
            <Link href="/services" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                العودة إلى صفحة الخدمات
              </Button>
            </Link>
            <Link href="/requests" className="w-full">
              <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                الانتقال إلى التطبيقات
              </Button>
            </Link>
            
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gradient-to-r from-primary to-secondary py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/services" className="inline-flex items-center text-red-600 hover:text-red-800 mb-4">
            <ArrowRight className="w-5 h-5 ml-1 rotate-180" />
            العودة إلى الخدمات
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">طلب وثيقة الحالة المدنية</h1>
          <p className="text-gray-900">املأ النموذج أدناه للحصول على الوثيقة المطلوبة</p>
        </div>

        <Card className="p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">المعلومات الشخصية</h3>
              </div>

              {/* Nom et Prénom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 text-right">
                    الاسم *
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="أدخل اسم العائلة"
                    className="w-full text-right"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 text-right">
                    اللقب *
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="أدخل اللقب"
                    className="w-full text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Date et Lieu de Naissance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 text-right">
                    تاريخ الميلاد *
                  </label>
                  <div className="relative">
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      required
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full text-right pr-10"
                      dir="rtl"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700 text-right">
                    مكان الميلاد *
                  </label>
                  <div className="relative">
                    <Input
                      id="birthPlace"
                      name="birthPlace"
                      type="text"
                      required
                      value={formData.birthPlace}
                      onChange={handleInputChange}
                      placeholder="مدينة الميلاد"
                      className="w-full text-right pr-10"
                      dir="rtl"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* CIN Upload Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <IdCard className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">تحميل بطاقة التعريف الوطنية (CIN)</h3>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="cinFile"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="cinFile" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    {formData.cinFile ? formData.cinFile.name : "انقر لتحميل صورة بطاقة التعريف الوطنية"}
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, PDF - الحد الأقصى للحجم: 5MB
                  </p>
                </label>
              </div>

              {formData.cinFile && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">تم تحميل الملف: {formData.cinFile.name}</span>
                </div>
              )}
            </div>

          

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.birthDate || !formData.birthPlace || !formData.cinFile}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed py-3 text-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري الإرسال...
                </div>
              ) : (
                "إرسال الطلب"
              )}
            </Button>
          </form>
        </Card>

        {/* Assistance Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            تحتاج مساعدة؟{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
              اتصل بنا
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CivilStatusForm;