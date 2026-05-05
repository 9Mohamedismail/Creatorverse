import "../scss/Button.scss";

type ButtonShellProps = {
  className?: string;
  onClick?: () => void;
  buttonType: "Add" | "Edit" | "Delete";
};

function ButtonShell({
  className = "",
  onClick,
  buttonType,
}: ButtonShellProps) {
  return (
    <button className={`button ${buttonType} ${className}`} onClick={onClick}>
      {buttonType}
    </button>
  );
}

export default ButtonShell;
