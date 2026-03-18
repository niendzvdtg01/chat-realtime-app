import { useContext } from 'react'
import '../../styles/dashboard/friendrequest.scss'
import { RequestList } from './ReuqestList'
import { UserContext } from '../../services/UserService/UserContext'
export const FriendNotification = () => {
    const context = useContext(UserContext);
    const requests = context.request
    console.log(context.request)
    return (
        <>
            <div className="notification-background">
                <div className='d-flex'>
                    <span style={{ margin: "0 auto" }}>Request List</span>
                </div>
                <div className='request'>
                    {requests.map((r, i) => (
                        <RequestList name={r.firstName}
                            email={r.email}
                            key={i}
                            setAcceptStatus={() => {
                                context.setStatus({
                                    senderId: r.userId,
                                    status: "ACCEPTED"
                                })
                            }}
                            setRejectStatus={() => {
                                context.setStatus({
                                    senderId: r.userId,
                                    status: "REJECTED"
                                })
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
