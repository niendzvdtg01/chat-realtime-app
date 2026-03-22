import "../../styles/dashboard/addmember.scss"
import { FriendsList } from "./FriendsList"
export const AddMember = (props) => {
    const user = {
        name: "Nien",
        email: "Nguyen"
    }
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

                        <a style={{ textDecoration: "none", cursor: "pointer" }} >
                            <FriendsList name={user.name} email={user.email} />
                        </a>

                    </div>
                </div>
            </div>
        </>
    ) : ""
}