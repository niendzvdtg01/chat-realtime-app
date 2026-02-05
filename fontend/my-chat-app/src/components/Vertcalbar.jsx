import '../styles/navbar/navrbar.scss'
import userImg from '../assets/dashboard/user-regular-full.svg'
export const Verticalbar = () => {
    return (
        <div className="position-fixed">
            <nav className='navbar-menu'>
                <div className='d-flex justify-content-center align-items-center'>
                    <img src={userImg} alt="user picture"
                        className='rounded-circle mt-2'
                        style={{
                            border: "3px solid black",
                            objectFit: "cover",
                            width: "80%"
                        }}
                    />
                </div>
            </nav>
        </div>
    )
}