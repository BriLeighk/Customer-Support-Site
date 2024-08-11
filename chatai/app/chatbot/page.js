'use client'
import { Stack, TextField, Box, Button } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import Header from '../components/Header';
import './chatbot.css';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m the Headstarter support agent, how can I assist you today?' }
  ])
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    setMessage('')
    setIsLoading(true)

    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '...' }
    ])

    try {
      const response = await fetch('../api/chat', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: message }] }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json();
      const content = result.content;

      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1]
        let otherMessages = messages.slice(0, messages.length - 1)
        return [
          ...otherMessages,
          { ...lastMessage, content: content },
        ]
      })
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching chat:', error);
      setIsLoading(false);
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "Error: Please try again." },
      ])
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center"
    >
      <Header/>
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack 
          direction="column"
          spacing={2}
          className="chat-container"
        >
          {messages.map((msg, index) => (
            <Box 
              key={index}
              display='flex'
              justifyContent={msg.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box 
                bgcolor={msg.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                color="white"
                borderRadius={16}
                p={3}
              >
                {msg.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}