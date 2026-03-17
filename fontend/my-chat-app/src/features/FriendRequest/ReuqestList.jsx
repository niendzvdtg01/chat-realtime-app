import { useState } from "react"

export const RequestList = (props) => {
    const [accept, setAccept] = useState(false)
    const [reject, setReject] = useState(false)
    return (
        <>
            <ol className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{props.name}</div>
                        {props.email}
                    </div>
                    <button style={{
                        backgroundColor: "green",
                        color: "white",
                        width: "2rem",
                        height: "2rem",
                        border: "none",
                        borderRadius: "50%",
                        margin: "5px"
                    }} onClick={() => {
                        setAccept(true)
                        props.setRequest()
                    }}
                    >
                        {accept ? "👍" : "✓"}
                    </button>
                    <button style={{
                        backgroundColor: "red",
                        color: "white",
                        width: "2rem",
                        height: "2rem",
                        border: "none",
                        borderRadius: "50%",
                        margin: "5px"
                    }} onClick={() => {
                        setReject(true)
                        props.setRequest()
                    }}
                    >
                        {reject ? "🖕" : "✕"}
                    </button>
                </li>
            </ol>
        </>
    )
}