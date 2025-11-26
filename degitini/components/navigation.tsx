"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X, User, ChevronDown, Sparkles, Building, Shield, FileText, Landmark, Bell, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface NavigationProps {
  onLoginClick: () => void
}

export function Navigation({ onLoginClick }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [activeHover, setActiveHover] = useState<string | null>(null)
  const [unreadCount, setUnreadCount] = useState(3)

  // Fermer les notifications quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsOpen) {
        setNotificationsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [notificationsOpen])

  // Données des notifications
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "طلب مقبول",
      message: "تم قبول طلب شهادة الميلاد",
      time: "منذ 5 دقائق",
      icon: CheckCircle,
      read: false
    },
    {
      id: 2,
      type: "warning",
      title: "طلب قيد المراجعة",
      message: "طلب رخصة البناء قيد الدراسة",
      time: "منذ ساعة",
      icon: Clock,
      read: false
    },
    {
      id: 3,
      type: "info",
      title: "تذكير",
      message: "آخر موعد لتقديم الوثائق غداً",
      time: "منذ 3 ساعات",
      icon: AlertCircle,
      read: true
    },
    {
      id: 4,
      type: "success",
      title: "دفع ناجح",
      message: "تم دفع الفاتورة بنجاح",
      time: "منذ يوم",
      icon: CheckCircle,
      read: true
    }
  ]

  const unreadNotifications = notifications.filter(n => !n.read)

  const markAllAsRead = () => {
    setUnreadCount(0)
    setNotificationsOpen(false)
  }

  const services = [
    { 
      name: "الصندوق الوطني للضمان الإجتماعي", 
      href: "/services/cnss", 
      icon: Shield,
      color: "text-primary"
    },
    { 
      name: "الصندوق الوطني للتأمين على المرض", 
      href: "/services/cnam", 
      icon: FileText,
      color: "text-primary"
    },
    { 
      name: "البلدية", 
      href: "/services/municipality", 
      icon: Building,
      color: "text-primary"
    },
    { 
      name: "القباضة المالية", 
      href: "/services/treasury", 
      icon: Landmark,
      color: "text-primary"
    },
    { 
      name: "جميع الخدمات", 
      href: "/services", 
      icon: Sparkles,
      color: "text-primary"
    }
  ]

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-2xl shadow-primary/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo avec effet premium */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="relative">
                <img 
                  src="/img/logo.png"
                  alt="Digitini Logo"
                  className="w-15 h-15 object-contain"
                />
              
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-black bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent tracking-tight">
                Digitini
              </h1>
              <p className="text-xs text-gray-600 font-medium tracking-wide">المنصة الرقمية المتكاملة</p>
            </div>
          </Link>

          {/* Navigation Links - Desktop avec effets avancés */}
          <div className="hidden lg:flex items-center gap-12">
            {/* Services Dropdown Premium */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button 
                className="flex items-center gap-2 text-gray-800 hover:text-primary transition-all duration-500 font-semibold group/nav relative"
                onMouseEnter={() => setActiveHover('services')}
                onMouseLeave={() => setActiveHover(null)}
              >
                <div className={`w-2 h-2 rounded-full bg-primary opacity-0 group-hover/nav:opacity-100 transition-all duration-300 ${activeHover === 'services' ? 'animate-pulse' : ''}`} />
                الخدمات
                <ChevronDown className={`w-4 h-4 transition-all duration-500 ${servicesDropdownOpen ? 'rotate-180 transform scale-110' : ''} ${activeHover === 'services' ? 'text-primary' : ''}`} />
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 group-hover/nav:w-full" />
              </button>
              
              {/* Dropdown Menu Premium */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-4 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-3xl border border-white/20 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
                  <div className="p-2">
                    {services.map((service, index) => {
                      const Icon = service.icon
                      return (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="flex items-center gap-4 px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary rounded-xl transition-all duration-300 group/item hover:scale-[1.02] hover:shadow-lg"
                          onMouseEnter={() => setActiveHover(service.href)}
                          onMouseLeave={() => setActiveHover(null)}
                        >
                          <div className={`p-2 rounded-xl bg-gradient-to-br from-white to-gray-50/80 shadow-lg group-hover/item:shadow-xl transition-all duration-300 ${activeHover === service.href ? 'scale-110' : ''}`}>
                            <Icon className={`w-5 h-5 ${service.color}`} />
                          </div>
                          <span className="font-medium flex-1 text-right">{service.name}</span>
                          <div className={`w-1 h-1 rounded-full bg-primary opacity-0 transition-all duration-300 ${activeHover === service.href ? 'opacity-100 scale-150' : ''}`} />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Autres liens avec effets similaires */}
            {[
              { href: "/requests", label: "طلباتي", id: "requests" },
              { href: "/chat", label: "المساعد الذكي", id: "chat" },
              { href: "/contact", label: "اتصل بنا", id: "contact" }
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="relative text-gray-800 hover:text-primary transition-all duration-500 font-semibold group/nav"
                onMouseEnter={() => setActiveHover(item.id)}
                onMouseLeave={() => setActiveHover(null)}
              >
                <div className={`w-2 h-2 rounded-full bg-primary opacity-0 group-hover/nav:opacity-100 transition-all duration-300 ${activeHover === item.id ? 'animate-pulse' : ''}`} />
                {item.label}
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 group-hover/nav:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Section Premium */}
          <div className="flex items-center gap-4">
            {/* Notifications Bell */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  setNotificationsOpen(!notificationsOpen)
                }}
                className="relative rounded-2xl hover:bg-primary/10 hover:text-primary transition-all duration-500 group"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {/* Notifications Dropdown - Ouvert vers la droite */}
              {notificationsOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-3xl border border-white/20 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300 z-50">
                  {/* Header */}
                  <div className="p-4 border-b border-white/20">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">الإشعارات</h3>
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            markAllAsRead()
                          }}
                          className="text-xs text-primary hover:text-primary/80"
                        >
                          تعليم الكل كمقروء
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => {
                        const Icon = notification.icon
                        const getIconColor = () => {
                          switch (notification.type) {
                            case "success": return "text-green-500"
                            case "warning": return "text-yellow-500"
                            case "info": return "text-blue-500"
                            default: return "text-gray-500"
                          }
                        }
                        
                        return (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-white/20 hover:bg-gray-50/50 transition-colors duration-200 ${
                              !notification.read ? "bg-blue-50/50" : ""
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-full ${getIconColor()} bg-white shadow-sm`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 text-right">
                                <h4 className="font-semibold text-gray-900 text-sm">
                                  {notification.title}
                                </h4>
                                <p className="text-gray-600 text-sm mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-gray-400 text-xs mt-2">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>لا توجد إشعارات</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-3 border-t border-white/20">
                    <Link
                      href="/notifications"
                      className="block text-center text-sm text-primary hover:text-primary/80 font-medium py-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        setNotificationsOpen(false)
                      }}
                    >
                      عرض جميع الإشعارات
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Login Button avec effet glass */}
            <Button 
              onClick={onLoginClick} 
              variant="default"
              className="hidden lg:flex items-center gap-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-2xl shadow-primary/30 hover:shadow-3xl hover:shadow-primary/40 transition-all duration-500 hover:scale-105 px-6 py-3 rounded-2xl font-semibold"
            >
              <User className="w-5 h-5" />
              تسجيل الدخول
              <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
            </Button>

            {/* Mobile Menu Button Premium */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)} 
              className="lg:hidden rounded-2xl hover:bg-primary/10 hover:text-primary transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {menuOpen ? (
                <X className="w-6 h-6 transform transition-all duration-500" />
              ) : (
                <Menu className="w-6 h-6 transform transition-all duration-500 group-hover:scale-110" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Premium */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-white/20 shadow-3xl animate-in slide-in-from-top-1 duration-300">
            <div className="px-4 py-6 space-y-3">
              {/* Services Accordion Premium */}
              <div className="border-b border-white/20 pb-4">
                <button 
                  className="flex items-center justify-between w-full px-6 py-4 text-gray-800 hover:text-primary rounded-2xl transition-all duration-500 font-semibold bg-gradient-to-r from-transparent to-primary/5 hover:from-primary/10 hover:to-primary/5 group"
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                >
                  <span className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    الخدمات
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-all duration-500 ${servicesDropdownOpen ? 'rotate-180 transform scale-110 text-primary' : ''}`} />
                </button>
                
                {/* Mobile Services Dropdown Premium */}
                {servicesDropdownOpen && (
                  <div className="mt-3 ml-6 space-y-2 animate-in fade-in-0 duration-300">
                    {services.map((service) => {
                      const Icon = service.icon
                      return (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:text-primary rounded-xl transition-all duration-300 font-medium group bg-gradient-to-r from-transparent to-primary/5 hover:from-primary/10 hover:to-primary/5"
                          onClick={() => setMenuOpen(false)}
                        >
                          <div className="p-2 rounded-xl bg-white shadow-lg">
                            <Icon className={`w-4 h-4 ${service.color}`} />
                          </div>
                          {service.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Autres liens mobile */}
              {[
                { href: "/applications", label: "طلباتي" },
                { href: "/chat", label: "المساعد الذكي" },
                { href: "/contact", label: "اتصل بنا" }
              ].map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="flex items-center gap-3 px-6 py-4 text-gray-800 hover:text-primary rounded-2xl transition-all duration-500 font-semibold bg-gradient-to-r from-transparent to-primary/5 hover:from-primary/10 hover:to-primary/5 group"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  {item.label}
                </Link>
              ))}

              {/* Bouton login mobile */}
              <div className="pt-4 border-t border-white/20">
                <Button 
                  onClick={() => {
                    onLoginClick()
                    setMenuOpen(false)
                  }}
                  variant="default"
                  className="w-full justify-center bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-2xl py-4 rounded-2xl font-semibold text-lg"
                >
                  <User className="w-5 h-5 ml-3" />
                  تسجيل الدخول
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}