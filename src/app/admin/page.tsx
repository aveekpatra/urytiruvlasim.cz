"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useMutation(api.auth.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await login({ password });
      onLogin(token);
    } catch {
      setError("Nesprávné heslo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl text-[var(--color-charcoal)] text-center mb-8">
          Administrace
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Heslo"
            className="w-full px-4 py-3 border border-[var(--color-stone)] bg-white text-[var(--color-charcoal)] text-sm focus:outline-none focus:border-[var(--color-gold)]"
          />
          {error && (
            <p className="text-red-600 text-xs">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--color-charcoal)] text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-gold)] transition-colors disabled:opacity-50"
          >
            {loading ? "Přihlašování..." : "Přihlásit se"}
          </button>
        </form>
      </div>
    </div>
  );
}

interface MenuItem {
  name: string;
  description: string;
  price: number;
}

function MenuEditor({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [soup, setSoup] = useState("");
  const [soupPrice, setSoupPrice] = useState(0);
  const [items, setItems] = useState<MenuItem[]>([
    { name: "", description: "", price: 0 },
  ]);
  const [dessert, setDessert] = useState("");
  const [dessertPrice, setDessertPrice] = useState(0);
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const existingMenu = useQuery(api.dailyMenu.getByDate, { date });
  const recentMenus = useQuery(api.dailyMenu.listRecent, { token });
  const upsert = useMutation(api.dailyMenu.upsert);
  const remove = useMutation(api.dailyMenu.remove);
  const logout = useMutation(api.auth.logout);

  // Load existing menu when date changes
  useEffect(() => {
    if (existingMenu) {
      setSoup(existingMenu.soup);
      setSoupPrice(existingMenu.soupPrice);
      setItems(existingMenu.items);
      setDessert(existingMenu.dessert || "");
      setDessertPrice(existingMenu.dessertPrice || 0);
      setIsPublished(existingMenu.isPublished);
    } else if (existingMenu === null) {
      setSoup("");
      setSoupPrice(0);
      setItems([{ name: "", description: "", price: 0 }]);
      setDessert("");
      setDessertPrice(0);
      setIsPublished(false);
    }
  }, [existingMenu]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const filteredItems = items.filter((i) => i.name.trim() !== "");
      await upsert({
        token,
        date,
        soup,
        soupPrice,
        items: filteredItems,
        dessert: dessert || undefined,
        dessertPrice: dessertPrice || undefined,
        isPublished,
      });
      setMessage("Uloženo!");
      setTimeout(() => setMessage(""), 2000);
    } catch {
      setMessage("Chyba při ukládání");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Opravdu smazat toto menu?")) return;
    try {
      await remove({ token, id: id as any });
    } catch {
      alert("Chyba při mazání");
    }
  };

  const handleLogout = async () => {
    await logout({ token });
    onLogout();
  };

  const addItem = () => {
    setItems([...items, { name: "", description: "", price: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof MenuItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("cs-CZ", { weekday: "short", day: "numeric", month: "numeric" });
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      {/* Header */}
      <div className="bg-[var(--color-charcoal)] text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="font-serif text-xl">Denní menu — Administrace</h1>
          <button
            onClick={handleLogout}
            className="text-xs text-white/60 hover:text-white uppercase tracking-wider"
          >
            Odhlásit se
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date picker */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-2">
                Datum
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-4 py-2 border border-[var(--color-stone)] bg-white text-sm text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-gold)]"
              />
            </div>

            {/* Soup */}
            <div className="bg-white p-6 border border-[var(--color-stone)]/30">
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] mb-4">
                Polévka
              </h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={soup}
                  onChange={(e) => setSoup(e.target.value)}
                  placeholder="Název polévky"
                  className="flex-1 px-3 py-2 border border-[var(--color-stone)] text-sm focus:outline-none focus:border-[var(--color-gold)]"
                />
                <input
                  type="number"
                  value={soupPrice || ""}
                  onChange={(e) => setSoupPrice(Number(e.target.value))}
                  placeholder="Kč"
                  className="w-24 px-3 py-2 border border-[var(--color-stone)] text-sm focus:outline-none focus:border-[var(--color-gold)]"
                />
              </div>
            </div>

            {/* Main courses */}
            <div className="bg-white p-6 border border-[var(--color-stone)]/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)]">
                  Hlavní jídla
                </h3>
                <button
                  onClick={addItem}
                  className="text-xs text-[var(--color-gold-dark)] hover:text-[var(--color-charcoal)] uppercase tracking-wider"
                >
                  + Přidat
                </button>
              </div>
              <div className="space-y-4">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(i, "name", e.target.value)}
                        placeholder="Název jídla"
                        className="w-full px-3 py-2 border border-[var(--color-stone)] text-sm focus:outline-none focus:border-[var(--color-gold)]"
                      />
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(i, "description", e.target.value)}
                        placeholder="Popis / příloha"
                        className="w-full px-3 py-2 border border-[var(--color-stone)] text-xs focus:outline-none focus:border-[var(--color-gold)]"
                      />
                    </div>
                    <input
                      type="number"
                      value={item.price || ""}
                      onChange={(e) => updateItem(i, "price", Number(e.target.value))}
                      placeholder="Kč"
                      className="w-24 px-3 py-2 border border-[var(--color-stone)] text-sm focus:outline-none focus:border-[var(--color-gold)]"
                    />
                    {items.length > 1 && (
                      <button
                        onClick={() => removeItem(i)}
                        className="text-red-400 hover:text-red-600 text-lg mt-2"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Dessert */}
            <div className="bg-white p-6 border border-[var(--color-stone)]/30">
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] mb-4">
                Dezert (volitelné)
              </h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={dessert}
                  onChange={(e) => setDessert(e.target.value)}
                  placeholder="Název dezertu"
                  className="flex-1 px-3 py-2 border border-[var(--color-stone)] text-sm focus:outline-none focus:border-[var(--color-gold)]"
                />
                <input
                  type="number"
                  value={dessertPrice || ""}
                  onChange={(e) => setDessertPrice(Number(e.target.value))}
                  placeholder="Kč"
                  className="w-24 px-3 py-2 border border-[var(--color-stone)] text-sm focus:outline-none focus:border-[var(--color-gold)]"
                />
              </div>
            </div>

            {/* Publish & Save */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="accent-[var(--color-gold)]"
                />
                <span className="text-sm text-[var(--color-charcoal)]">Publikovat</span>
              </label>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-3 bg-[var(--color-charcoal)] text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-gold)] transition-colors disabled:opacity-50"
              >
                {saving ? "Ukládání..." : "Uložit menu"}
              </button>
              {message && (
                <span className="text-sm text-[var(--color-gold-dark)]">{message}</span>
              )}
            </div>
          </div>

          {/* Sidebar - recent menus */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-4">
              Poslední menu
            </h3>
            <div className="space-y-2">
              {recentMenus?.map((menu) => (
                <div
                  key={menu._id}
                  className="flex items-center justify-between bg-white p-3 border border-[var(--color-stone)]/30 text-sm"
                >
                  <button
                    onClick={() => setDate(menu.date)}
                    className="text-[var(--color-charcoal)] hover:text-[var(--color-gold-dark)]"
                  >
                    {formatDate(menu.date)}
                  </button>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${menu.isPublished ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <button
                      onClick={() => handleDelete(menu._id)}
                      className="text-red-400 hover:text-red-600 text-xs"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
              {recentMenus?.length === 0 && (
                <p className="text-xs text-[var(--color-text-muted)]">Zatím žádné menu</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const isValid = useQuery(
    api.auth.verifySession,
    token ? { token } : "skip"
  );

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    sessionStorage.setItem("admin_token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem("admin_token");
  };

  // Still loading or checking session
  if (token && isValid === undefined) {
    return (
      <div className="min-h-screen bg-[var(--color-ivory)] flex items-center justify-center">
        <p className="text-[var(--color-text-muted)] text-sm">Načítání...</p>
      </div>
    );
  }

  // Token expired or invalid
  if (token && isValid === false) {
    sessionStorage.removeItem("admin_token");
    return <LoginForm onLogin={handleLogin} />;
  }

  if (!token) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <MenuEditor token={token} onLogout={handleLogout} />;
}
