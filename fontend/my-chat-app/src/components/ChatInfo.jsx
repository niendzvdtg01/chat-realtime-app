import '../styles/dashboard/chatinfo.scss'
import userHeadr from '../assets/dashboard/UsserHeader.png'
export const ChatInfo = () => {
    return (
        <div>
            <div className="chat-info">
                <div className="chat-info-header border d-flex">
                    <h2>User Info</h2>
                </div>
                <div className='border chat-about'>
                    <div className='user-img'>
                        <img src={userHeadr} alt="user-Header" className='rounded-circle mt-5' style={{ margin: "0 auto" }} />
                    </div>
                    <div className='d-flex mt-3' >
                        <h3 style={{ margin: "0 auto" }}>User or Group info</h3>
                    </div>
                    <div>
                        <ul class="list-group mt-5">
                            <li class="list-group-item">An item</li>
                            <li class="list-group-item">A second item</li>
                            <li class="list-group-item">A third item</li>
                            <li class="list-group-item">A fourth item</li>
                            <li class="list-group-item">And a fifth one</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}