"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { cn } from "@/lib/utils";

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("cs-CZ", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

function formatCreatedAt(ts: number) {
  return new Date(ts).toLocaleString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusConfig = {
  pending: { label: "Čeká", className: "bg-amber-100 text-amber-800" },
  confirmed: { label: "Potvrzeno", className: "bg-green-100 text-green-800" },
  rejected: { label: "Zamítnuto", className: "bg-red-100 text-red-800" },
};

export function ReservationPanel({ token }: { token: string }) {
  const pending = useQuery(api.reservations.listPending, { token });
  const all = useQuery(api.reservations.listAll, { token });
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [errorId, setErrorId] = useState<string | null>(null);

  const handleAction = async (reservationId: string, action: "confirm" | "reject") => {
    setLoadingIds((prev) => new Set(prev).add(reservationId));
    setErrorId(null);
    try {
      const res = await fetch(`/api/reservation/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, reservationId }),
      });
      if (!res.ok) throw new Error("Failed");
    } catch {
      setErrorId(reservationId);
    } finally {
      setLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(reservationId);
        return next;
      });
    }
  };

  const pendingCount = pending?.length ?? 0;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending reservations */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
              Čekající rezervace
            </h2>
            {pendingCount > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-medium px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </div>

          {pending === undefined && (
            <p className="text-sm text-[var(--color-text-muted)]">Načítání...</p>
          )}

          {pending?.length === 0 && (
            <div className="bg-white p-8 border border-[var(--color-stone)]/30 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">Žádné čekající rezervace</p>
            </div>
          )}

          {pending?.map((r) => (
            <div
              key={r._id}
              className="bg-white p-6 border border-[var(--color-stone)]/30"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium text-[var(--color-charcoal)] text-base">
                    {r.name}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    přijato {formatCreatedAt(r.createdAt)}
                  </p>
                </div>
                <span className={cn("text-[10px] font-medium px-2.5 py-1 rounded-full", statusConfig.pending.className)}>
                  {statusConfig.pending.label}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] block mb-0.5">Datum</span>
                  <span className="text-[var(--color-charcoal)] font-medium">{formatDate(r.date)}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] block mb-0.5">Čas</span>
                  <span className="text-[var(--color-charcoal)] font-medium">{r.time}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] block mb-0.5">Osob</span>
                  <span className="text-[var(--color-charcoal)] font-medium">{r.guests}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] block mb-0.5">Telefon</span>
                  <a href={`tel:${r.phone}`} className="text-[var(--color-gold-dark)] hover:underline">{r.phone}</a>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] block mb-0.5">E-mail</span>
                  <a href={`mailto:${r.email}`} className="text-[var(--color-gold-dark)] hover:underline text-xs">{r.email}</a>
                </div>
              </div>

              {r.occasion && (
                <div className="text-sm mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Příležitost: </span>
                  <span className="text-[var(--color-charcoal)]">{r.occasion}</span>
                </div>
              )}

              {r.notes && (
                <div className="text-sm mb-4 bg-[var(--color-ivory)] p-3 border-l-2 border-[var(--color-gold)]">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">Poznámka</span>
                  <span className="text-[var(--color-charcoal)]">{r.notes}</span>
                </div>
              )}

              {errorId === r._id && (
                <p className="text-red-600 text-xs mb-3">Chyba při zpracování. Zkuste to znovu.</p>
              )}

              <div className="flex gap-3 pt-2 border-t border-[var(--color-stone)]/20">
                <button
                  onClick={() => handleAction(r._id, "confirm")}
                  disabled={loadingIds.has(r._id)}
                  className="px-6 py-2.5 bg-green-600 text-white text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loadingIds.has(r._id) ? "..." : "Potvrdit"}
                </button>
                <button
                  onClick={() => handleAction(r._id, "reject")}
                  disabled={loadingIds.has(r._id)}
                  className="px-6 py-2.5 border border-red-300 text-red-600 text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {loadingIds.has(r._id) ? "..." : "Zamítnout"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar - all reservations history */}
        <div>
          <h3 className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-4">
            Poslední rezervace
          </h3>
          <div className="space-y-2">
            {all?.map((r) => (
              <div
                key={r._id}
                className="bg-white p-3 border border-[var(--color-stone)]/30 text-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-[var(--color-charcoal)] text-xs">{r.name}</span>
                  <span className={cn("text-[9px] font-medium px-2 py-0.5 rounded-full", statusConfig[r.status].className)}>
                    {statusConfig[r.status].label}
                  </span>
                </div>
                <div className="text-[10px] text-[var(--color-text-muted)]">
                  {formatDate(r.date)} · {r.time} · {r.guests} {r.guests === 1 ? "osoba" : r.guests < 5 ? "osoby" : "osob"}
                </div>
              </div>
            ))}
            {all?.length === 0 && (
              <p className="text-xs text-[var(--color-text-muted)]">Zatím žádné rezervace</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
