"use client"

import { useUser } from "@clerk/clerk-react"
import {  GraduationCap, File,Bell,Settings} from "lucide-react"

export default function Component() {
  const { user } = useUser()

  const features = [
    {
      icon: File,
      title: "Files",
      number: "01",
    },
    {
      icon: Bell,
      title: "Notification",
      number: "02",
    },
    {
      icon: Settings,
      title: "Setting",
      number: "03",
    },
    {
      icon: GraduationCap,
      title: "Profile",
      number: "04",
    },
  ]

  return (
    <div className="min-h-screen bg-transparent p-6 space-y-8">
      {/* Welcome Section */}
      <div className="max-w-5xl mx-auto space-y-2 bg-gradient-to-br from-black via-gray-800 to-white p-9 rounded-md text-white">
        <h1 className="text-4xl font-bold text-white">
          Hello, {user?.fullName}! 👋
        </h1>
        <p className="text-lg text-gray-100">
          Welcome to your Dashboard! Check your latest progress and insights on  today.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-4">Our Services:</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="relative overflow-hidden group hover:shadow-lg transition-shadow bg-white border border-gray-200 rounded-lg">
              <div className="p-6">
                <div className="absolute right-4 top-4 text-4xl font-bold text-gray-100">
                  {feature.number}
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-100 w-fit rounded-lg">
                    <feature.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{feature.title}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}