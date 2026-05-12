import { useState } from "react";
import DeleteModal from "./DeleteModal";
import ButtonShell from "./ButtonShell";
import { getSocialImage } from "../utils/getSocialImage";
import type { Creator } from "../types/creator";
import defaultCreatorImage from "../assets/default-creator.png";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import "../scss/FullCard.scss";

type CardProps = {
  creator: Creator;
  onDelete: (id: number) => void;
};

function FullCard({ creator, onDelete }: CardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  async function handleConfirmDelete() {
    setIsDeleting(true);

    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", creator.id);

    setIsDeleting(false);

    if (error) {
      console.error("Error deleting creator:", error);
      return;
    }

    onDelete(creator.id);
  }

  return (
    <>
      <article className="creator-card" key={creator.id}>
        <img
          src={creator.image_url || defaultCreatorImage}
          alt={creator.name}
          className="creator-image"
          onError={(event) => {
            event.currentTarget.src = defaultCreatorImage;
          }}
        />

        <div className="creator-info">
          <h1>{creator.name}</h1>
          <p>{creator.description}</p>

          <div className="creator-links">
            {creator.url?.map((social) => {
              const socialImage = getSocialImage(social.name);

              if (!social.link || !social.handle) return null;

              return (
                <div className="creator-social" key={social.link}>
                  {socialImage && (
                    <img
                      src={socialImage}
                      alt={`${social.name} icon`}
                      className="creator-social-image"
                    />
                  )}

                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.handle}
                  </a>
                </div>
              );
            })}
          </div>

          <div className="creator-card-buttons">
            <ButtonShell
              buttonType="Edit"
              cardType="full"
              onClick={() => navigate(`/edit/${creator.id}`)}
            />
            <ButtonShell
              buttonType="Delete"
              cardType="full"
              onClick={() => setShowDeleteModal(true)}
            />
          </div>
        </div>

        {showDeleteModal && (
          <DeleteModal
            creatorName={creator.name}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            isDeleting={isDeleting}
          />
        )}
      </article>
    </>
  );
}

export default FullCard;
