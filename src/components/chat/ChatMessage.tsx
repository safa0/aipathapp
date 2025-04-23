
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatTime } from "./chatUtils";
import { LanguageSelector } from "./LanguageSelector";
import { useMessageTranslation } from "./useMessageTranslation";
import { MessageActions } from "./MessageActions";

export interface ChatMessageProps {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  translateOptions?: boolean;
  currentLanguage?: string;
  onLanguageChange?: (lang: string) => void;
}

export const ChatMessage = ({
  text,
  isUser,
  timestamp,
  translateOptions,
  currentLanguage = "en",
  onLanguageChange
}: ChatMessageProps) => {
  // Översättnings-/ljudfunktion
  const [showTranslation, setShowTranslation] = useState(false);
  const {
    translated,
    isLoading,
    doTranslate,
  } = useMessageTranslation(text, currentLanguage);

  // Ljuduppspelning: enkelt med Web Speech API
  const playAudio = () => {
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = currentLanguage === "sv" ? "sv-SE"
        : currentLanguage === "es" ? "es-ES"
        : currentLanguage === "zh" ? "zh-CN"
        : currentLanguage === "ar" ? "ar-SA"
        : "en-US";
      window.speechSynthesis.speak(utter);
    } else {
      alert("Speech synthesis is not supported in this browser.");
    }
  };

  const handleTranslate = async () => {
    await doTranslate();
    setShowTranslation(true);
  };

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${isUser
        ? "bg-brand-purple text-white rounded-tr-none"
        : "bg-muted rounded-tl-none"
      }`}>
        <p>{text}</p>
        <p className={`text-xs mt-1 ${isUser ? "text-white/70" : "text-muted-foreground"}`}>
          {formatTime(timestamp)}
        </p>
        {showTranslation && translated && (
          <div className="mt-2 p-2 bg-brand-teal/10 rounded">
            <span className="block font-semibold mb-1 text-brand-teal">Översättning:</span>
            <span className="text-sm">{translated}</span>
          </div>
        )}
        <MessageActions
          text={text}
          targetLang={currentLanguage}
          onTranslate={handleTranslate}
          isTranslating={isLoading}
          translationShown={showTranslation}
          onPlayAudio={playAudio}
        />
        {/* Behåll överspråkbyte om det finns */}
        {translateOptions && onLanguageChange && currentLanguage && (
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />
        )}
      </div>
    </div>
  )
}
