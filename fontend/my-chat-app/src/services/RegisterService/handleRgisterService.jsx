import { useCallback, useEffect, useState } from "react"
import { Register } from "./Register.api";
import { RegisterContext } from "./RegisterContext";
import { login } from "./Login.api";
export const RegisterProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [register, setRegister] = useState(null);
    const [loginData, setLoginData] = useState(null);
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

    const handleLogin = useCallback(async (email, password) => {
        const data = {
            "email": email,
            "userpassword": password
        }
        try {
            setLoading(true);
            const res = await login(data);
            setLoginData(res.data);
        } catch (e) {
            console.error("Loi: ", e);
        } finally {
            setLoading(false);
        }
    }, [])
    return (
        <RegisterContext.Provider value={{ handleRegister, handleLogin, register, loading, loginData }}>
            {children}
        </RegisterContext.Provider>
    )
}