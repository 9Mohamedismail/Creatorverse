import "../scss/Button.scss";

type ButtonShellProps = {
  className?: string;
  onClick?: () => void;
  buttonType: "Add" | "Edit" | "Delete" | "Info";
  cardType?: "small" | "full";
  type?: "button" | "submit";
};

function ButtonShell({
  className = "",
  onClick,
  buttonType,
  cardType,
  type = "button",
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
    >
      {buttonType}
    </button>
  );
}

export default ButtonShell;
