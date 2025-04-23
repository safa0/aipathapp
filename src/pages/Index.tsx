
import { useState } from "react";
import { MessageSquare, Compass, LayoutGrid } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import CulturalHub from "@/components/CulturalHub";
import GamePreview from "@/components/GamePreview";
import { Button } from "@/components/ui/button";

// Visningar
const VIEWS = [
  {
    name: "Kundtjänstchatt",
    key: "chat",
    icon: MessageSquare,
    color: "from-brand-purple to-brand-teal",
    bgHover: "hover:bg-brand-purple/10",
    description: "Få hjälp och chatta med kundtjänst."
  },
  {
    name: "Kulturell hub",
    key: "hub",
    icon: Compass,
    color: "from-brand-teal to-brand-purple",
    bgHover: "hover:bg-brand-teal/10",
    description: "Upptäck kultur, quiz och mer."
  },
  {
    name: "Spel",
    key: "games",
    icon: LayoutGrid,
    color: "from-yellow-400 to-brand-purple",
    bgHover: "hover:bg-yellow-100",
    description: "Tidsfördriv & lär genom spel."
  }
];

const Index = () => {
  const [view, setView] = useState<string | null>("chat");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-red-200 to-blue-300">
      {/* Card */}
      <div className="rounded-3xl shadow-xl border border-white/20 w-full max-w-2xl glass-morphism relative overflow-visible">
        {/* NY! Toppmeny med 3 val - alltid synlig, centrerad */}
        <div className="w-full flex flex-col items-center pt-7">
          <span className="font-display font-bold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-red-600 to-blue-700 select-none mb-3">CService</span>
          <div className="flex flex-row gap-4 mb-4 justify-center animate-fade-in">
            {VIEWS.map(v => {
              const Icon = v.icon;
              const isActive = view === v.key;
              return (
                <button
                  key={v.key}
                  type="button"
                  className={`group flex flex-col items-center justify-center min-w-[90px] px-5 py-3 bg-white/70 backdrop-blur-md rounded-2xl border shadow-md transition-transform duration-200 ${v.bgHover} ${isActive ? "ring-2 ring-brand-purple scale-105" : "hover:scale-105"}  focus:outline-none`}
                  onClick={() => setView(v.key)}
                  aria-pressed={isActive}
                >
                  <span className={
                    `flex items-center justify-center h-8 w-8 rounded-full mb-1 transition-colors
                    ${isActive
                      ? "bg-gradient-to-r from-brand-purple to-brand-teal text-white"
                      : "bg-brand-light text-brand-purple group-hover:bg-brand-purple/10"}`
                  }>
                    <Icon size={22} className="transition-all" />
                  </span>
                  <span className={`text-sm font-semibold ${isActive ? "text-brand-purple" : "text-gray-700"}`}>{v.name}</span>
                </button>
              );
            })}
          </div>
        </div>
        {/* Content area */}
        <main className="p-8 min-h-[390px] flex flex-col justify-center items-center bg-white/80 transition-all rounded-b-3xl">
          {view === "chat" && (
            <div className="w-full max-w-xl mx-auto animate-fade-in">
              <ChatInterface />
            </div>
          )}
          {view === "hub" && (
            <div className="w-full max-w-2xl mx-auto animate-fade-in">
              <CulturalHub />
            </div>
          )}
          {view === "games" && (
            <div className="w-full max-w-2xl mx-auto animate-fade-in">
              <GamePreview />
            </div>
          )}
          {!view && <span className="text-gray-500 text-lg">Välj en funktion från menyn ovan.</span>}
        </main>
      </div>
    </div>
  );
};

export default Index;
