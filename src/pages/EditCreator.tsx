import { useParams } from "react-router-dom";
import Form from "../components/Form";
import type { Creator } from "../types/creator";

type EditCreatorProps = {
  creators: Creator[];
  onCreatorUpdated: (creator: Creator) => void;
  onCreatorDeleted: (id: number) => void;
};

function EditCreator({
  creators,
  onCreatorUpdated,
  onCreatorDeleted,
}: EditCreatorProps) {
  const { id } = useParams();

  const creator = creators.find((creator) => creator.id === Number(id));

  if (!creator) {
    return <p>Creator not found.</p>;
  }

  return (
    <div>
      <Form
        creatorToEdit={creator}
        onCreatorUpdated={onCreatorUpdated}
        onCreatorDeleted={onCreatorDeleted}
      />
    </div>
  );
}

export default EditCreator;
