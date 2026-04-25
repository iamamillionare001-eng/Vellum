import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-obsidian text-white">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0 md:ml-64">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
