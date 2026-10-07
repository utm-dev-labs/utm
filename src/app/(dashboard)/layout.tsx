import { Sidebar } from "@/components/layout/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Sidebar />
      <main className="ml-60 p-6">
        {children}
      </main>
    </div>
  )
}
