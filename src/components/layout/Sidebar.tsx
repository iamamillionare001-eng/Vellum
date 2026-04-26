import Link from "next/link";
import { Zap } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white/5 backdrop-blur-lg border-r border-white/10 p-6 z-50">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Vellum<span className="text-violet-accent">.</span>
        </h1>
      </div>
      <nav className="flex-1 space-y-4">
        <Link href="/dashboard" className="block px-4 py-2 rounded-md bg-violet-accent/20 text-violet-accent font-medium transition-colors">
          Overview
        </Link>
        <Link href="/dashboard/triggers" className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          <Zap className="w-4 h-4" />
          Triggers
        </Link>
        <Link href="/dashboard/analytics" className="block px-4 py-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          Analytics
        </Link>
        <Link href="/dashboard/settings" className="block px-4 py-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          Settings
        </Link>
      </nav>
      <div className="mt-auto">
        <div className="px-4 py-2 rounded-md bg-white/5 border border-white/10 text-sm">
          <p className="font-medium text-white">Pro Plan</p>
          <p className="text-xs text-gray-400">All features unlocked</p>
        </div>
      </div>
    </aside>
  );
}
