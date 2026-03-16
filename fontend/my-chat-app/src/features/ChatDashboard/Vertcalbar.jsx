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
        styles: 'mt-4',
        customStyle: {
            objectFit: "cover",
            width: "70%",
            cursor: "pointer"
        }
    },
    {
        img: userDirectory,
        styles: 'mt-3',
        customStyle: {
            objectFit: "cover",
            width: "70%",
            cursor: "pointer"
        }
    },
    {
        img: notification,
        styles: 'mt-3',
        customStyle: {
            objectFit: "cover",
            width: "70%",
            cursor: "pointer"
        }
    }
]
export const Verticalbar = () => {
    const [active, setActive] = useState(0)
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
                        <img src={userImg} alt="user picture"
                            className='rounded-circle mt-3'
                            style={{
                                border: "3px solid black",
                                objectFit: "cover",
                                width: "70%",
                                cursor: "pointer"
                            }}
                        />
                    </div>
                    <div>
                        {icons.map((c, index) => (
                            <div key={index}>
                                <div className={c.styles} onClick={() => {
                                    setActive(index)
                                }}>
                                    <div className={active === index ? 'd-flex justify-content-center align-items-center custom-icons-click' : 'd-flex justify-content-center align-items-center custom-icons'}>
                                        <img src={c.img} alt="user picture"
                                            style={c.customStyle}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <img src={setting} alt="Setting"
                        className='mb-3'
                        style={{ width: "70%" }}
                    />
                </div>
                {active === ICON_INDEX.NOTIFICATION && <FriendNotification />}
            </nav>

        </div>
    )
}