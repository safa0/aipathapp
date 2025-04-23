import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Languages } from "lucide-react";
import { ChatInputBar } from "./chat/ChatInputBar";
import { ChatMessageList } from "./chat/ChatMessageList";
import { ChatMessage as MessageType } from "./chat/chatTypes";
import { toast } from "@/hooks/use-toast";

// SpeechRecognition types are now defined in speech-recognition.d.ts

const languages = [
  { code: "en", name: "English" },
  { code: "sv", name: "Swedish" },
  { code: "es", name: "Spanish" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" }
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    { id: 1, text: "Hello! How can I help you today?", isUser: false, timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      toast({
        title: "Varning",
        description: "Din webbläsare stöder inte röstinspelning. Försök med Chrome eller Edge.",
        variant: "default",
      });
    }
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    setMessages([
      ...messages,
      { id: Date.now(), text: inputMessage, isUser: true, timestamp: new Date() }
    ]);
    setInputMessage("");
    
    // Call the local API server
    fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: inputMessage,
        session_id: null // Let the server generate a new session ID if needed
      })
    })
    .then(response => response.json())
    .then(data => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: data.response,
          isUser: false,
          timestamp: new Date(),
          translateOptions: inputMessage.toLowerCase().includes("language") || inputMessage.toLowerCase().includes("translate")
        }
      ]);
      
      // Optionally handle follow-up questions from the API
      if (data.follow_up_questions && data.follow_up_questions.length > 0) {
        // You could display these somehow in the UI
        console.log("Follow-up questions:", data.follow_up_questions);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
          isUser: false,
          timestamp: new Date()
        }
      ]);
    });
  };

  const toggleRecording = () => {
    setIsRecording(prev => !prev);
    
    // If stopping recording, send the message if there's any input
    if (isRecording && inputMessage.trim() !== "") {
      // Small delay to allow final transcript to be processed
      setTimeout(() => {
        handleSendMessage();
      }, 500);
    }
  };

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text:
          lang === "sv"
            ? "Språket har ändrats till svenska."
            : lang === "es"
            ? "El idioma ha cambiado al español."
            : lang === "zh"
            ? "语言已更改为中文。"
            : lang === "ar"
            ? "تم تغيير اللغة إلى العربية."
            : "Language has been changed to English.",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <Card className="w-full max-w-xl mx-auto overflow-hidden border-2 border-brand-purple/20 shadow-lg">
      <Tabs defaultValue="chat" className="w-full">
        <div className="flex justify-center border-b">
          <TabsList className="mx-auto my-2">
            <TabsTrigger value="chat" className="px-4">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="translate" className="px-4">
              <Languages className="h-4 w-4 mr-2" />
              Translate
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="m-0">
          <CardContent className="p-0">
            <div className="h-[400px] flex flex-col">
              <ChatMessageList
                messages={messages}
                currentLanguage={currentLanguage}
                onLanguageChange={changeLanguage}
                messagesEndRef={messagesEndRef}
              />
              <ChatInputBar
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                isRecording={isRecording}
                onToggleRecording={toggleRecording}
                onSend={handleSendMessage}
              />
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="translate" className="m-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Select Language</h3>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      className={`w-full justify-start border px-4 py-2 rounded-md transition-colors text-left ${currentLanguage === lang.code ? "bg-brand-teal/20 border-brand-teal" : ""}`}
                      onClick={() => changeLanguage(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Real-time Translation</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  All communication will be automatically translated to your selected language. You can change languages at any time without interrupting your customer service experience.
                </p>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setCurrentLanguage("en")}
                    className="flex items-center bg-brand-purple hover:bg-brand-purple/90 text-white font-medium px-4 py-2 rounded"
                  >
                    <Languages className="h-4 w-4 mr-2" />
                    Return to Chat
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ChatInterface;
