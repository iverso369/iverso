import './ChatBubble.css'

interface ChatBubbleProps {
  message: string
  sender: 'bot' | 'user'
  typing?: boolean
}

export default function ChatBubble({ message, sender, typing = false }: ChatBubbleProps) {
  return (
    <div className={`chat-bubble chat-bubble--${sender}`}>
      {typing ? (
        <span className="chat-bubble__typing">
          <span className="chat-bubble__dot" />
          <span className="chat-bubble__dot" />
          <span className="chat-bubble__dot" />
        </span>
      ) : (
        <span className="chat-bubble__text">{message}</span>
      )}
    </div>
  )
}
