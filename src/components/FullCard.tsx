import "../scss/FullCard.scss";
import ButtonShell from "./ButtonShell";

function FullCard() {
  const tempCreator = [
    {
      id: 1,
      name: "Marques Brownlee (MKBHD)",
      url: [
        {
          name: "youtube",
          handle: "@marquesbrownle",
          link: "https://www.youtube.com/user/marquesbrownlee",
        },
        {
          name: "Twitter (X)",
          handle: "@MKBHD",
          link: "https://x.com/MKBHD",
        },
        {
          name: "Instagram",
          handle: "@mkbhd",
          link: "https://www.instagram.com/mkbhd/",
        },
      ],
      description:
        "Marques Keith Brownlee, known professionally as MKBHD, is an American influencer and professional ultimate frisbee player, best known for his YouTube videos reviewing technology devices.",
      imageUrl:
        "https://yt3.googleusercontent.com/qu4TmIaYUlS41-dJ9gZ7DUR3nilvmB5_11i6OKSdvNnBNiyOusZP1bMN6ICnuxtjFBb6ioKgRQ=s900-c-k-c0x00ffffff-no-rj",
    },
  ];

  return (
    <>
      {tempCreator.map((creator, key) => (
        <article className="creator-card">
          <img
            src={creator.imageUrl}
            alt="creator icon"
            className="creator-image"
          />

          <div className="creator-info">
            <h1>{creator.name}</h1>
            <p>{creator.description}</p>

            <div className="creator-links">
              {creator.url.map((social, key) => (
                <div className="creator-social">
                  <img
                    src="https://static.thenounproject.com/png/4595376-200.png"
                    alt="social icon"
                    className="creator-social-image"
                  />
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.handle}
                  </a>
                </div>
              ))}
            </div>

            <div className="creator-card-buttons">
              <ButtonShell buttonType="Edit" cardType="full" />
              <ButtonShell buttonType="Delete" cardType="full" />
            </div>
          </div>
        </article>
      ))}
    </>
  );
}

export default FullCard;
