import "../scss/Form.scss";
import ButtonShell from "./ButtonShell";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import type { Creator, SocialLink } from "../types/creator";

type FormProps = {
  onCreatorAdded: (creator: Creator) => void;
};

function Form({ onCreatorAdded }: FormProps) {
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const image_url = String(formData.get("image_url") || "").trim();

    const youtubeHandle = String(formData.get("youtube_handle") || "").trim();
    const youtubeUrl = String(formData.get("youtube_url") || "").trim();

    const twitterHandle = String(formData.get("twitter_handle") || "").trim();
    const twitterUrl = String(formData.get("twitter_url") || "").trim();

    const instagramHandle = String(
      formData.get("instagram_handle") || "",
    ).trim();
    const instagramUrl = String(formData.get("instagram_url") || "").trim();

    if (!name || !description || !image_url) {
      alert("Name, description, and image URL are required.");
      return;
    }

    const url: SocialLink[] = [];

    if (youtubeHandle && youtubeUrl) {
      url.push({
        name: "youtube",
        handle: youtubeHandle,
        link: youtubeUrl,
      });
    }

    if (twitterHandle && twitterUrl) {
      url.push({
        name: "twitter",
        handle: twitterHandle,
        link: twitterUrl,
      });
    }

    if (instagramHandle && instagramUrl) {
      url.push({
        name: "instagram",
        handle: instagramHandle,
        link: instagramUrl,
      });
    }

    const { data, error } = await supabase
      .from("creators")
      .insert({
        name,
        description,
        image_url,
        url: url.length > 0 ? url : null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding creator:", error);
      return;
    }

    onCreatorAdded(data);
    navigate("/");
  }

  return (
    <form className="form-page" onSubmit={handleSubmit}>
      <fieldset>
        <label>
          Name
          <input name="name" placeholder="Creator's name" />
        </label>
        <label>
          Description
          <textarea name="description" placeholder="Short bio..."></textarea>
        </label>
        <label>
          Image URL
          <input type="url" name="image_url" placeholder="https://..." />
        </label>

        <label>YouTube</label>
        <fieldset className="grid">
          <input
            name="youtube_handle"
            placeholder="@handle"
            aria-label="YouTube Handle"
          />
          <input
            type="url"
            name="youtube_url"
            placeholder="https://..."
            aria-label="YouTube URL"
          />
        </fieldset>

        <label>Twitter (X)</label>
        <fieldset className="grid">
          <input
            name="twitter_handle"
            placeholder="@handle"
            aria-label="Twitter Handle"
          />
          <input
            type="url"
            name="twitter_url"
            placeholder="https://..."
            aria-label="Twitter URL"
          />
        </fieldset>

        <label>Instagram</label>
        <fieldset className="grid">
          <input
            name="instagram_handle"
            placeholder="@handle"
            aria-label="Instagram Handle"
          />
          <input
            type="url"
            name="instagram_url"
            placeholder="https://..."
            aria-label="Instagram URL"
          />
        </fieldset>

        <ButtonShell buttonType="Add" cardType="full" type="submit" />
      </fieldset>
    </form>
  );
}

export default Form;
