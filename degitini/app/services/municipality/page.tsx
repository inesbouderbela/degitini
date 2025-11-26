"use client";

import { Bell, Menu, ChevronDown, ChevronUp, Search, Calendar, MapPin, Users, FileText, Download, Phone, Map, FileCheck, MessageSquare, Clock, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/navigation";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const MunicipalityPage = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "civil-status",
  ]);
  const [showLogin, setShowLogin] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  // News for scrolling banner
  const scrollingNews = [
    {
      id: 1,
      title: "انطلاق مشروع تنظيف الأحياء - بلدية تونس تطلق حملة تنظيف شاملة",
      type: "مشاريع بلدية"
    },
    {
      id: 2,
      title: "توقيت جديد لاستقبال المواطنين - تغيير في أوقات الاستقبال ابتداء من الأسبوع القادم",
      type: "إعلان هام"
    },
    {
      id: 3,
      title: "افتتاح حديقة عمومية جديدة بحي الانطلاق بعد أشهر من الأشغال",
      type: "مشاريع مكتملة"
    },
    {
      id: 4,
      title: "معرض المنتجات المحلية - 1 فبراير 2024 في ساحة البلدية",
      type: "فعالية"
    }
  ];

  // Auto-scroll news
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % scrollingNews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [scrollingNews.length]);

  // Correction : Définir le type pour les items des sections
  interface SectionItem {
    name: string;
    link: string;
  }

  interface Section {
    id: string;
    title: string;
    items: SectionItem[] | string[]; // Support both old and new format
  }

  const sections: Section[] = [
    {
      id: "civil-status",
      title: "الحالة المدنية",
      items: [
        {
          name: "طلب شهادة ميلاد",
          link: "/services/mathmoun" // Correction du lien
        },
        {
          name: "طلب شهادة زواج", 
          link: "/services/civil-status/marriage-certificate"
        },
        {
          name: "طلب شهادة وفاة",
          link: "/services/civil-status/death-certificate"
        }
      ],
    },
    {
      id: "documents",
      title: "ممتلكات و وثائق",
      items: [
        { name: "طلب رخصة بناء", link: "/services/documents/building-permit" },
        { name: "طلب شهادة ملكية", link: "/services/documents/ownership-certificate" }
      ],
    },
    {
      id: "certificates",
      title: "بطاقات و شهادات",
      items: [
        { name: "طلب بطاقة تعريف بلدية", link: "/services/certificates/municipal-id" },
        { name: "طلب شهادة إقامة", link: "/services/certificates/residence-certificate" },
        { name: "طلب شهادة جبائية", link: "/services/certificates/tax-certificate" }
      ],
    },
    {
      id: "urban",
      title: "التجهيز والعمران",
      items: [
        { name: "طلب رخصة سكن", link: "/services/urban/housing-license" },
        { name: "طلب تصريح أشغال", link: "/services/urban/work-permit" },
        { name: "طلب وصل توزيع ماء", link: "/services/urban/water-connection" }
      ],
    },
    {
      id: "economic",
      title: "النشاط الاقتصادي",
      items: [
        { name: "طلب رخصة تجارية", link: "/services/economic/commercial-license" },
        { name: "طلب رخصة حرفية", link: "/services/economic/craft-license" },
        { name: "طلب تصريح نشاط", link: "/services/economic/activity-permit" }
      ],
    },
  ];

  const [news] = useState([
    {
      id: 1,
      title: "انطلاق مشروع تنظيف الأحياء",
      date: "2024-01-15",
      category: "مشاريع بلدية",
      excerpt: "بلدية تونس تطلق حملة تنظيف شاملة لجميع الأحياء بمشاركة المتطوعين",
      image: "/img/m1.png"
    },
    {
      id: 2,
      title: "توقيت جديد لاستقبال المواطنين",
      date: "2024-01-10",
      category: "إعلان هام",
      excerpt: "تغيير في أوقات استقبال المواطنين بمقر البلدية ابتداء من الأسبوع القادم",
      image: "/img/m2.jpg"
    },
    {
      id: 3,
      title: "افتتاح حديقة عمومية جديدة",
      date: "2024-01-05",
      category: "مشاريع مكتملة",
      excerpt: "بلدية تونس تفتتح الحديقة العمومية بحي الانطلاق بعد أشهر من الأشغال",
      image: "/img/m3.jpg"
    }
  ]);

  const [events] = useState([
    {
      id: 1,
      title: "معرض المنتجات المحلية",
      date: "2024-02-01",
      time: "09:00 - 18:00",
      location: "ساحة البلدية",
      type: "فعالية اقتصادية"
    },
    {
      id: 2, 
      title: "يوم النظافة التطوعي",
      date: "2024-01-25",
      time: "08:00 - 12:00",
      location: "جميع الأحياء",
      type: "تطوع"
    },
    {
      id: 3,
      title: "ندوة حول التنمية المستدامة",
      date: "2024-01-30",
      time: "10:00 - 13:00",
      location: "قاعة المحاضرات",
      type: "ثقافي"
    }
  ]);

  const [projects] = useState([
    {
      title: "تحديث نظام الإنارة",
      progress: 75,
      status: "قيد التنفيذ",
      description: "استبدال أعمدة الإنارة في الشوارع الرئيسية",
      image: "/img/lighting-project.jpg"
    },
    {
      title: "إنشاء حديقة عمومية", 
      progress: 30,
      status: "قيد التنفيذ",
      description: "حديقة عمومية بحي السلام",
      image: "/img/garden-project.jpg"
    }
  ]);

  // Fonction utilitaire pour vérifier si un item a un lien
  const hasLink = (item: SectionItem | string): item is SectionItem => {
    return typeof item === 'object' && 'link' in item;
  };

  // Fonction utilitaire pour obtenir le nom
  const getName = (item: SectionItem | string): string => {
    return typeof item === 'object' ? item.name : item;
  };

  // Fonction utilitaire pour obtenir le lien
  const getLink = (item: SectionItem | string): string => {
    return typeof item === 'object' ? item.link : "#";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation onLoginClick={() => setShowLogin(true)} />

      {/* Header Hero Section */}
      <div className="relative h-96 bg-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
        <img
          src="/img/mairie-tunis.jpg"
          alt="البلدية - الخدمات الإدارية"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/60 rounded-xl p-8 text-center text-white max-w-4xl mx-4">
            <h1 className="text-5xl font-bold mb-4">
              الخدمات الإدارية <span className="text-red-400">بالبلدية</span>
            </h1>
            <p className="text-xl opacity-95 max-w-2xl mx-auto leading-relaxed">
              خدمات البلدية أين ما كنت. سريعة، آمنة، وتطلب بلا عناء ولا انتظار طويل
            </p>
          </div>
        </div>
      </div>

      {/* Scrolling News Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="bg-white text-red-700 px-4 py-1 rounded-lg font-bold text-sm mr-4 flex-shrink-0">
              🔔 أخبار عاجلة
            </div>
            <div className="flex-1 overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentNewsIndex * 100}%)` }}
              >
                {scrollingNews.map((newsItem, index) => (
                  <div
                    key={newsItem.id}
                    className="flex-shrink-0 w-full flex items-center px-4"
                  >
                    <span className="text-white/90 text-sm font-medium">
                      {newsItem.title}
                    </span>
                    <span className="bg-white/20 text-white/80 text-xs px-2 py-1 rounded mr-3">
                      {newsItem.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-1 mr-4">
              {scrollingNews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNewsIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentNewsIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/services" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ChevronDown className="w-5 h-5 rotate-90" />
            <span>العودة للخدمات</span>
          </Link>
          <div className="h-6 w-px bg-gray-300"></div>
          <h2 className="text-xl font-bold text-gray-900">البلدية</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - 1 column */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* الفعاليات القادمة */}
            <div>
              <h3 className="text-lg font-bold text-blue-800 mb-4">الفعاليات القادمة</h3>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="p-4 bg-white rounded-lg border border-green-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">{event.type}</span>
                      <span className="text-xs text-gray-500">{event.date}</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-2 leading-tight">{event.title}</h4>
                    <div className="flex items-center text-xs text-gray-600 mb-1">
                      <MapPin className="w-3 h-3 ml-1" />
                      {event.location}
                    </div>
                    <div className="text-xs text-gray-500">{event.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* آخر الأخبار */}
            <div>
              <h3 className="text-lg font-bold text-blue-800 mb-4">آخر الأخبار</h3>
              <div className="space-y-4">
                {news.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg border border-blue-100 overflow-hidden hover:shadow-md transition-shadow">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{item.category}</span>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 text-sm mb-2 leading-tight">{item.title}</h4>
                      <p className="text-gray-600 text-xs mb-2">{item.excerpt}</p>
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                        اقرأ المزيد →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Search Bar */}
            <Card className="p-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="ابحث على الخدمة أو الوثيقة المطلوبة"
                  className="pr-12 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-primary transition-colors"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              </div>
            </Card>

            {/* Services Sections */}
            <div className="space-y-6">
              {sections.map((section) => {
                const isExpanded = expandedSections.includes(section.id);
                return (
                  <Card key={section.id} className="overflow-hidden border-2 border-gray-100 hover:border-primary/20 transition-all duration-300">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                    >
                      <h2 className="text-xl font-bold text-red-600">
                        {section.title}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {section.items.length} خدمة
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-primary" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    </button>
                    {isExpanded && section.items.length > 0 && (
                      <div className="border-t border-gray-100 bg-gray-50/30">
                        {section.items.map((item, index) => (
                          <Link
                            key={index}
                            href={getLink(item)}
                            className="block p-4 hover:bg-white transition-colors cursor-pointer border-b last:border-b-0 border-gray-100 group"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-right text-gray-800 font-medium group-hover:text-primary transition-colors">
                                {getName(item)}
                              </p>
                              <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Footer with Quick Links */}
      <footer className="bg-gradient-to-r from-primary to-secondary mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h3 className="text-2xl font-bold text-white text-center mb-6">روابط سريعة</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Button variant="ghost" className="p-4 h-auto flex flex-col items-center justify-center gap-2 text-white hover:bg-white/20 transition-colors">
              <Phone className="w-6 h-6" />
              <span className="text-sm">اتصل بنا</span>
            </Button>
            <Button variant="ghost" className="p-4 h-auto flex flex-col items-center justify-center gap-2 text-white hover:bg-white/20 transition-colors">
              <Map className="w-6 h-6" />
              <span className="text-sm">مواقع البلديات</span>
            </Button>
            <Button variant="ghost" className="p-4 h-auto flex flex-col items-center justify-center gap-2 text-white hover:bg-white/20 transition-colors">
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm">شكاوى</span>
            </Button>
            <Button variant="ghost" className="p-4 h-auto flex flex-col items-center justify-center gap-2 text-white hover:bg-white/20 transition-colors">
              <Clock className="w-6 h-6" />
              <span className="text-sm">مواعيد</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MunicipalityPage;