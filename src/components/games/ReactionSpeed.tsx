
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function getRandomDelay() {
  return 1200 + Math.random() * 2000;
}

export default function ReactionSpeed({ onBack }: { onBack: () => void }) {
  const [waiting, setWaiting] = useState(true);
  const [go, setGo] = useState(false);
  const [time, setTime] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  function start() {
    setWaiting(true);
    setGo(false);
    setResult(null);
    setTime(null);

    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setGo(true);
      setWaiting(false);
      setTime(performance.now());
    }, getRandomDelay());
  }

  function click() {
    if (waiting) {
      setWaiting(false);
      setGo(false);
      setResult(-1);
      timer.current && clearTimeout(timer.current);
    } else if (go && time !== null) {
      setResult(Math.round(performance.now() - time));
      setGo(false);
    }
  }

  // Auto start on mount
  if (result === null && !waiting && !go) {
    start();
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-semibold">Reaction Speed</h2>
      </div>
      <div className="flex flex-col items-center">
        {!go && waiting && !result && (
          <Button className="bg-brand-teal text-xl px-10 py-8 mt-10" onClick={start}>
            Starta Testet
          </Button>
        )}
        {waiting && !result && (
          <div className="mt-8 text-muted-foreground text-lg">Vänta på grön!</div>
        )}
        {go && (
          <Button
            className="bg-green-500 text-white text-lg px-14 py-12 mt-10 animate-pulse"
            onClick={click}
          >
            KLICKA!
          </Button>
        )}
        {result === -1 && (
          <div className="mt-8 text-center">
            <p className="font-semibold text-red-600">För tidigt! Vänta på grön signal 🔴</p>
            <Button className="bg-brand-purple mt-3" onClick={start}>Försök igen</Button>
          </div>
        )}
        {typeof result === "number" && result > 0 && (
          <div className="mt-8 text-center">
            <p className="font-semibold text-brand-teal">Din reaktionstid:</p>
            <p className="text-2xl font-bold mb-2">{result} ms</p>
            <Button className="bg-brand-purple" onClick={start}>Försök igen</Button>
          </div>
        )}
        <div className="mt-8 text-gray-400 text-xs max-w-xs text-center">
          Hur snabbt kan du klicka när knappen blir grön? <br/> Klicka INTE direkt!
        </div>
      </div>
    </div>
  );
}
