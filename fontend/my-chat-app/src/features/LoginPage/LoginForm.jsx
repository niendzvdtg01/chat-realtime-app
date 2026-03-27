import '../../styles/login/login.scss'
import { MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useState, useContext } from "react";
import { RegisterContext } from "../../services/RegisterService/RegisterContext";
import { Button } from '../../component/Button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../component/Toast/ToastProvider';
export const LoginForm = () => {
    const context = useContext(RegisterContext);
    const navigate = useNavigate();
    const { showToast, normalizeMessage } = useToast();
    const [password, setPassowrd] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await context.handleLogin(email, password);
        if (!result.success) {
            showToast({
                type: "error",
                title: "Đăng nhập thất bại",
                message: normalizeMessage(result.error),
            });
            return;
        }
        showToast({
            type: "success",
            title: "Đăng nhập thành công",
            message: "Chào mừng bạn quay lại Synchat.",
            duration: 2000,
        });
        navigate("/chat");
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="mb-4">
                <div className='d-flex justify-content-center'>
                    <h2 className="login-title">Đăng nhập</h2>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className="login-subtitle">Tiếp tục trò chuyện với bạn bè và nhóm của bạn.</div>
                </div>
            </div>
            <div className='m-4'>
                <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    id="loginEmail"
                    type="email"
                    size="lg"
                    disabled={context.loading}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='m-4'>
                <MDBInput
                    wrapperClass="mb-4"
                    label="Mật khẩu"
                    id="loginPassword"
                    type="password"
                    size="lg"
                    disabled={context.loading}
                    onChange={(e) => setPassowrd(e.target.value)}
                />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4 m-4">
                <MDBCheckbox name="rememberMe" value="" id="rememberMe" label="Ghi nhớ đăng nhập" disabled={context.loading} />
                <button type="button" className="btn btn-link p-0 login-link " disabled={context.loading}>
                    Quên mật khẩu?
                </button>
            </div>

            <div className="d-grid m-4">
                <Button type="submit" loading={context.loading} className="w-100">
                    Đăng nhập
                </Button>
            </div>
        </form>
    );
}
