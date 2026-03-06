import '../../styles/login/login.scss'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useState, useContext } from "react";
import { RegisterContext } from "../../services/RegisterService/RegisterContext";
import { Button } from '../../component/Button';
import { useNavigate } from 'react-router-dom';
export const LoginForm = () => {
    const context = useContext(RegisterContext);
    const navigate = useNavigate();
    const [password, setPassowrd] = useState("");
    const [email, setEmail] = useState("");
    console.log(context.loginData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await context.handleLogin(email, password);
        if (!result.success) {
            alert("Sai mat khau");
            return;
        }
        alert("Dang nhap thanh cong!!!");
        navigate("/chat")
    }

    return (
        <MDBCol col='4' md='6'>
            <form action="submit" onSubmit={handleSubmit}>
                <div className="divider d-flex align-items-center my-4">
                    <h2>Login</h2>
                </div>
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => { setEmail(e.target.value) }} />
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => { setPassowrd(e.target.value) }} />
                <div className="d-flex justify-content-between mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="#">Forgot password?</a>
                </div>
                <Button />
            </form>
        </MDBCol>
    );
}