import "../scss/Form.scss";
import ButtonShell from "./ButtonShell";

function Form() {
  return (
    <form className="form-page">
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

        <ButtonShell buttonType="Add" cardType="full" />
      </fieldset>
    </form>
  );
}

export default Form;
