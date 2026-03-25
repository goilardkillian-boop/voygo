"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Compass, Plus, User, Settings } from "lucide-react";

const tabs = [
  { name: "Voyages", href: "/dashboard", icon: LayoutDashboard },
  { name: "Explorer", href: "/explore", icon: Compass },
  { name: "Nouveau", href: "/trips/new", icon: Plus, highlight: true },
  { name: "Profil", href: "/profile", icon: User },
  { name: "Plus", href: "/settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm lg:hidden">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 text-xs",
                tab.highlight
                  ? "text-primary-600"
                  : isActive
                    ? "text-primary-600"
                    : "text-slate-400"
              )}
            >
              {tab.highlight ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white shadow-md">
                  <tab.icon className="h-5 w-5" />
                </div>
              ) : (
                <tab.icon className="h-5 w-5" />
              )}
              <span className={cn(tab.highlight && "mt-0.5")}>{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
