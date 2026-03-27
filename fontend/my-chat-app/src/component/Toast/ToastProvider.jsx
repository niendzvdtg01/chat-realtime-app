import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import "../../styles/toast/toast.scss";

const ToastContext = createContext(null);

let nextToastId = 1;

const normalizeMessage = (error) => {
  if (!error) return "Có lỗi xảy ra. Vui lòng thử lại.";
  const maybeAxiosMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    (typeof error?.response?.data === "string" ? error.response.data : null);
  return maybeAxiosMessage || error?.message || "Có lỗi xảy ra. Vui lòng thử lại.";
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timeoutsRef = useRef(new Map());

  const removeToast = useCallback((id) => {
    const timeout = timeoutsRef.current.get(id);
    if (timeout) clearTimeout(timeout);
    timeoutsRef.current.delete(id);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type = "info", title, message, duration = 3000 }) => {
      const id = nextToastId++;
      const toast = { id, type, title, message };
      setToasts((prev) => [...prev, toast]);

      if (duration !== null) {
        const timeout = setTimeout(() => removeToast(id), duration);
        timeoutsRef.current.set(id, timeout);
      }

      return id;
    },
    [removeToast]
  );

  const value = useMemo(() => ({ showToast, removeToast, normalizeMessage }), [showToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="app-toasts" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <div key={t.id} className={`app-toast app-toast--${t.type}`} role="status">
            <div className="app-toast__body">
              {t.title ? <div className="app-toast__title">{t.title}</div> : null}
              <div className="app-toast__message">{t.message}</div>
            </div>
            <button type="button" className="app-toast__close" onClick={() => removeToast(t.id)} aria-label="Close">
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

