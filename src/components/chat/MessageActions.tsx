
import { useState } from "react";
import { Volume2, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageActionsProps {
  text: string;
  targetLang: string;
  onTranslate: () => void;
  isTranslating: boolean;
  translationShown: boolean;
  onPlayAudio: () => void;
}

export const MessageActions = ({
  text,
  targetLang,
  onTranslate,
  isTranslating,
  translationShown,
  onPlayAudio,
}: MessageActionsProps) => {
  return (
    <div className="flex gap-2 mt-2">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Play audio"
        onClick={onPlayAudio}
        className="p-1 text-brand-purple hover:bg-brand-purple/10 focus:ring-0 focus:ring-offset-0"
      >
        <Volume2 size={18} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Translate message"
        onClick={onTranslate}
        disabled={isTranslating || translationShown}
        className="p-1 text-brand-teal hover:bg-brand-teal/10 focus:ring-0 focus:ring-offset-0"
      >
        <Languages size={18} />
      </Button>
    </div>
  );
};
