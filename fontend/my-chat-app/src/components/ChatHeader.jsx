import '../styles/dashboard/chaheader.scss'
import userHeadr from '../assets/dashboard/UsserHeader.png'
export const ChatHeader = () => {
    return (
        <>
            <div className="chat-header border-bottom">
                <div className='user-img'>
                    <img src={userHeadr} alt="user-Header" className='rounded-circle' />
                </div>
            </div>
        </>
    )
}