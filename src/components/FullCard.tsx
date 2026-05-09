import "../scss/FullCard.scss";
import ButtonShell from "./ButtonShell";
import { getSocialImage } from "../utils/getSocialImage";
import type { Creator } from "../types/creator";
import defaultCreatorImage from "../assets/default-creator.png";

type CardProps = {
  creator: Creator;
};

function FullCard({ creator }: CardProps) {
  if (!creator) {
    return <p>Creator not found.</p>;
  }

  return (
    <>
      <article className="creator-card" key={creator.id}>
        <img
          src={creator.image_url}
          alt="creator icon"
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

              return (
                <div className="small-creator-card-social" key={social.link}>
                  {socialImage && (
                    <img
                      src={socialImage}
                      alt={`${social.name} icon`}
                      className="small-creator-card-social-image"
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
            <ButtonShell buttonType="Edit" cardType="full" />
            <ButtonShell buttonType="Delete" cardType="full" />
          </div>
        </div>
      </article>
    </>
  );
}

export default FullCard;
