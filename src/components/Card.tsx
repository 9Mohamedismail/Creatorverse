import "../scss/Card.scss";
import ButtonShell from "./ButtonShell";
import { Link } from "react-router-dom";
import { getSocialImage } from "../utils/getSocialImage";
import type { Creator } from "../types/creator";
import defaultCreatorImage from "../assets/default-creator.png";

type CardProps = {
  creator: Creator;
};

function Card({ creator }: CardProps) {
  return (
    <>
      <article className="small-creator-card">
        <img
          src={creator.image_url}
          alt="creator icon"
          className="small-creator-card-image"
          onError={(event) => {
            event.currentTarget.src = defaultCreatorImage;
          }}
        />

        <div className="small-creator-card-info">
          <h1>{creator.name}</h1>

          <div className="small-creator-card-buttons">
            <ButtonShell buttonType="Edit" cardType="small" />
            <Link to={`/view/${creator.id}`}>
              <ButtonShell buttonType="Info" cardType="small" />
            </Link>
          </div>

          <div className="small-creator-card-links">
            {creator.url?.map((social) => {
              const socialImage = getSocialImage(social.name);

              if (!socialImage) return null;

              return (
                <div className="small-creator-card-social" key={social.link}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="small-creator-card-social"
                    key={social.link}
                  >
                    <img
                      src={socialImage}
                      alt={`${social.name} icon`}
                      className="small-creator-card-social-image"
                    />
                  </a>
                </div>
              );
            })}
          </div>

          <p>{creator.description}</p>
        </div>
      </article>
    </>
  );
}

export default Card;
