import "../scss/Button.scss";

type ButtonShellProps = {
  className?: string;
  onClick?: () => void;
  buttonType: "Add" | "Edit" | "Delete" | "Info";
  cardType?: "small" | "full";
};

function ButtonShell({
  className = "",
  onClick,
  buttonType,
  cardType,
}: ButtonShellProps) {
  const cardClass =
    cardType === "small"
      ? "small-card-button"
      : cardType === "full"
        ? "full-card-button"
        : "";

  return (
    <button
      className={`button ${buttonType} ${cardClass} ${className}`}
      onClick={onClick}
    >
      {buttonType}
    </button>
  );
}

export default ButtonShell;
