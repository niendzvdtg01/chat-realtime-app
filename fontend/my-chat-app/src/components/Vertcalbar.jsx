import '../styles/navbar/navrbar.scss'
import userImg from '../assets/dashboard/user-regular-full.svg'
import userMessage from '../assets/dashboard/message-regular-full.svg'
import userDirectory from '../assets/dashboard/address-book-solid-full.svg'
import setting from '../assets/dashboard/gear-solid-full.svg'

const icons = [
    {
        img: userImg,
        styles: 'rounded-circle mt-3',
        customStyle: {
            border: "3px solid black",
            objectFit: "cover",
            width: "70%",
        }
    },
    {
        img: userMessage,
        styles: 'mt-4',
        customStyle: {
            objectFit: "cover",
            width: "70%",
        }
    },
    {
        img: userDirectory,
        styles: 'mt-3',
        customStyle: {
            objectFit: "cover",
            width: "70%",
        }
    }
]
export const Verticalbar = () => {
    return (
        <div>
            <nav className='navbar-menu d-flex flex-column justify-content-between'>
                <div>
                    {icons.map((c, index) => (
                        <div key={index} className='d-flex justify-content-center align-items-center'>
                            <img src={c.img} alt="user picture"
                                className={c.styles}
                                style={c.customStyle}
                            />
                        </div>
                    ))}
                </div>
                <div className='d-flex justify-content-center'>
                    <img src={setting} alt="Setting"
                        className='mb-3'
                        style={{ width: "70%" }}
                    />
                </div>
            </nav>
        </div>
    )
}