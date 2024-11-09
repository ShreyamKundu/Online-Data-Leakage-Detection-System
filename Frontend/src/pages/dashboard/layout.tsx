import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Shield, FileText, Bell, Settings, LogOut } from 'lucide-react'
import axiosInstance from "@/utils/axiosInstance";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
    
export default function DashboardLayout() {
  const { isSignedIn, user } = useUser();
  // const navigate = useNavigate();
  
  useEffect(() => {
          const storeUserData = async () => {
            if (isSignedIn) {
              try {
                console.log('User data:', user);
                const userData = {
                  clerkId: user.id,
                  email: user.emailAddresses[0].emailAddress,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  profileUrl: user.imageUrl,
                };

                await axiosInstance.post('/api/auth/register', userData);
                console.log('User data saved to the database.');
              } catch (error) {
                console.error('Error saving user data:', error);
              }
            }
            // else{
            //   navigate('/sign-in');
            // }
          };

          storeUserData();
        },[]);

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
      <Outlet />
      </main>
    </div>
  )
}