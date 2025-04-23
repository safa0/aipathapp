
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const EMOJIS = ["🍉", "🎲", "🌍", "🥨", "❄️", "🚀"];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

type CardType = {
  emoji: string;
  id: number;
  matched: boolean;
  flipped: boolean;
};

export default function MemoryGame({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedIdx, setFlippedIdx] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    // Setup shuffled cards, 2 of each
    const setup = shuffle(
      [...EMOJIS, ...EMOJIS].map((emoji, i) => ({
        emoji,
        id: i,
        matched: false,
        flipped: false,
      }))
    );
    setCards(setup);
    setMoves(0);
    setFlippedIdx([]);
    setWon(false);
  }, []);

  useEffect(() => {
    if (flippedIdx.length === 2) {
      setTimeout(() => {
        const [a, b] = flippedIdx;
        const isMatch = cards[a].emoji === cards[b].emoji;
        setCards(prev =>
          prev.map((card, idx) => {
            if (idx === a || idx === b) {
              return isMatch
                ? { ...card, matched: true }
                : { ...card, flipped: false };
            }
            return card;
          })
        );
        setFlippedIdx([]);
        setMoves(m => m + 1);
      }, 800);
    }
  }, [flippedIdx, cards]);

  useEffect(() => {
    if (cards.length && cards.every(c => c.matched)) setWon(true);
  }, [cards]);

  function flipCard(i: number) {
    if (
      flippedIdx.length >= 2 ||
      cards[i].flipped ||
      cards[i].matched
    )
      return;
    setCards(prev =>
      prev.map((c, idx) =>
        idx === i ? { ...c, flipped: true } : c
      )
    );
    setFlippedIdx(idx => [...idx, i]);
  }

  function restart() {
    const setup = shuffle(
      [...EMOJIS, ...EMOJIS].map((emoji, i) => ({
        emoji,
        id: i,
        matched: false,
        flipped: false,
      }))
    );
    setCards(setup);
    setMoves(0);
    setFlippedIdx([]);
    setWon(false);
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-semibold">Memory Game</h2>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6 max-w-md">
        {cards.map((card, i) => (
          <button
            key={card.id}
            disabled={card.flipped || card.matched || flippedIdx.length >= 2}
            className={`aspect-square flex items-center justify-center text-3xl rounded-lg border h-16 sm:h-20 bg-white/80 shadow cursor-pointer select-none transition-all ${
              card.flipped || card.matched
                ? "text-brand-purple"
                : "bg-brand-purple/10"
            }`}
            aria-label={card.flipped || card.matched ? card.emoji : ""}
            onClick={() => flipCard(i)}
          >
            {card.flipped || card.matched ? card.emoji : "?"}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-3 mb-3">
        <span className="text-sm text-muted-foreground">
          Antal drag: {moves}
        </span>
        {won && (
          <div className="text-center">
            <p className="font-semibold text-brand-teal mb-2">Grattis! Du klarade spelet på {moves} drag!</p>
            <Button className="bg-brand-purple" onClick={restart}>Spela igen</Button>
          </div>
        )}
      </div>
    </div>
  );
}
