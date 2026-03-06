import '../../styles/dashboard/chatmessage.scss'
import userHeadr from '../../assets/dashboard/UsserHeader.png'
import send from '../../assets/dashboard/paper-plane-solid-full.svg'
import { useContext, useEffect, useState } from 'react'
import { useChat } from '../../hooks/useChat'
import useInputState from '../../hooks/useInputState'
import { UserContext } from '../../services/UserService/UserContext'
export const ChatMessage = () => {
    const { message, sendMessage } = useChat();
    const { value, onChange, reset } = useInputState();
    const [allMessages, setAllMessages] = useState([]);
    const context = useContext(UserContext);
    const userInfo = context.userInfo;
    const userName = userInfo?.firstName
    useEffect(() => {
        if (context?.message?.messageDocuments) {
            setAllMessages(context.message?.messageDocuments);
        }
    }, [context?.message])
    useEffect(() => {
        if (message?.length > 0) {
            const lastest = message[message.length - 1];
            setAllMessages(prev => [...prev, lastest]);
        }
    }, [message])
    const handleSend = () => {
        if (!value) {
            console.log("value is empty!");
            return;
        }
        sendMessage({
            conversationId: context?.message?.conversationId,
            sender: userName?.toString(),
            content: value
        })
        reset();
    }
    // console.log(allMessages);
    console.log(context?.message);
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
                    <div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic deserunt recusandae non nihil quos quam culpa sapiente, atque veniam veritatis neque dolore nostrum necessitatibus molestias, maiores, aperiam voluptatem minima commodi?</p>
                    </div>
                </div>
                <div className='my-chat'>
                    {allMessages.map((msg, i) => (
                        <div key={i}>
                            <p >
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