import '../styles/dashboard/chatmessage.scss'
import userHeadr from '../assets/dashboard/UsserHeader.png'
import send from '../assets/dashboard/paper-plane-solid-full.svg'
export const ChatMessage = () => {
    return (
        <div className='chat-message'>
            <div className="border-bottom">
                <div className='user-img'>
                    <img src={userHeadr} alt="user-Header" className='rounded-circle' />
                </div>
            </div>
            <div className='chat-background'>
                <div className='chat-text'>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                    <p>LOL</p>
                </div>
            </div>
            <div className='chat-input'>
                <div className='chat-input-group'>
                    <input type="text" />
                    <button><img src={send} alt="send meesage" /></button>
                </div>
            </div>
        </div>
    )
}