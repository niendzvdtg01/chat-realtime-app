import userHeadr from '../../assets/dashboard/UsserHeader.png'
import '../../styles/dashboard/chatinfo.scss'
import "../../styles/login/register.scss";
import "../../styles/dashboard/viewprofile.scss"
export const ViewProfile = (props) => {
    const details = props.details
    console.log(details);
    if (!props.trigger) return "";
    return (
        <>
            <div className="custom-layout">
                <div className="d-flex h-100 justify-content-center align-items-center">
                    <div className="view-profile">
                        <div className="cancel-button" onClick={() => { props.setViewProfile(false) }}>
                            <span>X</span>
                        </div>
                        <div className="custom-avatar">
                            <img src={details.avatarUrl || userHeadr} alt="" className="rounded-circle" />
                        </div>
                        <div className='d-flex justify-content-center mt-3'>
                            <h2>{details.firstName}</h2>
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
            </div>
        </>
    )
}