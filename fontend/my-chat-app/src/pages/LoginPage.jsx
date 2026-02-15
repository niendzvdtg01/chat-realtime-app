import '../styles/login/login.scss'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import logo from '../assets/logo.png'
function LoginPage() {

    return (
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
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                            </MDBCol>

                            <MDBCol col='4' md='6'>


                                <div className="divider d-flex align-items-center my-4">
                                    <h2>Login</h2>
                                </div>

                                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" />
                                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" />

                                <div className="d-flex justify-content-between mb-4">
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                                    <a href="#">Forgot password?</a>
                                </div>

                                <div className='text-center text-md-start mt-4 pt-2'>
                                    <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
                                    <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
                                </div>

                            </MDBCol>

                        </MDBRow>

                    </div>
                    <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

                        <div className="text-white mb-3 mb-md-0">
                            Copyright © 2020. All rights reserved.
                        </div>

                    </div>

                </div>
            </MDBContainer>
        </div>
    );
}
export default LoginPage;