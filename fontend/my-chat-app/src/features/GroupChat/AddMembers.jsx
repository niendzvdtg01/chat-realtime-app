import { useContext } from "react"
import "../../styles/dashboard/addmember.scss"
import { FriendsList } from "./FriendsList"
import { UserContext } from "../../services/UserService/UserContext"
export const AddMember = (props) => {
    const context = useContext(UserContext);
    const friends = context.friends;
    console.log(friends)
    return props.trigger ? (
        <>
            <div className="addmember-background ">
                <div className="add-member">
                    <div className='cancel-button' onClick={() => { props.setTrigger(false) }}>
                        <span>X</span>
                    </div>
                    <div className='d-flex mt-3'>
                        <span style={{ margin: "10px auto" }}>Add friends to your group</span>
                    </div>
                    <div className='search-input'>
                        <input type="text" placeholder='Type name here...' onChange={(e) => { setQuery(e.target.value) }} />
                    </div>
                    <div className='p-3 border' style={{ overflowY: "auto", height: "50%" }}>
                        {friends.map((u, i) => (
                            <a style={{ textDecoration: "none", cursor: "pointer" }} key={i}>
                                <FriendsList name={u.firstName} email={u.email} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    ) : ""
}