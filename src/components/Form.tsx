import "../scss/Form.scss";
import ButtonShell from "./ButtonShell";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import type { Creator, SocialLink } from "../types/creator";
import { useState, type FormEvent } from "react";

type FormProps = {
  onCreatorAdded?: (creator: Creator) => void;
  onCreatorUpdated?: (creator: Creator) => void;
  onCreatorDeleted?: (id: number) => void;
  creatorToEdit?: Creator;
};

function Form({
  onCreatorAdded,
  onCreatorUpdated,
  onCreatorDeleted,
  creatorToEdit,
}: FormProps) {
  const navigate = useNavigate();

  const isEditing = Boolean(creatorToEdit);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const youtube = creatorToEdit?.url?.find(
    (social) => social.name === "youtube",
  );

  const twitter = creatorToEdit?.url?.find(
    (social) => social.name === "twitter",
  );

  const instagram = creatorToEdit?.url?.find(
    (social) => social.name === "instagram",
  );

  async function handleConfirmDelete() {
    if (!creatorToEdit) return;

    setIsDeleting(true);

    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", creatorToEdit.id);

    setIsDeleting(false);

    if (error) {
      console.error("Error deleting creator:", error);
      return;
    }

    onCreatorDeleted?.(creatorToEdit.id);
    navigate("/");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

    if (!name || !description) {
      alert("Name and description are required.");
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

    if (url.length === 0) {
      alert("Please add at least one social link.");
      return;
    }

    if (isEditing && creatorToEdit) {
      const { data, error } = await supabase
        .from("creators")
        .update({
          name,
          description,
          image_url,
          url,
        })
        .eq("id", creatorToEdit.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating creator:", error);
        return;
      }

      onCreatorUpdated?.(data);
      navigate(`/view/${creatorToEdit.id}`);
    } else {
      const { data, error } = await supabase
        .from("creators")
        .insert({
          name,
          description,
          image_url,
          url,
        })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          alert("A creator with this name already exists.");
          return;
        }

        console.error("Error adding creator:", error);
        return;
      }

      onCreatorAdded?.(data);
      navigate("/");
    }
  }

  return (
    <form className="form-page" onSubmit={handleSubmit}>
      <fieldset>
        <label>
          Name
          <input
            name="name"
            placeholder="Creator's name"
            defaultValue={creatorToEdit?.name || ""}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            placeholder="Short bio..."
            defaultValue={creatorToEdit?.description || ""}
            required
          ></textarea>
        </label>

        <label>
          Image URL
          <input
            type="url"
            name="image_url"
            placeholder="https://..."
            defaultValue={creatorToEdit?.image_url || ""}
          />
        </label>

        <label>YouTube</label>
        <fieldset className="grid">
          <input
            name="youtube_handle"
            placeholder="@handle"
            aria-label="YouTube Handle"
            defaultValue={youtube?.handle || ""}
          />

          <input
            type="url"
            name="youtube_url"
            placeholder="https://..."
            aria-label="YouTube URL"
            defaultValue={youtube?.link || ""}
          />
        </fieldset>

        <label>Twitter (X)</label>
        <fieldset className="grid">
          <input
            name="twitter_handle"
            placeholder="@handle"
            aria-label="Twitter Handle"
            defaultValue={twitter?.handle || ""}
          />

          <input
            type="url"
            name="twitter_url"
            placeholder="https://..."
            aria-label="Twitter URL"
            defaultValue={twitter?.link || ""}
          />
        </fieldset>

        <label>Instagram</label>
        <fieldset className="grid">
          <input
            name="instagram_handle"
            placeholder="@handle"
            aria-label="Instagram Handle"
            defaultValue={instagram?.handle || ""}
          />

          <input
            type="url"
            name="instagram_url"
            placeholder="https://..."
            aria-label="Instagram URL"
            defaultValue={instagram?.link || ""}
          />
        </fieldset>

        <ButtonShell
          buttonType={isEditing ? "Edit" : "Add"}
          cardType="full"
          type="submit"
        />

        {isEditing && creatorToEdit && (
          <ButtonShell
            buttonType="Delete"
            cardType="full"
            onClick={() => setShowDeleteModal(true)}
          />
        )}

        {showDeleteModal && creatorToEdit && (
          <DeleteModal
            creatorName={creatorToEdit.name}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            isDeleting={isDeleting}
          />
        )}
      </fieldset>
    </form>
  );
}

export default Form;
