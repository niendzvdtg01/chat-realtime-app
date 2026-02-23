import '../styles/login/login.scss'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import logo from '../assets/logo.png'
import { RegisterForm } from '../features/LoginPage/RegisterForm';
import { useContext, useState } from 'react';
import { RegisterProvider } from '../services/RegisterService/handleRgisterService';
import { LoginForm } from '../features/LoginPage/LoginForm';

function LoginPage() {
    const [trigger, setTrigger] = useState(false);

    return (
        <RegisterProvider>
            <div >
                <MDBContainer fluid className=" h-custom p-0">

                    <div className='d-flex custom-style'>
                        <div className=" bg-primary">
                            <div className='d-flex p-4 text-white'>
                                <div style={{ margin: "0 auto", display: "flex" }}>
                                    <img src={logo} alt="logo" style={{ width: "5rem" }} />
                                    <h2 style={{ fontWeight: "bolder" }}>Synchat</h2>
                                </div>
                            </div>
                        </div>
                        <div className='container mt-5 login-form'>

                            <MDBRow>

                                <MDBCol col='10' md='6'>
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                                </MDBCol>

                                <LoginForm />
                                <div className=' text-center mt-4 pt-2'>
                                    <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a onClick={() => { setTrigger(true) }} className="link-danger"
                                        style={{
                                            textDecoration: "none",
                                            cursor: "pointer"
                                        }}
                                    >Register</a></p>
                                </div>

                            </MDBRow>

                        </div>
                        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

                            <div className="text-white mb-3 mb-md-0">
                                Copyright © 2020. All rights reserved.
                            </div>

                        </div>

                    </div>
                </MDBContainer>
                <RegisterForm trigger={trigger} setTrigger={setTrigger} />
            </div>
        </RegisterProvider>
    );
}
export default LoginPage;