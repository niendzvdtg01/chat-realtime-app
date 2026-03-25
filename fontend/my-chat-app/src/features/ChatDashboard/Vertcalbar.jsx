import '../../styles/dashboard/navrbar.scss'
import userImg from '../../assets/dashboard/user-regular-full.svg'
import userMessage from '../../assets/dashboard/message-regular-full.svg'
import userDirectory from '../../assets/dashboard/address-book-solid-full.svg'
import setting from '../../assets/dashboard/gear-solid-full.svg'
import notification from '../../assets/dashboard/bell-regular-full.svg'
import { useState } from 'react'
import { FriendNotification } from '../FriendRequest/RequetNotification'

const icons = [
    {
        img: userMessage,
        styles: 'mt-4'
    },
    {
        img: userDirectory,
        styles: 'mt-3'
    },
    {
        img: notification,
        styles: 'mt-3'
    }
]
export const Verticalbar = (props) => {
    const [active, setActive] = useState(0);
    const ICON_INDEX = {
        MESSAGE: 0,
        DIRECTORY: 1,
        NOTIFICATION: 2
    }
    return (
        <div>
            <nav className='navbar-menu d-flex flex-column justify-content-between'>
                <div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <img
                            src={userImg}
                            alt="User"
                            className='navbar-avatar rounded-circle mt-3'
                        />
                    </div>
                    <div>
                        {icons.map((c, index) => (
                            <div key={index}>
                                <div className={c.styles} onClick={() => {
                                    setActive(index)
                                    props.setKey(index)
                                }}>
                                    <div className={active === index ? 'd-flex justify-content-center align-items-center custom-icons-click' : 'd-flex justify-content-center align-items-center custom-icons'}>
                                        <img
                                            src={c.img}
                                            alt="Menu item"
                                            className="navbar-icon"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <img src={setting} alt="Setting"
                        className='navbar-icon mb-5'
                    />
                </div>
                {active === ICON_INDEX.NOTIFICATION && <FriendNotification />}
            </nav>

        </div>
    )
}
