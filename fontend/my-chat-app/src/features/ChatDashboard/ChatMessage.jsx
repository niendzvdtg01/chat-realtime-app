import '../../styles/dashboard/chatmessage.scss'
import userHeadr from '../../assets/dashboard/UsserHeader.png'
import send from '../../assets/dashboard/paper-plane-solid-full.svg'
import { useContext, useEffect, useState, useRef } from 'react'
import { useChat } from '../../hooks/useChat'
import useInputState from '../../hooks/useInputState'
import { UserContext } from '../../services/UserService/UserContext'

export const ChatMessage = (props) => {

    const context = useContext(UserContext);

    const conversationId = context?.message?.conversationId;

    const { message, suggestions, sendMessage } = useChat(conversationId);

    const { value, onChange, reset } = useInputState();

    const [allMessages, setAllMessages] = useState([]);

    const [suggestApearance, setSuggestApearance] = useState(true)
    const userInfo = context.userInfo;
    const userName = userInfo?.firstName;

    const messagesEndRef = useRef(null);

    console.log(conversationId);

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

    console.log(context.friends)

    const handleSuggestionClick = (suggestion) => {
        onChange({
            target: {
                value: suggestion
            }
        });
    };

    return (
        <div className='chat-message'>
            <div className="chat-header d-flex">
                <div className='user-img'>
                    <img src={props.name?.avatarUrl || userHeadr} alt="user-Header" />
                </div>
                <div>
                    <div className="chat-title">{props.name?.firstName || props.name?.name || "Chat"}</div>
                    <div className="chat-subtitle text-muted">Start messaging</div>
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
                {suggestApearance && conversationId && suggestions.length > 0 && (
                    <div className='suggestion-panel'>
                        <div className='suggestion-title'>Goi y AI</div>
                        <div className='suggestion-list'>
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={`${conversationId}-${index}-${suggestion}`}
                                    type="button"
                                    className='suggestion-chip'
                                    onClick={() => {
                                        handleSuggestionClick(suggestion)
                                        setSuggestApearance(false)
                                    }}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
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
                    <button onClick={() => {
                        handleSend()
                        setSuggestApearance(true)
                    }} aria-label="Send message">
                        <img src={send} alt="send message" />
                    </button>
                </div>
            </div>
        </div>
    )
}
