import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useState, useContext } from "react";
import { RegisterContext } from "../../services/RegisterService/RegisterContext";
export const LoginForm = () => {
    const context = useContext(RegisterContext);

    const [password, setPassowrd] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        context.handleLogin(email, password);
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

                <div className='text-center text-md-start mt-4 pt-2'>
                    <MDBBtn className="mb-0 px-5" size='lg' type='submit'>Login</MDBBtn>
                </div>
            </form>
        </MDBCol>
    );
}