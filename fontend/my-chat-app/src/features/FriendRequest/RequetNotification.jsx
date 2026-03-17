import { useContext } from 'react'
import '../../styles/dashboard/friendrequest.scss'
import { RequestList } from './ReuqestList'
import { UserContext } from '../../services/UserService/UserContext'
export const FriendNotification = () => {
    const context = useContext(UserContext);
    const requests = context.request
    return (
        <>
            <div className="notification-background">
                <div className='d-flex'>
                    <span style={{ margin: "0 auto" }}>Request List</span>
                </div>
                <div className='request'>
                    {requests.map((r, i) => (
                        <RequestList name={r.firstName} email={r.email} key={i} />
                    ))}
                </div>
            </div>
        </>
    )
}