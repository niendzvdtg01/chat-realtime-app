import { useContext, useEffect, useMemo, useState } from "react";
import "../../styles/login/register.scss";
import { UserContext } from "../../services/UserService/UserContext";
import { Button } from "../../component/Button";
import { useToast } from "../../component/Toast/ToastProvider";

export const UpdateUserForm = ({ trigger, setTrigger }) => {
  const context = useContext(UserContext);
  const { showToast, normalizeMessage } = useToast();

  const userInfo = context?.userInfo;
  const loading = context?.loadingByAction?.updateUser > 0;

  const [form, setForm] = useState({
    email: "",
    password: "",
    bio: "",
    firstName: "",
    lastName: "",
  });
  const [file, setFile] = useState(null);

  const avatarPreview = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    return userInfo?.avatarUrl || "";
  }, [file, userInfo?.avatarUrl]);

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(avatarPreview);
    };
  }, [file, avatarPreview]);

  useEffect(() => {
    if (!trigger) return;
    setForm({
      email: userInfo?.email ?? "",
      password: "",
      bio: userInfo?.bio ?? "",
      firstName: userInfo?.firstName ?? "",
      lastName: userInfo?.lastName ?? "",
    });
    setFile(null);
  }, [trigger, userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("email", form.email ?? "");
    formData.append("firstName", form.firstName ?? "");
    formData.append("lastName", form.lastName ?? "");
    formData.append("bio", form.bio ?? "");
    if (form.password && form.password.trim()) {
      formData.append("password", form.password);
    }

    const result = await context?.updateUserInformation?.(formData);
    if (!result?.success) {
      showToast({
        type: "error",
        title: "Cập nhật thất bại",
        message: normalizeMessage(result?.error),
      });
      return;
    }
    showToast({
      type: "success",
      title: "Cập nhật thành công",
      message: typeof result?.data === "string" ? result.data : "Đã cập nhật thông tin tài khoản.",
      duration: 2500,
    });
    setTrigger(false);
  };

  if (!trigger) return "";

  return (
    <div className="custom-layout" onClick={() => setTrigger(false)}>
      <section className="vh-100 popup" onClick={(e) => e.stopPropagation()}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-10">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-7 order-2 order-lg-1">
                      <p className="text-center h2 fw-bold mb-4 mx-1 mx-md-4 mt-2">
                        Cập nhật thông tin
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              value={form.firstName}
                              onChange={handleChange}
                            />
                            <label className="form-label">First Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              value={form.lastName}
                              onChange={handleChange}
                            />
                            <label className="form-label">Last Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                            />
                            <label className="form-label">Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-pen fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <textarea
                              className="form-control"
                              name="bio"
                              rows={3}
                              value={form.bio}
                              onChange={handleChange}
                            />
                            <label className="form-label">Bio</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              value={form.password}
                              onChange={handleChange}
                              placeholder="Để trống nếu không đổi mật khẩu"
                            />
                            <label className="form-label">Password (tuỳ chọn)</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-image fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="file"
                              className="form-control"
                              accept="image/*"
                              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            />
                            <label className="form-label">Avatar (tuỳ chọn)</label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <Button type="submit" loading={loading} className="w-100">
                            Lưu thay đổi
                          </Button>
                        </div>
                      </form>
                    </div>

                    <div className="col-md-10 col-lg-5 d-flex align-items-center order-1 order-lg-2 flex-column">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          className="img-fluid rounded-circle"
                          alt="Avatar preview"
                          style={{ width: "220px", height: "220px", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                          style={{ width: "220px", height: "220px" }}
                        >
                          <span>Chưa có avatar</span>
                        </div>
                      )}
                      <p className="text-muted mt-3 mb-0 text-center">
                        Click ra ngoài để đóng.
                      </p>
                    </div>

                    <div className="d-flex">
                      <button
                        style={{
                          width: "3rem",
                          minHeight: "3rem",
                          marginLeft: "auto",
                          borderRadius: "50%",
                          border: "none",
                          backgroundColor: "#ccc",
                        }}
                        type="button"
                        onClick={() => setTrigger(false)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

