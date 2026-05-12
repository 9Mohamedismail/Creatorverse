import { useParams } from "react-router-dom";
import Form from "../components/Form";
import type { Creator } from "../types/creator";

type EditCreatorProps = {
  creators: Creator[];
  onCreatorUpdated: (creator: Creator) => void;
};

function EditCreator({ creators, onCreatorUpdated }: EditCreatorProps) {
  const { id } = useParams();

  const creator = creators.find((creator) => creator.id === Number(id));

  if (!creator) {
    return <p>Creator not found.</p>;
  }

  return (
    <div>
      <Form creatorToEdit={creator} onCreatorUpdated={onCreatorUpdated} />
    </div>
  );
}

export default EditCreator;
