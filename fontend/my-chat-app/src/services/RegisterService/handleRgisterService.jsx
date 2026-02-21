import { useCallback, useEffect, useState } from "react"
import { Register } from "./Register.api";
import { RegisterContext } from "./RegisterContext";
export const RegisterProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [register, setRegister] = useState(null);
    const handleRegister = useCallback(async (form) => {
        try {
            setLoading(true);
            const res = await Register(form);
            setRegister(res.data);
        } catch (e) {
            console.error("Loi ", e);
        } finally {
            setLoading(false);
        }
    }, [])

    return (
        <RegisterContext.Provider value={{ handleRegister, register, loading }}>
            {children}
        </RegisterContext.Provider>
    )
}