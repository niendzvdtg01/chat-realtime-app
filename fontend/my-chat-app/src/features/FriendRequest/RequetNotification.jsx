import '../../styles/dashboard/friendrequest.scss'
import { RequestList } from './ReuqestList'
export const FriendNotification = (props) => {
    const User = {
        name: "Nien",
        email: "lol@gmail.com"
    }
    return (
        <>
            <div className="notification-background">
                <div className='d-flex'>
                    <span style={{ margin: "0 auto" }}>Request List</span>
                </div>
                <div className='request'>
                    <RequestList name={User.name} email={User.email} />
                </div>
            </div>
        </>
    )
}