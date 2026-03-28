import '../../styles/dashboard/chatinfo.scss'
import userHeadr from '../../assets/dashboard/UsserHeader.png'
export const ChatInfo = (props) => {
    const details = props.details
    return (
        <div className="chat-info">
            <div className="chat-info-header d-flex justify-content-center">
                <h2>Infomations</h2>
            </div>
            <div className='chat-about'>
                <div className='chat-info-hero'>
                    <img src={userHeadr} alt="User" className='rounded-circle' />
                    <div className="chat-info-name">{details.firstName || details.name || "User/Group"}</div>
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
                        <li className="list-group-item text-center">{details.bio || "bio"}</li>
                        <li className="list-group-item text-center">{details.email || "email"}</li>
                        <li className="list-group-item text-center">{details.members?.length || "members"}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
