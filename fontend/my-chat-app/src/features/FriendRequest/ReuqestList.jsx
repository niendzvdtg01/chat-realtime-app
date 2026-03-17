export const RequestList = (props) => {
    return (
        <>
            <ol className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{props.name}</div>
                        {props.email}
                    </div>
                    {/* <button style={{
                        backgroundColor: click ? "red" : "#0d6efd",
                        color: "white",
                        width: "4rem",
                        height: "2rem",
                        border: "none",
                        borderRadius: "20px"
                    }} onClick={() => {
                        setClick(true)
                        props.setRequest()
                    }}
                    >
                        {click ? "added" : "add"}
                    </button> */}
                </li>
            </ol>
        </>
    )
}