"use client";

import AdminStates from "@/components/admin/AdminStates";
import DoctorManagement from "@/components/admin/DoctorManagement";
import Navbar from "@/components/Navbar";
import { useGetAppointments } from "@/hooks/use-appointments";
import { useGetDoctors } from "@/hooks/use-doctors";
import { useUser } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";

function AdminDashboardClient() {
  const { user } = useUser();
  const { data: doctors = [], isLoading:isLoadingDoctors } = useGetDoctors();
  const { data: appointments = [], isLoading:isLoadingAppointments } = useGetAppointments();

  //calculate states from real data
    const stats = {
      totalDoctors:doctors.length,
      activeDoctors:doctors.filter((doc) => doc.isActive).length,
      totalAppointments:appointments.length,
      completedAppointments:appointments.filter((app) => app.status === "COMPLETED").length
    }
    if(isLoadingDoctors || isLoadingAppointments){
      return <LoadingUI/>
    }
    
    //get all details
    return (
        <div>
            <div className="min-h-screen bg-background">
                <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* ADMIN WELCOME SECTION */}
        <div className="mb-12 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Admin Dashboard</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.firstName || "Admin"}!
              </h1>
              <p className="text-muted-foreground">
                Manage doctors, oversee appointments, and monitor your dental practice performance.
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>
        <AdminStates
      totalDoctors={stats.totalDoctors}
      activeDoctors={stats.activeDoctors}
      totalAppointments={stats.totalAppointments}
      completedAppointments={stats.completedAppointments} />
      <DoctorManagement/>
      </div>
    </div>
        </div>
    )
}

export default AdminDashboardClient

function LoadingUI() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      {/* Tooth */}
      <div className="relative w-24 h-32">
        {/* Tooth crown */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-14 bg-white rounded-t-[50%] shadow-lg border border-gray-200">
          {/* Shine */}
          <div className="absolute top-2 left-4 w-10 h-4 bg-white/40 rounded-full blur-sm animate-pulse"></div>
        </div>

        {/* Tooth root */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-12 h-20 bg-white rounded-b-[50%] border border-gray-200 shadow-inner">
          {/* Root tips */}
          <div className="absolute bottom-0 left-2 w-2 h-8 bg-white rounded-b-full animate-root-delay"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-10 bg-white rounded-b-full animate-root-delay" style={{ animationDelay: '0.1s' }}></div>
          <div className="absolute bottom-0 right-2 w-2 h-8 bg-white rounded-b-full animate-root-delay" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Rotating ring */}
        <div className="absolute -inset-6 border-2 border-primary/20 rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
          DentWise
        </h3>
        <p className="text-lg text-muted-foreground font-medium">Preparing your dashboard</p>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      {/* Tailwind custom animations */}
      <style jsx>{`
        @keyframes root-move {
          0%, 100% { height: 8px; }
          50% { height: 12px; }
        }
        .animate-root-delay { animation: root-move 1s infinite ease-in-out; }
      `}</style>
    </div>
  );
}
