import '../../styles/dashboard/chatmessage.scss'
import userHeadr from '../../assets/dashboard/UsserHeader.png'
import send from '../../assets/dashboard/paper-plane-solid-full.svg'
import { useContext, useEffect, useState, useRef } from 'react'
import { useChat } from '../../hooks/useChat'
import useInputState from '../../hooks/useInputState'
import { UserContext } from '../../services/UserService/UserContext'

export const ChatMessage = () => {

    const context = useContext(UserContext);

    const conversationId = context?.message?.conversationId;

    const { message, sendMessage } = useChat(conversationId);

    const { value, onChange, reset } = useInputState();

    const [allMessages, setAllMessages] = useState([]);

    const userInfo = context.userInfo;
    const userName = userInfo?.firstName;

    const messagesEndRef = useRef(null);

    /* Load message lần đầu khi đổi conversation */
    useEffect(() => {

        if (context?.message?.messageDocuments) {
            setAllMessages(context.message.messageDocuments);
        } else {
            setAllMessages([]);
        }

    }, [conversationId]);

    /* Khi websocket nhan message moi */
    useEffect(() => {

        if (!message || message.length === 0) return;

        const latest = message[message.length - 1];

        setAllMessages(prev => [...prev, latest]);

    }, [message]);

    /* Auto scroll xuong cuoi */
    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [allMessages]);

    const handleSend = () => {

        if (!value.trim() || !conversationId) {
            return;
        }

        sendMessage({
            conversationId: conversationId,
            sender: userName?.toString(),
            content: value
        });

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
                {allMessages.map((msg) => (
                    <div
                        key={msg.id ?? Math.random()}
                        className={
                            msg.sender === userName?.toString()
                                ? 'my-chat'
                                : 'chat-text'
                        }
                    >
                        <p>
                            <b>{msg.sender}:</b> {msg.content}
                        </p>
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            <div className='chat-input'>
                <div className='chat-input-group'>
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder="Type message..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSend();
                            }
                        }}
                    />
                    <button onClick={handleSend}>
                        <img src={send} alt="send message" />
                    </button>
                </div>
            </div>
        </div>
    )
}