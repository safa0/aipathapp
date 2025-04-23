
import { ForwardedRef, forwardRef } from "react";
import { ChatMessage as MessageType } from "./chatTypes";
import { ChatMessage } from "./ChatMessage";

interface ChatMessageListProps {
  messages: MessageType[];
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatMessageList = ({
  messages,
  currentLanguage,
  onLanguageChange,
  messagesEndRef
}: ChatMessageListProps) => (
  <div className="flex-1 overflow-y-auto p-4">
    {messages.map((message) => (
      <ChatMessage
        key={message.id}
        {...message}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
      />
    ))}
    <div ref={messagesEndRef} />
  </div>
);
