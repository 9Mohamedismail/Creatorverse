import Card from "../components/Card";
import ButtonShell from "../components/ButtonShell";
import "../scss/ShowCreators.scss";
import type { Creator } from "../types/creator";
import { useNavigate } from "react-router-dom";

type ShowCreatorsProps = {
  creators: Creator[];
};

function ShowCreators({ creators }: ShowCreatorsProps) {
  const navigate = useNavigate();

  return (
    <div className="show-creators-page">
      {creators.length > 0 ? (
        <div className="creators-grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <h1>No Creators Yet 😞</h1>
      )}

      <ButtonShell
        buttonType="Add"
        cardType="full"
        onClick={() => navigate("/add")}
      />
    </div>
  );
}

export default ShowCreators;
