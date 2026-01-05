import { useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { getContextOutput, verifyCitation } from '../api';
import Message from './Message';

export type Citation = {
  text: string
  filename: string
  document_id: string
  page_start: number
  page_end: number
  section_path: string
  chunk_index: number
  citation: string;
}

export type MessageType = {
  text: string
  sender: "user" | "bot"
  citations: Citation[]
  response_at: string
}

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userText = input
    setInput("")
    setIsLoading(true)

    setMessages(prev => [...prev, { text: userText, sender: "user", citations: [], response_at: "" }])

    try {
      const llm_response = await getContextOutput({ query: userText })
      const citations = await verifyCitation({ query: userText })

      setMessages(prev => [
        ...prev,
        {
          text: llm_response.data.data,
          response_at: llm_response.data.response_at,
          sender: "bot",
          citations: citations.data,
        },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        { text: "Something went wrong.", sender: "bot", citations: [], response_at: "" },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-3/4 flex flex-col bg-gray-100 relative">
      <div className="flex-1 p-6 overflow-y-auto pb-30"> {/* Added pb-20 to ensure space for fixed input */}
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <Message key={index} text={msg.text} sender={msg.sender} citations={msg.citations} response_at={msg.response_at} />
          ))}
          {isLoading && <Message text="Thinking..." sender="bot" citations={[]} response_at={new Date().toDateString()} />}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t border-gray-200 flex items-center absolute bottom-0 left-0 right-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 px-6"
          placeholder="Ask a question about your document..."
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="ml-4 bg-indigo-600 text-white p-3 rounded-full shadow-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center"
        >
          <FiSend className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Chat;