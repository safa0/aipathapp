
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad, Puzzle, Trophy, Star } from "lucide-react";
import MemoryGame from "./games/MemoryGame";
import QuizBattle from "./games/QuizBattle";
import ReactionSpeed from "./games/ReactionSpeed";

const miniGames = [
  {
    title: "Memory Game",
    description: "Vänd och matcha par av emojis på så få drag som möjligt.",
    icon: <Puzzle className="h-8 w-8 text-brand-purple" />,
    component: MemoryGame,
    color: "bg-brand-purple/10"
  },
  {
    title: "Quiz Battle",
    description: "Testa dina kunskaper om kultur och världen i snabba quizrundor.",
    icon: <Trophy className="h-8 w-8 text-brand-teal" />,
    component: QuizBattle,
    color: "bg-brand-teal/10"
  },
  {
    title: "Reaction Speed",
    description: "Hur snabbt kan du reagera när signalen blir grön?",
    icon: <Star className="h-8 w-8 text-yellow-600" />,
    component: ReactionSpeed,
    color: "bg-yellow-50"
  }
];

const GamePreview = () => {
  const [selectedGameIdx, setSelectedGameIdx] = useState<number | null>(null);

  const handleBackToMenu = () => setSelectedGameIdx(null);

  if (selectedGameIdx !== null) {
    const GameComponent = miniGames[selectedGameIdx].component;
    return (
      <div className="max-w-2xl w-full mx-auto animate-fade-in">
        <GameComponent onBack={handleBackToMenu} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold mb-3 flex items-center justify-center gap-2">
          <Gamepad className="h-8 w-8 text-brand-teal" />
          Spel & Aktiviteter
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Tre enkla, underhållande spel du snabbt hinner spela! Välj ett spel nedan:
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center mb-8">
        {miniGames.map((game, idx) => (
          <div // Changed from <button> to <div>
            key={game.title}
            className={`rounded-xl border p-6 flex flex-col gap-3 items-center shadow-md transition-transform duration-150 bg-white hover:scale-105 card-hover ${game.color}`}
            onClick={() => setSelectedGameIdx(idx)}
            aria-label={`Spela ${game.title}`}
          >
            <span className="mb-1">{game.icon}</span>
            <h3 className="font-semibold mb-1 text-base">{game.title}</h3>
            <p className="text-xs text-muted-foreground text-center">{game.description}</p>
            <Button className="mt-2 bg-brand-teal w-full">Spela</Button>
          </div>
        ))}
      </div>
      <div className="text-center text-muted-foreground text-xs">
        Perfekta spel för att slå ihjäl tid i väntan – och kanske lära dig något nytt!
      </div>
    </div>
  );
};

export default GamePreview;
