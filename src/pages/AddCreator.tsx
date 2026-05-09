import Form from "../components/Form";
import type { Creator } from "../types/creator";

type AddCreatorProps = {
  onCreatorAdded: (creator: Creator) => void;
};

function AddCreator({ onCreatorAdded }: AddCreatorProps) {
  return <Form onCreatorAdded={onCreatorAdded} />;
}

export default AddCreator;
