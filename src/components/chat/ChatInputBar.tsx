
import { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, MicOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// SpeechRecognition types are now defined in speech-recognition.d.ts

interface ChatInputBarProps {
  inputMessage: string;
  setInputMessage: (msg: string) => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  onSend: () => void;
}

export const ChatInputBar = ({
  inputMessage,
  setInputMessage,
  isRecording,
  onToggleRecording,
  onSend
}: ChatInputBarProps) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    // Initialize speech recognition
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionConstructor();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'sv-SE'; // Default to Swedish
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        setInputMessage(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Mikrofonfel",
          description: "Det gick inte att använda mikrofonen. Kontrollera behörigheter.",
          variant: "destructive"
        });
        if (isRecording) onToggleRecording();
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);
  
  useEffect(() => {
    if (isRecording && recognitionRef.current) {
      try {
        recognitionRef.current.start();
        toast({
          title: "Mikrofonen är på",
          description: "Tala nu, din röst spelas in.",
        });
      } catch (error) {
        console.error('Failed to start recording:', error);
      }
    } else if (!isRecording && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Failed to stop recording:', error);
      }
    }
  }, [isRecording]);

  return (
    <div className="border-t p-3 bg-white">
      <div className="flex gap-2">
        <Input
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onSend()}
          className="flex-1"
        />
        <Button
          onClick={onToggleRecording}
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          className="flex-shrink-0"
          title={isRecording ? "Stoppa inspelning" : "Starta röstinspelning"}
        >
          {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <Button onClick={onSend} className="flex-shrink-0 bg-brand-purple hover:bg-brand-purple/90">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
