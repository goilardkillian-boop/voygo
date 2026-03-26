"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  MapPin,
  LayoutDashboard,
  Settings,
  User,
  Plus,
  Compass,
} from "lucide-react";

const navigation = [
  { name: "Mes voyages", href: "/dashboard", icon: LayoutDashboard },
  { name: "Explorer", href: "/explore", icon: Compass },
  { name: "Profil", href: "/profile", icon: User },
  { name: "Paramètres", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-[72px] bottom-0 left-0 z-50 hidden w-64 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">Voygo</span>
        </div>

        {/* New trip button */}
        <div className="p-4">
          <Link
            href="/trips/new"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-700"
          >
            <Plus className="h-4 w-4" />
            Nouveau voyage
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 p-4">
            <p className="text-xs font-medium text-primary-800">Passe en Premium</p>
            <p className="mt-1 text-xs text-slate-500">
              Collaboration, documents, export et plus encore.
            </p>
            <Link
              href="/settings/premium"
              className="mt-3 inline-block text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              Voir les offres →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
