export const Button = (props) => {
    return (
        <div className="mt-4">
            <button type='submit' style={{
                width: "10rem",
                height: "3rem",
                border: "none",
                backgroundColor: "#0d6efd",
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "20px",
                color: "white"
            }}
                onClick={() => { props.onClick() }}
            >{props.children}</button>
        </div>
    )
}