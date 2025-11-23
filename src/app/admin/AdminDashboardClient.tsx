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
      {/* Tooth SVG */}
      <div className="relative w-48 h-48 animate-bounce-slow">
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Tooth shapes */}
          <g>
            <path
              style={{ fill: '#FF9900' }}
              d="M496.785,174.801c-16.158,76.139-33.132,108.7-43.496,163.866
                 C429.949,462.546,407.344,512,358.135,512c-57.125,0-56.145-187.369-106.823-187.369
                 C200.634,324.631,201.614,512,144.489,512c-9.14,0-17.3-1.713-24.808-5.304
                 c-11.262-5.386-20.891-15.016-29.46-29.46c-16.158-27.501-28.399-72.385-40.885-138.568
                 C38.972,283.501,21.997,250.94,5.839,174.801c-5.631-26.522-7.018-50.759-4.897-72.058
                 C6.492,44.475,37.747,7.426,78.959,1.224c8.079-1.224,16.24-1.469,24.482-0.979
                 c64.306,3.591,130.081,52.228,147.871,52.228c19.993,0,101.192-61.858,172.353-51.249
                 c6.692,0.979,13.057,2.856,19.177,5.468c19.014,7.997,34.846,23.584,45.455,45.455
                 C502.906,82.259,507.476,124.286,496.785,174.801z"
            />
            {/* Shine effect */}
            <ellipse
              cx="256"
              cy="100"
              rx="50"
              ry="20"
              fill="white"
              opacity="0.3"
              className="animate-pulse"
            />
          </g>
        </svg>
      </div>

      {/* Text */}
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
          DentWise
        </h3>
        <p className="text-lg text-muted-foreground font-medium">Preparing your dashboard</p>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-orange-200 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow { animation: bounce-slow 1.5s infinite; }
      `}</style>
    </div>
  );
}
