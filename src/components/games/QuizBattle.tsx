
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const questions = [
  {
    q: "Vilket är Sveriges största landskap?",
    a: ["Skåne", "Lappland", "Norrland", "Västergötland"],
    correct: 1,
  },
  {
    q: "Vad betyder det japanska ordet 'sushi'?",
    a: ["Ris", "Fisk", "Rå", "Vatten"],
    correct: 0,
  },
  {
    q: "Vilket språk pratas INTE i Schweiz?",
    a: ["Franska", "Norska", "Tyska", "Italienska"],
    correct: 1,
  },
  {
    q: "Vilken färg har flaggan för Brasilien?",
    a: ["Blå & Vit", "Grön & Gul", "Röd & Vit", "Lila & Guld"],
    correct: 1,
  },
  {
    q: "Från vilket land kommer pizzan ursprungligen?",
    a: ["USA", "Spanien", "Italien", "Grekland"],
    correct: 2,
  }
];

export default function QuizBattle({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number|null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function answer(ans: number) {
    setSelected(ans);
    if (ans === questions[idx].correct) setScore(s => s + 1);
    setTimeout(() => {
      if (idx < questions.length - 1) {
        setIdx(i => i + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 1200);
  }

  function restart() {
    setIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-semibold">Quiz Battle</h2>
      </div>
      {!done ? (
        <div>
          <div className="mb-3 flex justify-between">
            <span className="text-muted-foreground text-sm">Fråga {idx + 1}/{questions.length}</span>
            <span className="text-muted-foreground text-sm">Poäng: {score}</span>
          </div>
          <h3 className="mb-4 font-semibold">{questions[idx].q}</h3>
          <div className="space-y-2">
            {questions[idx].a.map((opt, i) => (
              <Button
                key={i}
                className={`w-full justify-start ${
                  selected !== null
                    ? i === questions[idx].correct
                      ? "bg-green-100 text-green-700"
                      : i === selected
                        ? "bg-red-100 text-red-600"
                        : ""
                    : "bg-white"
                }`}
                disabled={selected !== null}
                onClick={() => answer(i)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="font-semibold text-brand-teal mb-2">
            Du fick {score} av {questions.length} poäng!
          </p>
          <Button className="bg-brand-purple mb-3" onClick={restart}>Försök igen</Button><br/>
          <Button variant="outline" onClick={onBack}>Tillbaka</Button>
        </div>
      )}
    </div>
  );
}
