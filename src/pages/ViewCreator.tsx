import { useNavigate, useParams } from "react-router-dom";
import type { Creator } from "../types/creator";
import FullCard from "../components/FullCard";

type ViewCreatorProps = {
  creators: Creator[];
  onDelete: (id: number) => void;
};

function ViewCreator({ creators, onDelete }: ViewCreatorProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const creator = creators.find((creator) => creator.id === Number(id));

  function handleDelete(id: number) {
    onDelete(id);
    navigate("/");
  }

  if (!creator) {
    return (
      <div className="view-creators-page">
        <h1>Creator not found.</h1>
      </div>
    );
  }

  return (
    <div className="view-creators-page">
      <FullCard creator={creator} onDelete={handleDelete} />
    </div>
  );
}

export default ViewCreator;
