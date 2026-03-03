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
          {error && <p className="text-red-600 text-xs">{error}</p>}
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
  allergens?: string;
  price: number;
  isVegetarian?: boolean;
}

function AllergenHint() {
  return (
    <p className="text-[9px] text-[var(--color-text-muted)] mt-1">
      1-obiloviny 2-korýši 3-vejce 4-ryby 5-arašídy 6-sója 7-mléko 8-skořápky 9-celer 10-hořčice 11-sezam 12-siřičitany 13-vlčí bob 14-měkkýši
    </p>
  );
}

function MenuEditor({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [soup, setSoup] = useState("");
  const [soupDescription, setSoupDescription] = useState("");
  const [soupAllergens, setSoupAllergens] = useState("");
  const [soupPrice, setSoupPrice] = useState(0);
  const [items, setItems] = useState<MenuItem[]>([
    { name: "", description: "", allergens: "", price: 0, isVegetarian: false },
  ]);
  const [dessert, setDessert] = useState("");
  const [dessertDescription, setDessertDescription] = useState("");
  const [dessertAllergens, setDessertAllergens] = useState("");
  const [dessertPrice, setDessertPrice] = useState(0);
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const existingMenu = useQuery(api.dailyMenu.getByDate, { date });
  const recentMenus = useQuery(api.dailyMenu.listRecent, { token });
  const history = useQuery(
    api.dailyMenu.getHistory,
    showHistory ? { token, date } : "skip"
  );
  const upsert = useMutation(api.dailyMenu.upsert);
  const remove = useMutation(api.dailyMenu.remove);
  const restoreVersion = useMutation(api.dailyMenu.restoreVersion);
  const logout = useMutation(api.auth.logout);

  // Load existing menu when date changes
  useEffect(() => {
    if (existingMenu) {
      setSoup(existingMenu.soup);
      setSoupDescription(existingMenu.soupDescription || "");
      setSoupAllergens(existingMenu.soupAllergens || "");
      setSoupPrice(existingMenu.soupPrice);
      setItems(
        existingMenu.items.map((i: any) => ({
          name: i.name,
          description: i.description,
          allergens: i.allergens || "",
          price: i.price,
          isVegetarian: i.isVegetarian || false,
        }))
      );
      setDessert(existingMenu.dessert || "");
      setDessertDescription(existingMenu.dessertDescription || "");
      setDessertAllergens(existingMenu.dessertAllergens || "");
      setDessertPrice(existingMenu.dessertPrice || 0);
      setIsPublished(existingMenu.isPublished);
    } else if (existingMenu === null) {
      setSoup("");
      setSoupDescription("");
      setSoupAllergens("");
      setSoupPrice(0);
      setItems([{ name: "", description: "", allergens: "", price: 0, isVegetarian: false }]);
      setDessert("");
      setDessertDescription("");
      setDessertAllergens("");
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
        soupDescription: soupDescription || undefined,
        soupAllergens: soupAllergens || undefined,
        soupPrice,
        items: filteredItems.map((i) => ({
          name: i.name,
          description: i.description,
          allergens: i.allergens || undefined,
          price: i.price,
          isVegetarian: i.isVegetarian || undefined,
        })),
        dessert: dessert || undefined,
        dessertDescription: dessertDescription || undefined,
        dessertAllergens: dessertAllergens || undefined,
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

  const handleRestore = async (historyId: string) => {
    if (!confirm("Obnovit tuto verzi? Aktuální verze bude uložena do historie.")) return;
    try {
      await restoreVersion({ token, historyId: historyId as any });
      setMessage("Verze obnovena!");
      setTimeout(() => setMessage(""), 2000);
    } catch {
      alert("Chyba při obnovování");
    }
  };

  const handleLogout = async () => {
    await logout({ token });
    onLogout();
  };

  const addItem = () => {
    setItems([...items, { name: "", description: "", allergens: "", price: 0, isVegetarian: false }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof MenuItem, value: string | number | boolean) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("cs-CZ", { weekday: "short", day: "numeric", month: "numeric" });
  };

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleString("cs-CZ", {
      day: "numeric",
      month: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      {/* Header */}
      <div className="bg-[var(--color-charcoal)] text-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="font-serif text-xl">Denní menu — Administrace</h1>
          <button
            onClick={handleLogout}
            className="text-xs text-white/60 hover:text-white uppercase tracking-wider"
          >
            Odhlásit se
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date picker + version info */}
            <div className="flex items-end gap-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-2">
                  Datum
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setShowHistory(false);
                  }}
                  className="px-4 py-2 border border-[var(--color-stone)] bg-white text-sm text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-gold)]"
                />
              </div>
              {existingMenu && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--color-text-muted)]">
                    v{existingMenu.version || 1}
                  </span>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-xs text-[var(--color-gold-dark)] hover:text-[var(--color-charcoal)] underline"
                  >
                    {showHistory ? "Skrýt historii" : "Historie verzí"}
                  </button>
                </div>
              )}
            </div>

            {/* Version History Panel */}
            {showHistory && history && (
              <div className="bg-white p-4 border border-[var(--color-stone)]/30">
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] mb-3">
                  Historie verzí — {formatDate(date)}
                </h3>
                {history.length === 0 ? (
                  <p className="text-xs text-[var(--color-text-muted)]">Žádná předchozí verze</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {history.map((h) => (
                      <div
                        key={h._id}
                        className="flex items-center justify-between py-2 px-3 bg-[var(--color-ivory)] text-xs"
                      >
                        <div>
                          <span className="font-medium text-[var(--color-charcoal)]">v{h.version}</span>
                          <span className="text-[var(--color-text-muted)] ml-2">{formatTime(h.savedAt)}</span>
                          <span className="text-[var(--color-text-muted)] ml-2">
                            — {h.soup}, {h.items.length} jídel
                            {h.isPublished ? " (pub)" : ""}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRestore(h._id)}
                          className="text-[var(--color-gold-dark)] hover:text-[var(--color-charcoal)] underline shrink-0 ml-3"
                        >
                          Obnovit
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Soup */}
            <div className="bg-white p-6 border border-[var(--color-stone)]/30">
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] mb-4">
                Polévka
              </h3>
              <div className="space-y-3">
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
                <input
                  type="text"
                  value={soupDescription}
                  onChange={(e) => setSoupDescription(e.target.value)}
                  placeholder="Popis (volitelný)"
                  className="w-full px-3 py-2 border border-[var(--color-stone)] text-xs focus:outline-none focus:border-[var(--color-gold)]"
                />
                <div>
                  <input
                    type="text"
                    value={soupAllergens}
                    onChange={(e) => setSoupAllergens(e.target.value)}
                    placeholder="Alergeny (např. 1,3,7)"
                    className="w-full px-3 py-2 border border-[var(--color-stone)] text-xs focus:outline-none focus:border-[var(--color-gold)]"
                  />
                  <AllergenHint />
                </div>
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
              <div className="space-y-5">
                {items.map((item, i) => (
                  <div key={i} className="space-y-2 pb-5 border-b border-[var(--color-stone)]/20 last:border-0 last:pb-0">
                    <div className="flex gap-3 items-start">
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
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={item.allergens || ""}
                              onChange={(e) => updateItem(i, "allergens", e.target.value)}
                              placeholder="Alergeny (např. 1,3,7)"
                              className="w-full px-3 py-2 border border-[var(--color-stone)] text-xs focus:outline-none focus:border-[var(--color-gold)]"
                            />
                          </div>
                          <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
                            <input
                              type="checkbox"
                              checked={item.isVegetarian || false}
                              onChange={(e) => updateItem(i, "isVegetarian", e.target.checked)}
                              className="accent-green-600"
                            />
                            <span className="text-xs text-green-700">(v)</span>
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
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
                            className="text-red-400 hover:text-red-600 text-xs"
                          >
                            Odebrat
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <AllergenHint />
            </div>

            {/* Dessert */}
            <div className="bg-white p-6 border border-[var(--color-stone)]/30">
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] mb-4">
                Dezert (volitelné)
              </h3>
              <div className="space-y-3">
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
                <input
                  type="text"
                  value={dessertDescription}
                  onChange={(e) => setDessertDescription(e.target.value)}
                  placeholder="Popis (volitelný)"
                  className="w-full px-3 py-2 border border-[var(--color-stone)] text-xs focus:outline-none focus:border-[var(--color-gold)]"
                />
                <div>
                  <input
                    type="text"
                    value={dessertAllergens}
                    onChange={(e) => setDessertAllergens(e.target.value)}
                    placeholder="Alergeny (např. 7,8,12)"
                    className="w-full px-3 py-2 border border-[var(--color-stone)] text-xs focus:outline-none focus:border-[var(--color-gold)]"
                  />
                  <AllergenHint />
                </div>
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
                    onClick={() => {
                      setDate(menu.date);
                      setShowHistory(false);
                    }}
                    className={`text-left hover:text-[var(--color-gold-dark)] ${
                      menu.date === date
                        ? "text-[var(--color-gold-dark)] font-medium"
                        : "text-[var(--color-charcoal)]"
                    }`}
                  >
                    <span>{formatDate(menu.date)}</span>
                    <span className="text-[10px] text-[var(--color-text-muted)] ml-1">v{menu.version || 1}</span>
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
  const isValid = useQuery(api.auth.verifySession, token ? { token } : "skip");

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

  if (token && isValid === undefined) {
    return (
      <div className="min-h-screen bg-[var(--color-ivory)] flex items-center justify-center">
        <p className="text-[var(--color-text-muted)] text-sm">Načítání...</p>
      </div>
    );
  }

  if (token && isValid === false) {
    sessionStorage.removeItem("admin_token");
    return <LoginForm onLogin={handleLogin} />;
  }

  if (!token) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <MenuEditor token={token} onLogout={handleLogout} />;
}
