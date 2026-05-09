import Card from "../components/Card";
import type { Creator } from "../types/creator";

type ShowCreatorsProps = {
  creators: Creator[];
};

function ShowCreators({ creators }: ShowCreatorsProps) {
  return (
    <div>
      {creators.map((creator) => (
        <Card key={creator.id} creator={creator} />
      ))}
    </div>
  );
}

export default ShowCreators;
