import '../styles/login/login.scss'
import logo from '../assets/logo.png'
import { RegisterForm } from '../features/LoginPage/RegisterForm';
import { useState } from 'react';
import { RegisterProvider } from '../services/RegisterService/handleRgisterService';
import { LoginForm } from '../features/LoginPage/LoginForm';

function LoginPage() {
    const [trigger, setTrigger] = useState(false);

    return (
        <RegisterProvider>
            <div className="login-page">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-9">
                            <div className="login-card row g-0">
                                <div className="col-md-6 login-hero">
                                    <div className='d-flex justify-content-center'>
                                        <div className="login-brand">
                                            <img src={logo} alt="logo" className="login-logo" />
                                            <div className="login-brand-text">Synchat</div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <div className="login-hero-title">Chat nhanh hơn. Kết nối dễ hơn.</div>
                                    </div>
                                    <div className='d-flex justify-content-center m-4'>
                                        <div className="login-hero-desc">
                                            Đăng nhập để tiếp tục trò chuyện realtime, tạo nhóm và chia sẻ khoảnh khắc cùng mọi người.
                                        </div>
                                    </div>
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                        className="login-hero-ill"
                                        alt="Chat illustration"
                                    />
                                </div>

                                <div className="col-md-6 login-panel">
                                    <LoginForm />
                                    <div className="text-center mt-4">
                                        <div className="small fw-bold mb-0">
                                            Chưa có tài khoản?{" "}
                                            <button type="button" className="btn btn-link p-0 login-link" onClick={() => setTrigger(true)}>
                                                Đăng ký
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="login-footer text-center mt-3">
                                <small>© 2026 Synchat. All rights reserved.</small>
                            </div>
                        </div>
                    </div>
                </div>

                <RegisterForm trigger={trigger} setTrigger={setTrigger} />
            </div>
        </RegisterProvider>
    );
}
export default LoginPage;
