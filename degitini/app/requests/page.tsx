"use client"

import { Search, Phone, Map, MessageSquare, Clock, Filter, Download, ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ApplicationsPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")

  // Liste complète des demandes avec tous les champs requis
  const allApplications = [
    {
      id: "2025-00124",
      name: "طلب علاج جديد",
      establishment: "CNAM",
      date: "2025-01-15",
      status: "مقبولة",
      category: "صحي",
      icon: "🏥",
    },
    {
      id: "2025-00125",
      name: "شهادة عمل جديدة",
      establishment: "CNSS",
      date: "2025-01-14",
      status: "قيد المراجعة",
      category: "اجتماعي",
      icon: "📄",
    },
    {
      id: "2025-00126",
      name: "طلب شهادة ميلاد",
      establishment: "البلدية",
      date: "2025-01-13",
      status: "مرفوضة",
      category: "مدني",
      icon: "👶",
    },
  
    {
      id: "2025-00128",
      name: "رخصة بناء",
      establishment: "البلدية",
      date: "2025-01-11",
      status: "مقبولة",
      category: "عمراني",
      icon: "🏗️",
    },
    {
      id: "2025-00129",
      name: "تغطية صحية إضافية",
      establishment: "CNAM",
      date: "2025-01-10",
      status: "مرفوضة",
      category: "صحي",
      icon: "🩺",
    },
  
  
  ]

  // Fonction de tri
  const sortApplications = (applications: typeof allApplications) => {
    return [...applications].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case "id":
          aValue = a.id;
          bValue = b.id;
          break;
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "establishment":
          aValue = a.establishment;
          bValue = b.establishment;
          break;
        case "date":
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === "asc" 
          ? (aValue > bValue ? 1 : -1)
          : (aValue < bValue ? 1 : -1);
      }
    });
  };

  // Filtrage des applications
  const filteredApplications = allApplications.filter(app => {
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "accepted" && app.status === "مقبولة") ||
      (filterStatus === "rejected" && app.status === "مرفوضة") ||
      (filterStatus === "pending" && app.status === "قيد المراجعة")
    
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.establishment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesSearch
  })

  // Applications triées
  const sortedApplications = sortApplications(filteredApplications)

  // Liste des demandes refusées seulement
  const rejectedApplications = allApplications.filter(app => app.status === "مرفوضة")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مقبولة":
        return "bg-green-100 text-green-800 border-green-200"
      case "قيد المراجعة":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "مرفوضة":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getEstablishmentColor = (establishment: string) => {
    switch (establishment) {
      case "البلدية":
        return "bg-purple-100 text-purple-800"
      case "CNAM":
        return "bg-blue-100 text-blue-800"
      case "CNSS":
        return "bg-green-100 text-green-800"
      case "القطبة":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ChevronUp className="w-4 h-4 opacity-30" />
    
    return sortDirection === "asc" 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation onLoginClick={() => setShowLogin(true)} />
    
      <main className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">طلباتي</h1>
          <p className="text-gray-600">تابع حالة جميع طلباتك والتطبيقات</p>
        </div>

        {/* Filtres et recherche */}
        <Card className="p-6 mb-6 border-0 shadow-sm">
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex flex-col lg:flex-row gap-3 flex-1">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="w-4 h-4 ml-2" />
                  <SelectValue placeholder="جميع الحالات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="accepted">مقبولة</SelectItem>
                  <SelectItem value="rejected">مرفوضة</SelectItem>
                  <SelectItem value="pending">قيد المراجعة</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative flex-1">
                <Input 
                  type="text" 
                  placeholder="ابحث بالاسم، المؤسسة، أو الرقم..." 
                  className="pr-10 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={sortField} onValueChange={(value) => setSortField(value)}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">تاريخ الإرسال</SelectItem>
                  <SelectItem value="id">رقم الطلب</SelectItem>
                  
                  
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                className="w-full sm:w-auto"
              >
                {sortDirection === "asc" ? "تصاعدي" : "تنازلي"}
              </Button>
              
             
            </div>
          </div>
        </Card>

        {/* Tableau des demandes */}
        <Card className="border-0 shadow-sm mb-8">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right py-4 px-6 font-semibold text-gray-900 text-lg">
                      <button 
                        className="flex items-center justify-end gap-1 hover:text-blue-600 transition-colors"
                        onClick={() => handleSort("id")}
                      >
                        رقم الطلب
                        <SortIcon field="id" />
                      </button>
                    </th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900 text-lg">
                      <button 
                        className="flex items-center justify-end gap-1 hover:text-blue-600 transition-colors"
                        onClick={() => handleSort("establishment")}
                      >
                        المؤسسة
                        
                      </button>
                    </th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900 text-lg">
                      <button 
                        className="flex items-center justify-end gap-1 hover:text-blue-600 transition-colors"
                        onClick={() => handleSort("name")}
                      >
                        اسم الطلب
                        
                      </button>
                    </th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900 text-lg">
                      <button 
                        className="flex items-center justify-end gap-1 hover:text-blue-600 transition-colors"
                        onClick={() => handleSort("date")}
                      >
                        تاريخ الإرسال
                        <SortIcon field="date" />
                      </button>
                    </th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900 text-lg">
                      <button 
                        className="flex items-center justify-end gap-1 hover:text-blue-600 transition-colors"
                        onClick={() => handleSort("status")}
                      >
                        الحالة
                        
                      </button>
                    </th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900 text-lg">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedApplications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-5 px-6 text-base font-medium text-gray-900">
                        {app.id}
                      </td>
                      <td className="py-5 px-6 text-base font-medium text-gray-900">
                       
                          {app.establishment}
                        
                      </td>
                      <td className="py-5 px-6">
                        
                          
                          <span className="text-base font-medium text-gray-900">{app.name}</span>
                     
                      </td>
                      <td className="py-5 px-6 text-base text-gray-600">
                        {new Date(app.date).toLocaleDateString("ar-MA", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-5 px-6">
                        <Badge 
                          variant="outline" 
                          className={`border ${getStatusColor(app.status)} text-sm font-normal px-3 py-1`}
                        >
                          {app.status}
                        </Badge>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline" className="text-sm">
                            التفاصيل
                          </Button>
                          
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {sortedApplications.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-lg">
                لا توجد طلبات تطابق معايير البحث
              </div>
            )}
          </div>
        </Card>

        {/* Section demandes مرفوضة */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">الطلبات المرفوضة</h2>
            <Badge variant="destructive" className="text-base px-3 py-1">
              {rejectedApplications.length} طلب مرفوض
            </Badge>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {rejectedApplications.map((app) => (
              <Card key={app.id} className="p-6 border-red-200 bg-red-50 hover:shadow-lg transition-all duration-300">
                
                <h3 className="font-semibold text-gray-900 mb-3 text-right text-lg">{app.name}</h3>
                <div className="flex items-center justify-between text-base text-gray-600 mb-4">
                  <Badge variant="outline" className="text-sm">
                    {app.establishment}
                  </Badge>
                  <span>
                    {new Date(app.date).toLocaleDateString("ar-MA")}
                  </span>
                </div>
                <div className="text-right">
                  <Button size="sm" variant="destructive" className="text-sm">
                    معرفة السبب
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {rejectedApplications.length === 0 && (
            <Card className="p-12 text-center border-0 shadow-sm">
              <div className="text-green-500 text-3xl mb-4">🎉</div>
              <p className="text-gray-600 text-lg">لا توجد طلبات مرفوضة حالياً</p>
            </Card>
          )}
        </div>
      </main>

      {/* Footer avec liens rapides */}
      <footer className="bg-gradient-to-r from-blue-600 to-blue-800 mt-auto">
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h3 className="text-2xl font-bold text-white text-center mb-8">روابط سريعة</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Button 
              variant="ghost" 
              className="p-6 h-auto flex flex-col items-center justify-center gap-3 text-white hover:bg-white/20 transition-colors"
            >
              <Phone className="w-6 h-6" />
              <span className="text-base">اتصل بنا</span>
            </Button>
            <Button 
              variant="ghost" 
              className="p-6 h-auto flex flex-col items-center justify-center gap-3 text-white hover:bg-white/20 transition-colors"
            >
              <Map className="w-6 h-6" />
              <span className="text-base">مواقع البلديات</span>
            </Button>
            <Button 
              variant="ghost" 
              className="p-6 h-auto flex flex-col items-center justify-center gap-3 text-white hover:bg-white/20 transition-colors"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-base">شكاوى</span>
            </Button>
            <Button 
              variant="ghost" 
              className="p-6 h-auto flex flex-col items-center justify-center gap-3 text-white hover:bg-white/20 transition-colors"
            >
              <Clock className="w-6 h-6" />
              <span className="text-base">مواعيد</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}