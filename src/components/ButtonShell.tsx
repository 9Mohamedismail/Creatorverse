import "../scss/Button.scss";

type ButtonShellProps = {
  className?: string;
  onClick?: () => void;
  buttonType: "Add" | "Edit" | "Delete" | "Info" | "Cancel";
  cardType?: "small" | "full";
  type?: "button" | "submit";
  disabled?: boolean;
  label?: string;
};

function ButtonShell({
  className = "",
  onClick,
  buttonType,
  cardType,
  type = "button",
  disabled = false,
  label,
}: ButtonShellProps) {
  const cardClass =
    cardType === "small"
      ? "small-card-button"
      : cardType === "full"
        ? "full-card-button"
        : "";

  return (
    <button
      type={type}
      className={`button ${buttonType} ${cardClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label || buttonType}
    </button>
  );
}

export default ButtonShell;
