import io from 'socket.io-client'
import { useState, useEffect } from 'react'

const socket = io('/')

function App () {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      body: message,
      from: 'Me'
    }
    setMessages([...messages, newMessage])
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('message', reciveMessages)

    return () => {
      socket.off('message', reciveMessages)
    }
  }, [])

  const reciveMessages = message => {
    setMessages(state => [...state, message])
  }

  return (
    <div className='h-screen bg-slate-800 text-white flex items-end justify-center p-24'>
      <h1>My Super Chat Bitches !!!!!</h1>

      <ul className=''>
        {
          messages.map((message, index) => (
            <li key={index}>{message.from}:{message.body}</li>
          ))
        }
      </ul>

      <form onSubmit={handleSubmit}>

        <input
          type='text' placeholder='Write message....'
          onChange={(e) => setMessage(e.target.value)}
        />

        <button>
          Send
        </button>

      </form>

    </div>
  )
}

export default App
