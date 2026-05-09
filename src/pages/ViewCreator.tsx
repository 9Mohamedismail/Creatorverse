import { useParams } from "react-router-dom";
import type { Creator } from "../types/creator";
import FullCard from "../components/FullCard";

type ViewCreatorProps = {
  creators: Creator[];
};

function ViewCreator({ creators }: ViewCreatorProps) {
  const { id } = useParams();

  const creator = creators.find((creator) => creator.id === Number(id));

  return (
    <div className="view-creators-page">
      <FullCard creator={creator} />
    </div>
  );
}

export default ViewCreator;
