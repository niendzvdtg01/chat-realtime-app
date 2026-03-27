export const Button = ({
    children,
    className = "",
    disabled = false,
    loading = false,
    onClick,
    type = "button",
    variant = "primary",
}) => {
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            className={`btn btn-${variant} d-inline-flex align-items-center justify-content-center gap-2 ${className}`}
            style={{ minHeight: "44px", borderRadius: "12px", fontWeight: 700 }}
            disabled={isDisabled}
            onClick={onClick}
        >
            {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            ) : null}
            <span>{children}</span>
        </button>
    );
};
