import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Shield, FileText, Bell, Settings, LogOut } from 'lucide-react'
    
export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">DataShield</span>
          </Link>
        </div>
        <nav className="mt-8">
          <Link to="/dashboard/files" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <FileText className="h-5 w-5 mr-3" />
            Files
          </Link>
          <Link to="/dashboard/alerts" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Bell className="h-5 w-5 mr-3" />
            Alerts
          </Link>
          <Link to="/dashboard/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button variant="outline" className="w-full">
            <LogOut className="h-4 w-4 mr-2" /> Log Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <p>This is the main content area where you can view and manage your dashboard items.</p>
      </main>
    </div>
  )
}