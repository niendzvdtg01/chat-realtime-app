import '../../styles/dashboard/contact.scss'

export const Contact = (props) => {
    return props.trigger ? (
        <>
            <div className='contact-background'>
                <div className='contact'>
                    <div className='cancel-button' onClick={() => { props.setTrigger(false) }}>
                        <span>X</span>
                    </div>
                    <div>
                        <input type="text" />
                    </div>
                </div>
            </div>
        </>
    ) : ""
}