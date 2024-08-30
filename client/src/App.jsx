import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import { IoSend } from 'react-icons/io5'

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
    <main className='h-screen bg-slate-800 flex justify-center items-end'>
      <div className='flex items-center text-white flex-col mb-11'>
        <ul className=''>
          {
            messages.map((message, index) => (
              <li key={index}>{message.body}:{message.from}</li>
            ))
          }
        </ul>

        <form
          onSubmit={handleSubmit}
          className=''
        >
          <input
            type='text' placeholder='Write message....'
            onChange={(e) => setMessage(e.target.value)}
            className='text-black font-medium rounded-lg w-[23rem] h-[1.6rem] mx-2 px-3 '
          />

          <button>
            <IoSend />
          </button>
        </form>

      </div>
    </main>
  )
}

export default App
