"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MapPin,
  PlaneTakeoff,
  Plus,
  CheckCircle,
  Wallet,
  BookOpen,
  Globe,
  Compass,
  User,
  Settings,
} from "lucide-react";

const demoPages = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/trips/1", label: "Voyage Lisbonne", icon: MapPin },
  { href: "/trips/2", label: "Voyage Japon", icon: PlaneTakeoff },
  { href: "/trips/new", label: "Créer un voyage", icon: Plus },
  { href: "/explore", label: "Explorer", icon: Compass },
  { href: "/profile", label: "Profil & Allergies", icon: User },
  { href: "/settings", label: "Paramètres", icon: Settings },
];

export function DemoBanner() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider opacity-80">
            Mode Démo — Navigation rapide
          </span>
          <span className="text-xs opacity-60">Voygo MVP Preview</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {demoPages.map((page) => {
            const isActive = pathname === page.href ||
              (page.href !== "/dashboard" && pathname.startsWith(page.href));
            return (
              <Link
                key={page.href}
                href={page.href}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all shrink-0",
                  isActive
                    ? "bg-white text-primary-700 shadow-sm"
                    : "bg-white/15 text-white/90 hover:bg-white/25"
                )}
              >
                <page.icon className="h-3.5 w-3.5" />
                {page.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
