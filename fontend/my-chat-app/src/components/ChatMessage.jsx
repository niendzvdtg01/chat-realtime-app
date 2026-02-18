import '../styles/dashboard/chatmessage.scss'
import userHeadr from '../assets/dashboard/UsserHeader.png'
import send from '../assets/dashboard/paper-plane-solid-full.svg'
import { useState } from 'react'
import { useChat } from '../hooks/useChat'
import useInputState from '../hooks/useInputState'
export const ChatMessage = () => {
    const { message, sendMessage } = useChat();

    const { value, onChange, reset } = useInputState();

    const handleSend = () => {
        sendMessage({
            sender: "ReactUser",
            content: value
        })
        reset();
    }
    return (
        <div className='chat-message'>
            <div className="border-bottom d-flex">
                <div className='user-img'>
                    <img src={userHeadr} alt="user-Header" className='rounded-circle' />
                </div>
                <div>
                    <p>User</p>
                </div>
            </div>
            <div className='chat-background'>
                <div className='chat-text'>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic deserunt recusandae non nihil quos quam culpa sapiente, atque veniam veritatis neque dolore nostrum necessitatibus molestias, maiores, aperiam voluptatem minima commodi?</p>
                </div>
                <div className='my-chat'>
                    {message.map((msg, i) => (
                        <div>
                            <p key={i}>
                                <b>{msg.sender}:</b> {msg.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='chat-input'>
                <div className='chat-input-group'>
                    <input type="text"
                        value={value}
                        onChange={onChange} />
                    <button onClick={handleSend}><img src={send} alt="send meesage" /></button>
                </div>
            </div>
        </div>
    )
}   