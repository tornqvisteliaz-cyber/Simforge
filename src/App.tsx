import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Apple,
  BarChart3,
  BellRing,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChefHat,
  Flame,
  Plus,
  Refrigerator,
  ScanLine,
  ShoppingBasket,
  Sparkles,
  Target,
  Utensils,
} from "lucide-react";
import {
  buildMealPlan,
  FridgeItem,
  getExpiryStatus,
  getTotals,
  mockScanResults,
  starterInventory,
} from "./lib/nutrition";

const categoryLabels: Record<FridgeItem["category"], string> = {
  protein: "Protein",
  carb: "Kolhydrat",
  fat: "Fett",
  veg: "Grönt",
  dairy: "Mejeri",
  fruit: "Frukt",
};

const categoryColors: Record<FridgeItem["category"], string> = {
  protein: "bg-emerald-100 text-emerald-800",
  carb: "bg-amber-100 text-amber-800",
  fat: "bg-lime-100 text-lime-800",
  veg: "bg-green-100 text-green-800",
  dairy: "bg-sky-100 text-sky-800",
  fruit: "bg-fuchsia-100 text-fuchsia-800",
};

function App() {
  const [items, setItems] = useState(starterInventory);
  const [scanState, setScanState] = useState<"idle" | "scanning" | "done">("idle");
  const [goal, setGoal] = useState("Muskelbygge");
  const totals = useMemo(() => getTotals(items), [items]);
  const mealPlan = useMemo(() => buildMealPlan(items), [items]);
  const urgentItems = items.filter((item) => item.expiresInDays <= 3).sort((a, b) => a.expiresInDays - b.expiresInDays);
  const proteinTarget = goal === "Deff" ? 170 : goal === "Balans" ? 140 : 190;
  const calorieTarget = goal === "Deff" ? 2_100 : goal === "Balans" ? 2_450 : 2_850;

  const runScan = () => {
    setScanState("scanning");
    window.setTimeout(() => {
      setItems((current) => {
        const existingNames = new Set(current.map((item) => item.name));
        return [...current, ...mockScanResults.filter((item) => !existingNames.has(item.name))];
      });
      setScanState("done");
    }, 900);
  };

  const addProteinBoost = () => {
    const nextId = Math.max(...items.map((item) => item.id)) + 1;
    setItems((current) => [
      ...current,
      {
        id: nextId,
        name: "Tonfisk",
        category: "protein",
        protein: 29,
        calories: 132,
        servings: 2,
        expiresInDays: 8,
        storageTip: "Stabil reservprotein till dagar när kylskåpet är tomt.",
      },
    ]);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f7ef] text-slate-950">
      <section className="relative isolate px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#b9f57a_0,transparent_34%),radial-gradient(circle_at_top_right,#90e0ef_0,transparent_28%),linear-gradient(135deg,#f7ffe8_0%,#eef7ff_50%,#fff7ed_100%)]" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/70 px-5 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-slate-950 text-lime-300 shadow-lg">
              <Refrigerator size={22} />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">FridgeFit</p>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">AI meal coach</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {["Skanna", "Plan", "Utgång", "Inköp"].map((link) => (
              <a key={link} className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-950 hover:text-white" href={`#${link.toLowerCase()}`}>
                {link}
              </a>
            ))}
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-8 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/75 px-4 py-2 text-sm font-extrabold text-emerald-700 shadow-sm">
              <Sparkles size={16} /> Smart dietapp för kylskåpet du redan har
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Skanna kylen. Få en veckas måltider med protein och kalorier i kontroll.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              FridgeFit identifierar matvaror, prioriterar det som går ut först, bygger proteinrika måltider och skapar en inköpslista som fyller dina makroluckor.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={runScan} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 text-base font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-700">
                <Camera size={20} /> {scanState === "scanning" ? "Skannar kylskåpet..." : "Starta kylskåpsscan"}
              </button>
              <button onClick={addProteinBoost} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300">
                <Plus size={20} /> Lägg till proteinboost
              </button>
            </div>
          </div>

          <div id="skanna" className="rounded-[2rem] border border-white bg-white/80 p-4 shadow-2xl shadow-emerald-900/10 backdrop-blur">
            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-300">Live scan</p>
                  <h2 className="mt-1 text-2xl font-black">Kylskåpskamera</h2>
                </div>
                <ScanLine className={scanState === "scanning" ? "animate-pulse text-lime-300" : "text-white"} />
              </div>
              <div className="mt-5 grid min-h-72 place-items-center rounded-3xl border border-white/10 bg-[linear-gradient(135deg,#142018,#20302b)] p-5">
                <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/10 p-4">
                  <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-300">
                    <span>Identifierade varor</span>
                    <span>{items.length} st</span>
                  </div>
                  <div className="space-y-3">
                    {items.slice(0, 6).map((item) => (
                      <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                        <span className="font-bold">{item.name}</span>
                        <span className="text-sm text-lime-200">{item.protein}g protein</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-300">
                {scanState === "done" ? "Scan klar: nya varor lades till i planen." : "Ladda upp eller ta en bild i mobilen för att fylla inventariet automatiskt."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-8 sm:px-10 lg:grid-cols-4 lg:px-16">
        <MetricCard icon={<Target />} label="Dagligt proteinmål" value={`${proteinTarget}g`} helper={`${Math.round(totals.protein / 7)}g planerat/dag`} />
        <MetricCard icon={<Flame />} label="Kalorimål" value={`${calorieTarget.toLocaleString("sv-SE")}`} helper={`${Math.round(totals.calories / 7)} kcal från kylen/dag`} />
        <MetricCard icon={<Utensils />} label="Portioner" value={totals.servings.toString()} helper="Tillgängligt i inventariet" />
        <div className="rounded-3xl border border-white bg-white p-5 shadow-sm">
          <p className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-slate-500"><BarChart3 size={16} /> Mål</p>
          <div className="grid grid-cols-3 gap-2">
            {["Muskelbygge", "Balans", "Deff"].map((option) => (
              <button key={option} onClick={() => setGoal(option)} className={`rounded-2xl px-3 py-3 text-sm font-black transition ${goal === option ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="utgång" className="mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <BellRing className="text-lime-300" />
            <h2 className="text-3xl font-black">Utgångslarm</h2>
          </div>
          <p className="mt-3 text-slate-300">Appen bygger planen runt varor med kortast hållbarhet så att du slänger mindre och äter bättre.</p>
          <div className="mt-6 space-y-3">
            {urgentItems.map((item) => (
              <div key={item.id} className="rounded-3xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-black">{item.name}</p>
                    <p className="text-sm text-slate-300">{item.storageTip}</p>
                  </div>
                  <span className="rounded-full bg-orange-400 px-3 py-1 text-xs font-black text-slate-950">{item.expiresInDays} dagar</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Inventarie</p>
              <h2 className="text-3xl font-black">Det appen hittade i kylen</h2>
            </div>
            <ShoppingBasket className="text-emerald-700" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {items.map((item) => (
              <article key={item.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.servings} portioner · {item.calories} kcal · {item.protein}g protein</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${categoryColors[item.category]}`}>{categoryLabels[item.category]}</span>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-white px-3 py-2 text-sm font-bold">
                  <span className="flex items-center gap-2"><AlertTriangle size={15} /> {getExpiryStatus(item.expiresInDays)}</span>
                  <span>{item.expiresInDays} dagar kvar</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="plan" className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-16">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-emerald-700"><CalendarDays size={16} /> Veckoplan</p>
            <h2 className="text-4xl font-black tracking-tight">7 dagar proteinrika måltider</h2>
          </div>
          <p className="max-w-xl text-slate-600">Varje kort väljer först en proteinkälla och kopplar den till varor som riskerar att gå ut.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {mealPlan.map((meal) => (
            <article key={meal.day} className="flex min-h-72 flex-col rounded-[1.75rem] border border-white bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">{meal.day}</span>
                <span className="text-xs font-black text-emerald-700">{meal.priority}</span>
              </div>
              <ChefHat className="mb-3 text-emerald-700" />
              <h3 className="text-lg font-black leading-tight">{meal.title}</h3>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-600">
                {meal.ingredients.map((ingredient) => (
                  <li key={ingredient} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> {ingredient}</li>
                ))}
              </ul>
              <div className="mt-5 grid grid-cols-2 gap-2 text-center text-sm font-black">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-800">{meal.protein}g protein</div>
                <div className="rounded-2xl bg-orange-50 p-3 text-orange-800">{meal.calories} kcal</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="inköp" className="mx-auto max-w-7xl px-6 py-8 pb-16 sm:px-10 lg:px-16">
        <div className="grid gap-6 rounded-[2rem] bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-emerald-700"><Apple size={16} /> Smart inköpslista</p>
            <h2 className="mt-2 text-4xl font-black">Fyll luckorna utan att spräcka kalorierna.</h2>
            <p className="mt-4 text-slate-600">Baserat på skanningen rekommenderas mat som ger mer protein per kalori, bättre fiber och längre hållbarhet.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Kvarg naturell", "+60g protein", "Billigt mellanmål och frukostbas"],
              ["Frysta wokgrönsaker", "+fiber", "Kompletterar lådor när färskt grönt tar slut"],
              ["Fullkornstortillas", "+snabba carbs", "Gör rester till wraps på 4 minuter"],
              ["Kryddmix utan socker", "+smak", "Gör repetitiva meal-preps roligare"],
            ].map(([name, stat, text]) => (
              <div key={name} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <p className="font-black">{name}</p>
                <p className="mt-1 text-sm font-black text-emerald-700">{stat}</p>
                <p className="mt-3 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function MetricCard({ icon, label, value, helper }: { icon: ReactNode; label: string; value: string; helper: string }) {
  return (
    <div className="rounded-3xl border border-white bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">{icon}</div>
      <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-4xl font-black tracking-tight">{value}</p>
      <p className="mt-1 text-sm font-semibold text-slate-500">{helper}</p>
    </div>
  );
}

export default App;
