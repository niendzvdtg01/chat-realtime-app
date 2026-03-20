import '../../styles/dashboard/chatinfo.scss'
import userHeadr from '../../assets/dashboard/UsserHeader.png'
export const ChatInfo = () => {
    return (
        <div className="chat-info">
            <div className="chat-info-header d-flex">
                <h2>Info</h2>
            </div>
            <div className='chat-about'>
                <div className='chat-info-hero'>
                    <img src={userHeadr} alt="User" className='rounded-circle' />
                    <div className="chat-info-name">User / Group</div>
                    <div className="chat-info-meta text-muted">Details and actions</div>
                </div>
                <div className="chat-info-section">
                    <div className="chat-info-section-title">Quick actions</div>
                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-outline-primary btn-sm">View profile</button>
                        <button type="button" className="btn btn-outline-secondary btn-sm">Mute</button>
                    </div>
                </div>
                <div className="chat-info-section">
                    <div className="chat-info-section-title">About</div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Shared media</li>
                        <li className="list-group-item">Pinned messages</li>
                        <li className="list-group-item">Members</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
