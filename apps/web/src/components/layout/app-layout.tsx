import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { DemoBanner } from "./demo-banner";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <DemoBanner />
      <div className="pt-[72px]">
        <Sidebar />
        <main className="pb-20 lg:pl-64 lg:pb-0">
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
