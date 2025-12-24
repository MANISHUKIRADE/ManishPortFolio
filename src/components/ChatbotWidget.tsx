import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const quickPrompts = [
  'Tell me about KYARA - your AI HR consultant',
  'What cloud platforms have you worked with?',
  'Tell me about your AI/ML experience',
  'What is your experience with enterprise platforms?',
]

// Helper function to remove reasoning/thinking tags from content
const removeReasoningTags = (content: string): string => {
  if (!content) return ''
  
  let cleaned = content
    // Remove complete reasoning tags
    .replace(/<think>[\s\S]*?<\/redacted_reasoning>/gi, '')
    .replace(/<thinking>[\s\S]*?<\/thinking>/gi, '')
    .replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, '')
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    // Remove partial tags (in case streaming breaks them)
    .replace(/<think>[\s\S]*$/gi, '')
    .replace(/<thinking>[\s\S]*$/gi, '')
    .replace(/<reasoning>[\s\S]*$/gi, '')
    .replace(/<think>[\s\S]*$/gi, '')
    // Remove data: JSON patterns that might contain reasoning
    .replace(/data:\s*\{[^}]*"content":"[^"]*redacted_reasoning[^"]*"\}[^\n]*/gi, '')
    // Remove [DONE] markers
    .replace(/\[DONE\]/gi, '')
    // Remove empty JSON objects
    .replace(/data:\s*\{\s*"content"\s*:\s*""\s*\}/gi, '')
    .replace(/data:\s*\{\s*\}/gi, '')
  
  return cleaned.trim()
}

const ChatbotWidget = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your portfolio assistant. Ask me anything about Manish Ukirade's projects, AI/ML expertise, cloud architecture, or professional experience!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev: Message[]) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    }

    setMessages((prev: Message[]) => [...prev, assistantMessage])

    try {
      const apiUrl = (import.meta.env.VITE_API_URL as string) || 'https://ragbackend-pj8k.onrender.com'
      console.log('Sending request to:', `${apiUrl}/api/chat`)
      
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content.trim(),
          history: messages.map((m: Message) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      console.log('Response status:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        throw new Error(`HTTP error! status: ${response.status}: ${errorText}`)
      }

      // Handle streaming response (Server-Sent Events)
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim()
            if (data === '[DONE]' || data.includes('[DONE]')) {
              setIsLoading(false)
              // Clean up any remaining reasoning tags in the final message
              setMessages((prev: Message[]) => {
                const updated = [...prev]
                const lastMessage = updated[updated.length - 1]
                if (lastMessage && lastMessage.role === 'assistant') {
                  updated[updated.length - 1] = {
                    ...lastMessage,
                    content: removeReasoningTags(lastMessage.content),
                  }
                }
                return updated
              })
              return
            }

            // Skip empty data lines
            if (!data || data === '{}') continue

            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                // Remove reasoning tags before adding to message
                const cleanContent = removeReasoningTags(parsed.content)
                // Skip empty content after cleaning
                if (cleanContent && cleanContent.length > 0) {
                  setMessages((prev: Message[]) => {
                    const updated = [...prev]
                    const lastMessage = updated[updated.length - 1]
                    if (lastMessage && lastMessage.role === 'assistant') {
                      // Get current content and clean it, then append new content
                      const currentContent = removeReasoningTags(lastMessage.content)
                      const newContent = currentContent + cleanContent
                      updated[updated.length - 1] = {
                        ...lastMessage,
                        content: removeReasoningTags(newContent),
                      }
                    }
                    return updated
                  })
                }
              }
            } catch (e) {
              // Ignore parse errors for incomplete JSON or malformed data
              // This is normal during streaming
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      // Check if it's a connection error
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        setMessages((prev: Message[]) => {
          const updated = [...prev]
          const lastMessage = updated[updated.length - 1]
          if (lastMessage && lastMessage.role === 'assistant' && !lastMessage.content) {
            updated[updated.length - 1] = {
              ...lastMessage,
              content: 'Unable to connect to the server. Please make sure the backend is running on https://ragbackend-pj8k.onrender.com',
            }
          } else {
            updated.push({
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: 'Unable to connect to the server. Please make sure the backend is running on https://ragbackend-pj8k.onrender.com',
              timestamp: new Date(),
            })
          }
          return updated
        })
      } else {
        setMessages((prev: Message[]) => {
          const updated = [...prev]
          const lastMessage = updated[updated.length - 1]
          if (lastMessage && lastMessage.role === 'assistant' && !lastMessage.content) {
            updated[updated.length - 1] = {
              ...lastMessage,
              content: `Sorry, I encountered an error: ${errorMessage}. Please check the console for more details.`,
            }
          } else {
            updated.push({
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: `Sorry, I encountered an error: ${errorMessage}. Please check the console for more details.`,
              timestamp: new Date(),
            })
          }
          return updated
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt)
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggle}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-slate-800 rounded-xl shadow-2xl border border-slate-700 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-white" />
                <h3 className="text-white font-semibold">Portfolio Assistant</h3>
              </div>
              <button
                onClick={onToggle}
                className="text-white hover:text-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'bg-gradient-to-br from-slate-700 to-slate-800 text-slate-100 shadow-lg border border-slate-600'
                    }`}
                  >
                    <div className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                      {message.role === 'assistant' ? (
                        // Format assistant messages: highlight questions while preserving ALL spaces
                        // Also remove any reasoning tags that might have slipped through
                        (() => {
                          const content = removeReasoningTags(message.content)
                          // Find question sentences (text ending with ?)
                          const questionRegex = /([^.!?]*\?)/g
                          const parts: Array<{ text: string; isQuestion: boolean }> = []
                          let lastIndex = 0
                          let match
                          
                          while ((match = questionRegex.exec(content)) !== null) {
                            // Add text before question
                            if (match.index > lastIndex) {
                              parts.push({ text: content.substring(lastIndex, match.index), isQuestion: false })
                            }
                            // Add question
                            parts.push({ text: match[0], isQuestion: true })
                            lastIndex = match.index + match[0].length
                          }
                          
                          // Add remaining text
                          if (lastIndex < content.length) {
                            parts.push({ text: content.substring(lastIndex), isQuestion: false })
                          }
                          
                          // If no questions found, return content as-is
                          if (parts.length === 0) {
                            return <span>{content}</span>
                          }
                          
                          return (
                            <>
                              {parts.map((part, index) => (
                                <span key={index} className={part.isQuestion ? 'text-blue-400 font-medium' : ''}>
                                  {part.text}
                                </span>
                              ))}
                            </>
                          )
                        })()
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              {/* Loading indicator removed - responses stream directly */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="text-xs text-slate-400 mb-2">Quick prompts:</div>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-full text-slate-300 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatbotWidget

