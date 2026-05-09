import youtubeIcon from "../assets/youtube.png";
import twitterIcon from "../assets/twitter.png";
import instagramIcon from "../assets/instagram.png";

export function getSocialImage(name: string) {
  switch (name.toLowerCase()) {
    case "youtube":
      return youtubeIcon;
    case "twitter":
      return twitterIcon;
    case "instagram":
      return instagramIcon;
    default:
      null;
  }
}
