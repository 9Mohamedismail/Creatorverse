import ButtonShell from "./ButtonShell";

type DeleteModalProps = {
  creatorName: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
};

function DeleteModal({
  creatorName,
  onCancel,
  onConfirm,
  isDeleting,
}: DeleteModalProps) {
  return (
    <dialog open>
      <article>
        <h2>Delete Creator?</h2>

        <p>
          Are you sure you want to delete <strong>{creatorName}</strong>? This
          action cannot be undone.
        </p>

        <footer>
          <ButtonShell
            buttonType="Cancel"
            className="secondary"
            onClick={onCancel}
          />

          <ButtonShell
            buttonType="Delete"
            onClick={onConfirm}
            disabled={isDeleting}
            label={isDeleting ? "Deleting..." : "Delete"}
          />
        </footer>
      </article>
    </dialog>
  );
}

export default DeleteModal;
