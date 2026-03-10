import '../../styles/dashboard/contact.scss'
import { UserContext } from '../../services/UserService/UserContext';
import { useEffect, useState, useContext } from 'react';
import { UserCard } from '../ChatDashboard/UsersCard';
import { UserList } from './UserList';
export const Contact = (props) => {
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
    console.log(user)
    return props.trigger ? (
        <>
            <div className='contact-background'>
                <div className='contact'>
                    <div className='cancel-button' onClick={() => { props.setTrigger(false) }}>
                        <span>X</span>
                    </div>
                    <div className='d-flex mt-3'>
                        <span style={{ margin: "10px auto" }}>Search your friends</span>
                    </div>
                    <div className='search-input'>
                        <input type="text" placeholder='Type name here...' onChange={(e) => { setQuery(e.target.value) }} />
                    </div>
                    <div className='p-3 border' style={{ overflowY: "auto", height: "50%" }}>
                        {user.map((u, i) => (
                            <a style={{ textDecoration: "none", cursor: "pointer" }} key={i} >
                                <UserList name={u.firstName} email={u.email} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    ) : ""
}