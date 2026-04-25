import Link from "next/link";

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/5 backdrop-blur-lg border-t border-white/10 z-50 p-4 flex justify-around items-center">
      <Link href="/dashboard" className="text-violet-accent flex flex-col items-center">
        <span className="text-xl">📊</span>
        <span className="text-[10px] mt-1">Overview</span>
      </Link>
      <Link href="/dashboard/analytics" className="text-gray-400 hover:text-white flex flex-col items-center transition-colors">
        <span className="text-xl">📈</span>
        <span className="text-[10px] mt-1">Stats</span>
      </Link>
      <Link href="/dashboard/settings" className="text-gray-400 hover:text-white flex flex-col items-center transition-colors">
        <span className="text-xl">⚙️</span>
        <span className="text-[10px] mt-1">Settings</span>
      </Link>
    </nav>
  );
}
