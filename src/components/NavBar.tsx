import { useNavigate } from "react-router-dom";
import ButtonShell from "./ButtonShell";
import "../scss/Navbar.scss";

function Navbar() {
  const navigate = useNavigate();

  return (
    <main className="navbar-container">
      <section className="navbar">
        <div className="navbar-content">
          <h1>CREATORVERSE</h1>

          <div className="navbar-buttons">
            <ButtonShell
              buttonType="Info"
              className="navbar-button"
              label="View All Creators"
              onClick={() => navigate("/")}
            />

            <ButtonShell
              buttonType="Add"
              className="navbar-button"
              label="Add A Creator"
              onClick={() => navigate("/add")}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Navbar;
