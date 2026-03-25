"use client";

import { cn } from "@/lib/utils";

export type AdminTab = "menu" | "reservations";

interface AdminHeaderProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
}

const tabs: { id: AdminTab; label: string }[] = [
  { id: "menu", label: "Denní menu" },
  { id: "reservations", label: "Rezervace" },
];

export function AdminHeader({ activeTab, onTabChange, onLogout }: AdminHeaderProps) {
  return (
    <div className="bg-[var(--color-charcoal)]">
      {/* Top row */}
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-xl text-white">Administrace</h1>
        <button
          onClick={onLogout}
          className="text-xs text-white/60 hover:text-white uppercase tracking-wider transition-colors"
        >
          Odhlásit se
        </button>
      </div>
      {/* Tab bar */}
      <div className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "py-3 text-[11px] tracking-[0.2em] uppercase transition-all border-b-2",
                activeTab === tab.id
                  ? "text-white border-[var(--color-gold)]"
                  : "text-white/50 border-transparent hover:text-white/80"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
