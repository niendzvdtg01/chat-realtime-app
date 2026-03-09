import '../../styles/dashboard/userlist.scss'
import addUser from '../../assets/dashboard/user-plus-solid-full.svg'
import groupUser from '../../assets/dashboard/users-solid-full.svg'
import { UserCard } from './UsersCard'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../services/UserService/UserContext'
import { Contact } from '../Contact/Contact'
export const UserList = (props) => {
    const context = useContext(UserContext);
    const [query, setQuery] = useState("")
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query) {
                context.handleSearchUser(query);
            }
        }, 500)
        return () => clearTimeout(timer)
    }, [query])
    const user = context.user;
    return (
        <div>
            <div className='user-list-layout'>
                <div className='contact-search d-flex border'>
                    <div>
                        <input type="text" placeholder="Search..." onChange={(e) => { setQuery(e.target.value) }} />
                    </div>
                    <div className='add-user d-flex'>
                        <button className="icon-btn" onClick={() => { props.setTrigger(true) }}>
                            <img src={addUser} alt="Add user" />
                        </button>
                        <button className="icon-btn">
                            <img src={groupUser} alt="Create group" />
                        </button>
                    </div>
                </div>
                <div className='user-list border'>
                    <ul className="list-group list-group-light" >
                        {user.map((u, index) => (
                            <a style={{ textDecoration: "none", cursor: "pointer" }} onClick={() => {
                                context.handleCreatePrivateConversation(u.userId);
                            }} key={index}>
                                <UserCard name={u.firstName} email={u.email} />
                            </a>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}