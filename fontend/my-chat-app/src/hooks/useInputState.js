import { useState } from "react"

export default () => {
    const [value, setValue] = useState("");
    return {
        value,
        onchange: (e) => {
            setValue(e.target.value);
        },
        reset: () => setValue('')
    }
}